<template>
    <div class="uprava-container">
        <custom-bar :list="menuItems" @changeView="setComponent($event)">
            <evidencija-clanova v-if="this.showComp == 'evidencijaclanova'"></evidencija-clanova>
            <narudzbina v-if="this.showComp == 'narudzbina'"></narudzbina>
            <pocetna-strana hidden></pocetna-strana>
            <utisak-uprave v-if="this.showComp == 'utisakuprave'"></utisak-uprave>
            <zakazivanja v-if="this.showComp == 'zakazivanja'" ></zakazivanja>
            <proizvodi-uprave v-if="this.showComp == 'proizvodiuprave'"></proizvodi-uprave>
       </custom-bar>
    </div>
</template>

<script>
import PrikazObaveza from "../components/prikazi/PrikazObaveza.vue"
import CustomBar from "../components/CustomBar"
import PocetnaStrana from "../components/PocetnaStrana.vue"
import EvidencijaClanova from "../components/EvidencijaClanova.vue"
import Narudzbina from "../components/Narudzbina.vue"
import UtisakUprave from "../components/UtisakUprave.vue"
import Zakazivanja from "../components/Zakazivanja.vue"
import ProizvodiUprave from "../components/ProizvodiUprave.vue"
import {setPageShown, getPageToShow, getUserInfo } from "../services/contextManagement"
export default {
    // eslint-disable-next-line vue/no-unused-components
    components:{CustomBar, PrikazObaveza, EvidencijaClanova, Narudzbina, PocetnaStrana, UtisakUprave, Zakazivanja, ProizvodiUprave},
    data(){
        return{
            menuItems: [
                {
                    key: 1,
                    label: 'Zakazivanja',
                    index: 'zakazivanja',
                    slika: 'zakazivanje.png'
                },
                {
                    key: 2,
                    label: 'Narudžbine',
                    index: 'narudzbina',
                    slika: 'narudzbine.png'
                },
                {
                    key: 3,
                    label: 'Utisci',
                    index: 'utisakuprave',
                    slika: 'utisak.png'
                },
                {
                    key: 4,
                    label: 'Proizvodi',
                    index: 'proizvodiuprave',
                    slika: 'proizvodi.png'
                },
                {
                    key: 5,
                    label: 'Evidencija članova',
                    index: 'evidencijaclanova',
                    slika: 'evidencijaclanova.png'
                }
            ],
            showComp: 'utisakuprave',
            userId: -1,
            userType: 'uprava'
        }
    },
    methods: {
        setComponent(index){
            this.showComp = index
            setPageShown(index);
        }
    },
    beforeMount(){
        var userInfo = getUserInfo()
        this.userId = userInfo.userID;
        var index = getPageToShow().page;
        console.log(index)
        if(index != null){
            this.showComp = index
            return
        }
        this.showComp = ''
    }
}
</script>

<style scoped>
    .uprava-container{
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
            rgba(37, 41, 40, 0.575)
        ),url("../assets/pozadina.png");
    }
</style>