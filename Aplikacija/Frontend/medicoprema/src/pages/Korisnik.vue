<template>
    <div class="user-container">
        <header-bar 
            :list="this.menuItems" :type="this.userType"
            @changeView="setComponent($event)">
        </header-bar>
        <zakazivanja-korisnik v-if="this.showComp == 'zakazivanja'" ></zakazivanja-korisnik>
        <user-sidebar v-if="this.showComp == 'profil'" ></user-sidebar>
        <korpa-korisnik v-if="this.showComp == 'korpa'" ></korpa-korisnik>
        <proizvodi v-if="this.showComp == 'proizvodi'"></proizvodi>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import CustomBar from "../components/CustomBar.vue"
import HeaderBar from "../components/appBar/HeaderBar.vue"
import FooterBar from "../components/appBar/FooterBar.vue"
import ZakazivanjaKorisnik  from "../components/Korisnik/ZakazivanjaKorisnik.vue"
import UserSidebar from "../components/Korisnik/sidebar/UserSidebar.vue"
import KorpaKorisnik from "../components/Korisnik/KorpaKorisnik.vue"
import Proizvodi from "../components/Korisnik/Proizvodi.vue"
import { setPageShown, getPageToShow, getUserInfo } from '../services/contextManagement';

export default {
    // eslint-disable-next-line vue/no-unused-components
    components: { ZakazivanjaKorisnik, UserSidebar, KorpaKorisnik,  HeaderBar, Proizvodi, FooterBar, CustomBar},
    data() {
        return {
            menuItems: [
                {
                    key: 1,
                    label: 'Zakaži',
                    index: 'zakazivanja'
                },
                {
                    key:2,
                    label: 'Proizvodi',
                    index: 'proizvodi'
                }
            ],
            showComp: 'profil',
            userType: ''
        }
    },
    methods: {
        setComponent(component){
            this.showComp = component;
            setPageShown(component);
        },
    },
    mounted: function() {
        let nextPage = getPageToShow().page;
        if(nextPage != "Pocetna")
            this.showComp = getPageToShow().page;
        else this.showComp = "profil";
        this.userType = getUserInfo().userType;
    }
}
</script>

<style scoped>
    .user-container{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left:0;
        z-index: -1;
        background-size: cover;
        background-position: bottom;
        background-image: linear-gradient(
            rgba(26, 111, 168, 0.171),
            rgba(57, 63, 61, 0.205)
        ),url("../assets/pozadina.png");
    }

</style>