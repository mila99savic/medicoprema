<template>
    <div class="zahtev-container">
        <h3>Neobrađeni zahtevi</h3>
        <div class="zahtev-container-table">
            <el-table :data="this.listaZahteva" highlight-current-row @current-change="handleCurrentChange" height="1000">
                <el-table-column prop="korIme" label="Ime" width="130px" class="table-column"></el-table-column>
                <el-table-column prop="location" label="Lokacija" width="150px" class="table-column"></el-table-column>
                <el-table-column prop="date" label="Datum" width="90px" class="table-column"></el-table-column>
                <el-table-column prop="comment" label="Dodatni zahtevi"  class="table-column"></el-table-column>
                <el-table-column prop="type" label="Tip" width="120px" class="table-column"></el-table-column>
                <el-table-column prop="time" label="Vreme" width="80px" class="table-column"></el-table-column>
            </el-table>
            <div class="zahtevDugmici">
                <el-select class="inputPolje" v-model="zaposleniId" placeholder="Izaberite zaposlenog" size="medium">
                    <el-option v-for="item in zaposleni" :key="item.Id" :label="item.name+' '+item.lastname" :value="item.Id"></el-option>
                </el-select>
                <div class="dugmici">
                    <el-button type="success" round size="mini" style="margin-left: 20%;" @click="potvrdiZahtev()">Potvrdi</el-button>
                    <el-button type="danger" round size="mini" style="margin-left: 20%;" @click="odbijZahtev()">Odbij</el-button>
                    <el-button type="info" icon="el-icon-message" style="padding: 12px; margin-left: 20%; background-color:orange; border-color:orange;" circle size="mini" @click="poruka"></el-button>
                </div>
            </div>
        </div>
        <h3>Potvrđeni zahtevi</h3>
        <div class="zahtev-container-table">
            <el-table :data="this.listaPotvrdjenihZahteva" max-height="400">
             <el-table-column prop="korIme" label="Ime" width="130px" class="table-column"></el-table-column>
                <el-table-column prop="location" label="Lokacija" width="150px" class="table-column"></el-table-column>
                <el-table-column prop="date" label="Datum" width="90px" class="table-column"></el-table-column>
                <el-table-column prop="comment" label="Dodatni zahtevi"  class="table-column"></el-table-column>
                <el-table-column prop="type" label="Tip" width="120px" class="table-column"></el-table-column>
                <el-table-column prop="time" label="Vreme" width="80px" class="table-column"></el-table-column>
             </el-table>
        </div>
    </div>
</template>

<script>
import { apiFetch, destinationUrl } from '../../services/authFetch';
import { sortReuquestByDate } from '../../services/sort';
import { ERRORS } from '../../data/errorsCode';

const eventTypes = ['Obuka', 'Servis aparata', 'Preventivni godišnji pregled'];
export default {
    data(){
        return{
            zaposleni:[],
            zaposleniId:'',
            listaZahteva:[],
            listaPotvrdjenihZahteva:[],
            currentRow:null
        }
    },
    methods:{
        poruka(){
            this.$emit('poruka');
        },
        pribaviListuZahteva(){
            apiFetch('GET', destinationUrl + "/request/all")
                .then(result=>{
                    // if(this.Success){
                        console.log(result)
                        this.listaZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "neobradjen"), true);
                        this.listaPotvrdjenihZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "potvrdjen"), true);
                        this.$emit('datum', this.listaZahteva);
                        this.$emit('potvrdjeni', this.listaPotvrdjenihZahteva);
                    // }
                    // else
                    //     this.$message({message: "Došlo je do greške prilikom učitavanja zahteva!", type: 'error'})
                }).catch(error=>{console.log(error);})
        },
        pribaviZaposlene(){
            apiFetch('GET', destinationUrl + "/user/getAllEmployed")
                .then(result=>{
                    // if(result.Succes){
                        this.zaposleni = result.Data;
                    // }
                    // else
                    //     this.$message({message: "Došlo je do greške prilikom učitavanja zaposlenih!", type: 'error'})
                }).catch(error => {console.log(error);})
        },
        potvrdiZahtev(){
            if(this.currentRow != null && this.zaposleniId != ''){
                let Data = {Location:'', Date:'', Time:'', Note:'', EmployedId:'', EventType:1, RequestId:'', Notification:'', CustomerId:''};
                Data.Location = this.currentRow.Location;
                Data.Date = this.currentRow.Date;
                Data.Time = this.currentRow.Time;
                Data.Note = this.currentRow.AdditionalRequests;
                Data.EmployedId = this.currentRow.zaposleniId;
                Data.RequestId = this.currentRow.Id;
                Data.EventType = eventTypes.indexOf(this.currentRow.EventType);
                Data.Notification = this.notification;
                Data.CustomerId = this.currentRow.UserId;
                apiFetch('POST', destinationUrl + "/Task/AssignTask", Data)
                    .then(result=>{
                        if(result.Success){
                            this.$message({message: "Uspešno dodeljivanje obaveze zaposlenom", type:'success'})
                            this.listaZahteva.splice(this.listaZahteva.indexOf(this.currentRow),1);
                            this.listaPotvrdjenihZahteva.push(this.currentRow);
                            this.$emit('datum',this.listaZahteva);
                            this.$emit('potvrdjeni', this.listaPotvrdjenihZahteva);
                            this.zaposleniId = '';
                        }
                        else    
                            this.$message({message: ERRORS[result.Errors[0].Code], type: "warning"});
                    }).catch(error=>{console.log(error);})
            }
            else if(this.currentRow == null){
                 this.$message({message: "Morate selektovati zahtev pre potvrde.", type: 'error'})
            }
            else if(this.zaposleniId == '')
            {
                this.$message({message: "Morate angažovati zaposlenog pre potvrde.", type: 'error'})
            }
        },
        odbijZahtev(){
            if(this.currentRow != null){
                let Data = {Id:'', Notification:''};
                Data.Id = this.currentRow.Id;
                Data.Notification = this.notification;
                apiFetch('POST',destinationUrl + "/Request/RejectRequest", Data)
                    .then(result=>{
                        if(result.Success){
                            this.$message({message: "Uspešno ste odbili zahtev.", type: 'warning'})
                            this.listaZahteva.splice(this.listaZahteva.indexOf(this.currentRow),1);
                            this.$emit('datum',this.listaZahteva);
                            this.zaposleniId = '';
                        }
                        else
                            this.$message("Došlo je do greške!");
                    }).catch(error => {console.log(error);})
            }
            else
                this.$message({message: "Morate selektovati zahtev pre odbijanja.", type: 'error'});
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        }
    },
    mounted: function() {
        this.pribaviZaposlene();
        this.pribaviListuZahteva();
    },
    props: ['notification']
}
</script>

<style scoped>
.zahtev-container{
    background-color: rgba(206, 231, 230, 0.986);
}
.zahtev-container-table{
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 400px;
}

.zahtevDugmici{
    display: flex;
    justify-content: space-between;
    margin-top: 1%;
    margin-bottom: 1%;
}

h3{
    text-align: center;
    font-family: sans-serif;
}

.dugmici{
    display: flex;
    margin-right: 10%;
}
</style>