<template>
    <div class="kalendar-container">
        <div class="kalendar">
            <el-calendar v-model="value" class="kalendar" style="background-color:rgba(173, 226, 222, 0.938);">
                <template slot="dateCell" slot-scope="{date, data}">
                    <p v-if="vratiZahteve(data)"></p>
                    <div class="element" @click="radi(data.day)">
                        <p :class="data.isSelected ? 'is-active' : ''">{{data.day.split('-').slice(2).join('-')}}</p>
                        <el-badge v-if="data.isSeleted" :value="counts[data.day]"  class="item" type="warning" aria-setsize="big">
                            <p :class="data.isSelected ? 'is-active' : ''"></p>
                        </el-badge>
                    </div>
                </template> 
            </el-calendar>
        </div>
        <form-zakazi :date="datum" @zakazano="osveziPrikaz"></form-zakazi>
    </div>
</template>

<script>
import PrikazKalendaraKorisnik from "./PrikazKalendaraKorisnik.vue"
import FormZakazi from "../forme/FormZakazi.vue"
import { getUserInfo } from '../../services/contextManagement';
import { destinationUrl, apiFetch } from '../../services/authFetch'
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {PrikazKalendaraKorisnik, FormZakazi},
    data() {
        return{
            value: new Date(),
            datum: '',
            listaZahteva: [],
            datumi:[],
            counts: [],
            userId:''
        }
    },
    methods: {
        radi(date){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd  ;
            if(date > today){
                this.datum = date
            }    
            else{
                this.$message({message: "Morate izabrati predstojeći datum!", type: 'warning'})
                this.datum = ''
            }
        },
        vratiZahteve(data) {
            this.datumi.forEach(el=>{
                if(data.day==el)
                    data.isSelected=true
            });
        },
        pribaviListuZahteva: async function(){
            apiFetch('GET', destinationUrl + "/request/all")
            .then(result=>{
                this.listaZahteva=result.Data;
            });
            //     if(result.Success)
            //     {
            //         this.listaZahteva=result.Data;
            //         this.listaZahteva=this.listaZahteva.filter(x=>x.RequestStatus != 2);
            //         this.pribaviDatum(this.listaZahteva);
            //     }
            //     else
            //         this.$message({message:"Došlo je do greske prilikom učitavanja zahteva!", type:'error'})
            // }).catch(error=>{console.log(error)});
        },
        pribaviDatum(datumi) {
            this.datumi=[];
            datumi.forEach(el=>{
                this.datumi.push(el.Date);
            });
            this.countDate();
        },
        countDate(){
            let counts=[];
            this.datumi.forEach(function(x)
            {
                counts[x] = (counts[x] || 0) + 1;
            });
            this.counts=counts;
        },
        osveziPrikaz(zahtev){
            this.listaZahteva.push(zahtev);
            this.datumi.push(zahtev.Date)
            this.countDate();
        }
    },
    beforeMount(){
        this.pribaviListuZahteva();
        this.userId=getUserInfo().userID;
    }
}
</script>

<style scoped>
    .korisnik-container{
        display: flex;
            height: 90%;
            width: 100%;
            flex-direction: column;
            overflow: auto;
            background-color: rgba(224, 224, 235, 0.445);
    }
    .element{
        height: 100%;
        width: 100%;
    }
    .item{
        height: 60px;
        width: 60px;
        font: 20px;
    }
    .kalendar{
        margin: 20px 100px 50px;
    }
    footer-bar{
        justify-content: flex-end;
    }
</style>