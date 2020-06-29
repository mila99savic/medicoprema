<template>
    <div class="zakazivanja-container">
        <prikaz-liste-zahteva :notification="obavestenje" @poruka="otvoriPoruku" @datum="pribaviDatum($event)" @potvrdjeni="potvrdjeniDatum($event)"></prikaz-liste-zahteva>
        <!-- <obavesti-korisnika-zakazivanja v-if="this.showComp == 'obavestenje'" @zatvoriPoruku="zatvori" @proslediPoruku="prosledi($event)"></obavesti-korisnika-zakazivanja > -->
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
            // obavestenje: ''
            // selectedIndex:''

        }
    },
    methods: {
        // zatvori(){
        //     this.showComp='';
        //     this.selectedIndex='';
        // },
        // dodajPoruku(index){
        //     this.showComp='obavestenje';
        //     this.selectedIndex=index;  
        // },
        // prosledi(prosledjenoObavestenje){
        //     // console.log(this.listaNarudzbina[this.selectedIndex]);

        //      let Data = {ordId: '', notification: ''};
        //         Data.ordId = this.listaNarudzbina[this.selectedIndex]._id
        //         Data.notification = prosledjenoObavestenje
        //         console.log(Data);
        //     apiFetch('PUT', destinationUrl + "/shop/updateOrderNotification", Data)
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