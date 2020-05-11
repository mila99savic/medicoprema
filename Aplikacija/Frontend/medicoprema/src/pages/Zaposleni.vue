<template>
    <div class="zaposleni-container">
        <div class="zaposleni">
            <custom-bar :list="this.menuItems" @changeView="setComponent($event)">
                <utisak-o-korisniku :idZaposlenog="userId"  v-if="showComp == 'utisci'"></utisak-o-korisniku>
                <prikaz-obaveza v-if="this.showComp == 'raspored'"  @editFinished="this.zavrsiDodavanje"></prikaz-obaveza>
                <pocetna-strana v-if="this.showComp == 'pocetna'"></pocetna-strana>
            </custom-bar>
        </div>
    </div>
</template>

<script>
import CustomBar from "../components/CustomBar.vue"
import UtisakOKorisniku from "../components/UtisakOKorisniku.vue"
import PrikazObaveza from "../components/prikazi/PrikazObaveza.vue"
import PocetnaStrana from "../components/PocetnaStrana.vue"
import {setPageShown} from "../services/contextManagement";
export default {
    components:{CustomBar,UtisakOKorisniku,PocetnaStrana,PrikazObaveza},
    data(){
        return{
            menuItems:[
                {
                    key:1,
                    label:'Utisci o korisnicima',
                    index:'utisci',
                    slika:'utisak.png'
                },
                {
                    key:2,
                    label: 'Raspored aktivnosti',
                    index: 'raspored',
                    slika: 'zakazivanje.png'
                }
            ],
            showComp: 'pocetna',
            userType: 'zaposleni'
        }
    },
    methods: {
        radi: function(){
            // eslint-disable-next-line no-console
            console.log("Ovo radi!")
        },
        setComponent(index){
            this.showComp = index
            setPageShown(index);
        },
        changeComp: function(event){
            if(event == '')
                this.showComp = 'raspored'
            else
                this.showComp = event;
                setPageShown(this.showComp)
        },
        zavrsiDodavanje(){
            this.showComp = 'raspored'
            setPageShown('')
        }
    },
    beforeMount(){
       this.showComp = 'raspored'
    }
    
}
</script>

<style scoped>
    zaposleni-container{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left:0;
        z-index: -1;
        background-size: cover;
        background-position: bottom;
        background-image: linear-gradient(
            rgba(26, 111, 168, 0.555),
            rgba(37, 41, 40, 0.781)
        ),url("../assets/pozadina.png");
    }
</style>