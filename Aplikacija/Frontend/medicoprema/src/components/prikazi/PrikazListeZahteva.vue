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
                <el-table-column prop="status" label="Status" width="80px" class="table-column"></el-table-column>
            </el-table>
            <div class="zahtevDugmici">
                <el-select class="inputPolje" v-model="zaposleniId" placeholder="Izaberite zaposlenog" size="medium">
                    <el-option v-for="item in zaposleni" :key="item._id" :label="item.name+' '+item.lastname" :value="item._id"></el-option>
                </el-select>
                <div class="dugmici">
                    <el-button type="success" round size="mini" style="margin-left: 20%;" @click="potvrdiZahtev()">Potvrdi</el-button>
                    <el-button type="danger" round size="mini" style="margin-left: 20%;" @click="odbijZahtev()">Odbij</el-button>
                    <!-- <el-button type="info" icon="el-icon-message" style="padding: 12px; margin-left: 20%; background-color:orange; border-color:orange;" circle size="mini" @click="poruka()"></el-button> -->
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
                <el-table-column prop="status" label="Status" width="80px" class="table-column"></el-table-column>
             </el-table>
        </div>
        <!-- <obavesti-korisnika-zakazivanja v-if="this.showComp == 'obavestenje'" @zatvoriPoruku="zatvori" @proslediPoruku="prosledi($event)"></obavesti-korisnika-zakazivanja > -->
    </div>
</template>

<script>
import { apiFetch, destinationUrl } from '../../services/authFetch';
import { sortReuquestByDate } from '../../services/sort';
// import {ObavestiKorisnikaZakazivanja} from "../ObavestiKorisnikaZakazivanja.vue"
// import { ERRORS } from '../../data/errorsCode';

// const eventTypes = ['Obuka', 'Servis aparata', 'Preventivni godišnji pregled'];
export default {
    // components:{ObavestiKorisnikaZakazivanja},
    data(){
        return{
            zaposleni:[],
            zaposleniId:'',
            listaZahteva:[],
            listaPotvrdjenihZahteva:[],
            currentRow:null,
            selectedIndex:'',
            obavestenje:'',
            showComp:''
        }
    },
    methods:{
        // zatvori(){
        //     this.showComp='';
        //     this.selectedIndex='';
        // },
        // poruka(){
        //     console.log(this.currentRow);
        //     this.showComp='obavestenje';
        //     // this.selectedIndex=index;  
        // },
        // prosledi(prosledjenoObavestenje){
        //     // console.log(this.listaNarudzbina[this.selectedIndex]);

        //      let Data = {reqId: '', notification: ''};
        //         Data.reqId = this.listaZahteva[this.selectedIndex]._id
        //         Data.notification = prosledjenoObavestenje
        //         console.log(Data);
        //     apiFetch('PUT', destinationUrl + "/request/updateRequestNotification", Data)
        //         .then(result =>{
        //             if(result.Success)
        //             {
        //                 console.log(result);
        //                 // console.log(this.listaNarudzbina[this.selectedIndex])
        //                 // this.listaNarudzbina[this.selectedIndex].notification = prosledjenoObavestenje;
        //                 // this.$emit("proslediPoruku", this.notification);
        //                 this.$message({message: "Uspešno ste dodali notifikaciju.", type: 'success'});
        //             }
        //             else
        //                  this.$message({message: "Notifikacija nije dodata.", type: 'error'});
        //         }).catch(error=>console.log(error));
        //     this.showComp='';
        //     this.selectedIndex='';
        // },
        // poruka(){
        //     // this.currentRow = value
        //     console.log(value)
        //     this.$emit('poruka');
        //     this.$emit(this.currentRow);
        // },
        pribaviListuZahteva(){
            apiFetch('GET', destinationUrl + "/request/all")
                .then(result=>{
                        this.listaZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "neobradjen"), true);
                        this.listaPotvrdjenihZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "potvrdjen"), true);
                        // this.listaPotvrdjenihZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "odbijen"), true);
                        this.$emit('datum', this.listaZahteva);
                        this.$emit('potvrdjeni', this.listaPotvrdjenihZahteva);
                }).catch(error=>{console.log(error);})
        },
        pribaviZaposlene(){
            apiFetch('GET', destinationUrl + "/user/getAllEmployed")
                .then(result=>{
                        this.zaposleni = result.Data;
                }).catch(error => {console.log(error);})
        },
        potvrdiZahtev(){
            if(this.currentRow != null && this.zaposleniId != ''){
                let Data = {location:'', date:'', time:'', comment:'', zaposleniId:'', type:'', requestId:'', korisnikid:''};
                Data.location = this.currentRow.location;
                Data.date = this.currentRow.date;
                Data.time = this.currentRow.time;
                Data.comment = this.currentRow.comment;
                Data.zaposleniId = this.zaposleniId;
                Data.requestId = this.currentRow._id;
                Data.type = this.currentRow.type;
                // Data.notification = this.notification;
                Data.korisnikid = this.currentRow.korisnikid;
                console.log(Data)
                apiFetch('POST', destinationUrl + "/task/assign", Data)
                    .then(result=>{
                        if(result.Success){
                            this.$message({message: "Uspešno dodeljivanje obaveze zaposlenom", type:'success'})
                            this.listaZahteva.splice(this.listaZahteva.indexOf(this.currentRow),1);
                            this.listaPotvrdjenihZahteva.push(this.currentRow);
                            this.$emit('datum',this.listaZahteva);
                            this.$emit('potvrdjeni', this.listaPotvrdjenihZahteva);
                            this.zaposleniId = '';
                            this.$message({message: "Uspesno ste potvrdili zahtev", type: 'success'})
                        }
                        // else    
                        //     this.$message({message: ERRORS[result.Errors[0].Code], type: "warning"});
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
               let Data = {reqId: ''};
                Data.reqId = this.currentRow._id;
                console.log(Data)
                apiFetch('PUT',destinationUrl + "/request/rejectRequest", Data)
                    .then(result=>{
                        // if(result.Success){
                            console.log(result)
                            this.$message({message: "Uspešno ste odbili zahtev.", type: 'warning'})
                            this.listaZahteva.splice(this.listaZahteva.indexOf(this.currentRow),1);
                            this.$emit('datum',this.listaZahteva);
                            this.zaposleniId = '';
                        // }
                        // else
                        //     this.$message("Došlo je do greške!");
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
    height: 440px;
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