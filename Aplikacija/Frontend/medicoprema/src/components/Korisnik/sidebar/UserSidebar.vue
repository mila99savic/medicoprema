<template>
         <div class="profil-container">
             <side-bar-profil @changeView="setComponent($event)" :list="this.menuItems" />
             <div class="container">
                <user-profile-info-page v-if="this.showComp == 'profil'" />
                <user-requests v-if="this.showComp == 'zakazivanja'" />
                <narudzbine-korisnik v-if="this.showComp == 'narudzbine'"/>
                <utisak-o-proizvodu v-if="showComp == 'utisci'"></utisak-o-proizvodu>

             </div>
        </div>
</template>

<script>
import FooterBar from "../../appBar/FooterBar.vue";
import SideBarProfil from "../../appBar/SideBar.vue";
import PromenaLozinke from "../../forme/FormPromeniLozinku.vue";
import UtisakOProizvodu from "../../UtisakOProizvodu.vue"

// import {getUserInfo} from "../../../services/contextManagement.js";
// import {destinationUrl} from "../../../services/authFetch.js";
import UserProfileInfoPage from "./containers/UserProfileInfo/UserProfileInfoPages.vue";
import UserRequests from "./containers/UserRequests.vue";
import NarudzbineKorisnik from "./containers/NarudzbineKorisnik.vue";
export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        FooterBar, UtisakOProizvodu, SideBarProfil, UserRequests, PromenaLozinke, UserProfileInfoPage, NarudzbineKorisnik
    },
    data() {
        return{
            ProfilData: [],
            showComp: 'profil',
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
                    index: 'narudzbine',
                    slika: 'narudzbine.png'
                },
                {
                    key:3,
                    label:'Utisci o proizvodima',
                    index:'utisci',
                    slika:'utisak.png'
                },
                {
                    key: 4,
                    label: 'Profil',
                    index: 'profil',
                    slika: 'evidencijaclanova.png'
                }
            ],
            user: {name: '', lastname: '', username:'', email: '', password: '',
                address: '', number: '' }
        }
    },
    methods: {
        setComponent(component){
            this.showComp = component;
        }
    }
}
</script>

<style scoped>
.profil-container{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;
    background-color: rgba(224, 224, 235, 0.445);
}
.container{
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0px;
}

@media screen and (max-width: 700px){
    .profil-container{
        flex-direction: column;
    }
}
</style>
