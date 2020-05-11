<template>
    <div class="zakazivanja-container">
        <el-calendar v-model="value" class="kalendar" style="background-color:rgba(173, 226, 222, 0.938);">
            <template
                slot="dateCell"
                slot-scope="{asdsa, data}" @click="radi">
                <p :class="data.isSelected ? 'is-active' : ''" v-if="zahtevi(data)"></p>
                <p :class="data.isSelected ? 'is-active' : ''">{{data.day.split('-').slice(2).join('-')}}</p>
                <div class="obavestenje">
                   <img  v-if="data.isSelected && data.type == '0'" style="width:30px; height:30px;" src="../assets/bell.png"/>
                   <img  v-if="data.isSelected && data.type == '1'" style="width:30px; height:30px;" src="../assets/check.png"/>
                </div>
            </template>
        </el-calendar>
        <prikaz-liste-zahteva :notification="obavestenje" @poruka="otvoriPoruku" @datum="pribaviDatum($event)" @potvrdjeni="potvrdjeniDatum($event)"></prikaz-liste-zahteva>
        <obavesti-korisnika v-if="this.showComp == 'obavestenje'" @zatvoriPoruku="zatvori" @proslediPoruku="prosledi($event)"></obavesti-korisnika>
    </div>
</template>

<script>
import {Calendar} from 'element-ui'
import FormZakazi from "./forme/FormZakazi.vue"
import PrikazListeZahteva from "./prikazi/PrikazListeZahteva"
import ObavestiKorisnika from "./ObavestiKorisnika.vue"
export default {
    // eslint-disable-next-line vue/no-unused-components
    components:{Calendar, FormZakazi, PrikazListeZahteva, ObavestiKorisnika},
    data(){
        return{
            value: new Date(),
            bell: '',
            datum: [],
            potvrdjeni: [],
            showComp: '',
            obavestenje: ''
        }
    },
    methods: {
        zahtevi: function(data){
                this.datum.forEach(element => {
                    if(data.day == element){
                        data.isSelected = true
                        data.type = '0'
                    }
                });

                this.potvrdjeni.forEach(element => {
                    if(data.day == element){
                        data.isSelected = true
                        data.type = '1'
                    }                   
                 });
        },
        zatvori(){
            this.showComp = ''
        },
        otvoriPoruku(){
            this.showComp = 'obavestenje'
        },
        pribaviDatum(datumi){
            let i =0;
            let novidatumi = [];
           datumi.forEach(el => {
               novidatumi[i++] = el.Date;
           })
           this.datum = novidatumi;
        },
        potvrdjeniDatum(datumi){
            let i =0;
            let novidatumi = [];
           datumi.forEach(el => {
               novidatumi[i++] = el.Date;
           })
           this.potvrdjeni = novidatumi;
           this.obavestenje = '';
        },
        prosledi(prosledjenoObavestenje){
            this.obavestenje = prosledjenoObavestenje;
            this.showComp = '';
        }
    }
}
</script>

<style scoped>
.zakazivanja-container{
       display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        overflow: auto;
        background-color: rgba(206, 231, 230, 0.986);
}
.kalendar{
    margin: 50px;
}
.is-active{
    color:rgb(19, 121, 204);
    margin-bottom: 8px;
    align-items: center;
}
.el-calendar-day{
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color:  rgba(206, 231, 230, 0.986);
}
.obavestenje{
    display: flex;
    justify-content: center;
}
td{
    padding: 2px;
    border-radius: 10px;
}
</style>