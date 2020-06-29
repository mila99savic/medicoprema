<template>
    <div class="zakazi-container">
        <el-form class="zakazi-forma">
            <div class="stavka">
                <label>Lokacija:</label>
                <el-input type="text" v-model="podaciZakazi.location">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
            </div>
            <div class="stavka">
                <label>Datum:</label>
                <el-input
                    :disabled="false" :value="this.date" readonly
                    v-model="this.date" placeholder="Datum iz kalendara">{}</el-input>
            </div>
            <div class="stavka">
                <label>Dodatni zahtevi:</label>
                <el-input type="textarea"
                    :autosize="{minRows: 4, maxRows: 4}" v-model="podaciZakazi.comment">
                </el-input>
            </div>
            <div class="stavka">
                <label>Tip:</label>
                <el-select  v-model="podaciZakazi.type" placeholder="Izaberite tip usluge">
                    <el-option v-for="item in options" :key="item.tip" :label="item.label" :value="item.tip"></el-option>
                </el-select>
            </div>
            <div class="stavka">
                <label>Vreme:</label>
                <el-time-select  v-model="podaciZakazi.time" :picker-options="{ start: '08:00', step: '2:00', end: '18:00' }" placeholder="Select time"></el-time-select>
            </div>
            <div class="dugme">
                <el-button id="dugmeZakazi" round @click="proslediZahtev()" style="color: white; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Zakaži</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { getUserInfo } from '../../services/contextManagement';
import { apiFetch, destinationUrl } from '../../services/authFetch';
// import { ERRORS } from '../../data/errorsCode';
export default {
    data(){
        return{
            podaciZakazi: {
                location: '',
                date: '',
                comment: '',
                type: '',
                time: '',
                korisnikid: ''
            },
            // user: {name:'', lastname:''},
            options: [{
                tip:'Obuka',
                label:'Obuka'
                },{
                tip:'Servis aparata',
                label:'Servis aparata'
                },{
                tip:'Preventivni godišnji pregled',
                label:'Preventivni godišnji pregled'
            }]
            // optionstime: [{
            //     time:'08h',
            //     label:'08h'
            //     },{
            //     time:'10h',
            //     label:'10h'
            //     },{
            //     time:'12h',
            //     label:'12h'
            //     }
            // ],
        }
    },
    props: {date:String},
    watch: {
        date: function(pom){
            this.podaciZakazi.date=pom;
        }
    },
    methods: {
        validacija() {
            if(this.podaciZakazi.location == '' || this.podaciZakazi.date == '' || this.podaciZakazi.type == '' || this.podaciZakazi.time == ''){
                this.$message({message: "Morate popuniti sva polja!", type: 'warning'})
                return false
            }
            return true
        },
        proslediZahtev() {
             if(!this.validacija())
                 return

            this.podaciZakazi.date = this.date;
            // this.podaciZakazi.name = this.user.name;
            // this.podaciZakazi.lastname = this.user.lastname;
            this.podaciZakazi.korisnikid = getUserInfo().userID;
                console.log(this.podaciZakazi)

            apiFetch('POST', destinationUrl + "/request/add/", this.podaciZakazi)
            .then(result => {
                console.log("mima")
                if(result.Success){
                    this.$message({message: "Uspesno ste zakazali termin.", type: 'success'});
                    this.$emit("zakazano",this.podaciZakazi);
                    this.clearForm();
                }
                else {
                     this.$message({message: "Doslo je do greske!", type: 'error'});
                    // result.Errors.forEach(error => {
                    //     this.$message({message: ERRORS[error.Code], type: "warning"});
                    // })
                }
            }).catch(err => {
                console.log(err);
            });


        },
        pribaviKorisnika(){
            let korisnikid = getUserInfo().userID;
            fetch(destinationUrl + '/user/findById/' + korisnikid, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())
                // .then(response => {
                    // this.user.name = result.Data.name;
                    // this.user.lastname = result.Data.lastname;
                // }).catch(error => console.log(error));
        },
        clearForm() {
            this.podaciZakazi.date = "";
            this.podaciZakazi.AdditionalRequests = "";
            this.podaciZakazi.type = "";
            this.podaciZakazi.time = "";
            this.podaciZakazi.location = "";
        }
    },
    beforeMount(){
        this.pribaviKorisnika()
    }
}
</script>

<style scoped>
    .zakazi-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding:50px;
        padding-top: 0px;
    }
    .zakazi-forma{
        height: 500px;
        width: 450px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .stavka{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
    }
    .el-select{
        display: flex;
        width: 100%;
        margin: 0px;
    }
    .el-input{
        display: flex;
        width: 100%;
        margin: 0px;
    }
    .dugme{
        display: flex;
        flex-direction: row-reverse;
        margin: 5px;
        width: 100%;
    }
</style>