<template>
    <div class="main-container">
        <header-bar :list="this.menuItems" @showHomePage="setComponent($event)"
            @changeView="setComponent($event)" :type="this.userType">
        </header-bar>
        <div class="main" v-if="this.showComp == 'pocetna'">
            <div class="informacije">
                <div class="info">
                    <h3>MEDICOprema</h3>
                    <p>MEDICOprema se nalazi na opštini Mediana, mesto Niš, adresa Rajićeva 36. Matični broj preduzeća je 11561867.
                    Privredno društvo za proizvodnju medicinske opreme MEDICOprema doo Niš je osnovano 23.08.2002. godine.
                    Preduzeće MEDICOprema je u statusu: aktivno privredno društvo.
                    Pretežna delatnost preduzeća je proizvodnja medicinskih i stomatoloških materijala, šifra delatnosti 1456, industrija.</p>
                </div>
            </div>
        </div>
        <proizvodi v-if="this.showComp == 'proizvodi'"></proizvodi>
     <!-- <korpa-korisnik v-if="this.showComp == 'korpa'"></korpa-korisnik> -->
        <zakazivanja-korisnik v-if="this.showComp == 'zakazivanja'" ></zakazivanja-korisnik>
        <user-sidebar v-if="this.showComp == 'profil'" ></user-sidebar>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
import HeaderBar from '../components/appBar/HeaderBar.vue'
import FooterBar from '../components/appBar/FooterBar.vue'
import Proizvodi from "../components/Korisnik/Proizvodi.vue"
import { setPageShown, getUserInfo, setUserInfo } from '../services/contextManagement';
import UserSidebar from "../components/Korisnik/sidebar/UserSidebar.vue";
// import KorpaKorisnik from "../components/Korisnik/KorpaKorisnik.vue";
import ZakazivanjaKorisnik from "../components/Korisnik/ZakazivanjaKorisnik.vue";
import { ANONYMOUS_USER_TYPE } from '../services/authFetch';
export default {
    components: {HeaderBar, FooterBar, Proizvodi, UserSidebar, ZakazivanjaKorisnik},
    data() {
        return{
            count: 0,
            //showComp:'',
            menuItems: [
                {
                    key: 1,
                    label: 'Zakazivanja',
                    index: 'zakazivanja'
                },
                {
                    key:2,
                    label: 'Proizvodi',
                    index: 'proizvodi'
                }
            ],
            userType: '',
            showComp: 'pocetna'
        }
    },
    methods: {
        setComponent(component){
            this.showComp = component;
            setPageShown(this.showComp);
        }
    },
    mounted: function() {
        setPageShown("Pocetna");
        if(getUserInfo().userType == undefined){
            setUserInfo('',ANONYMOUS_USER_TYPE);
        }
        this.userType = getUserInfo().userType;
        this.showComp = "pocetna";
    }
}
</script>

<style scoped>
    .main-container {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        flex-direction: column;
        justify-content: space-between;
        overflow: auto;
        margin-left: auto;
        margin-right: auto;
        background-size: cover;
        background-position: bottom;
        background-image: linear-gradient(
            rgba(26, 111, 168, 0.171),
            rgba(57, 63, 61, 0.205)
        ),url("../assets/pozadina.png"); 
    }

    .main {
        height: 100%;
        z-index: 5;
    }

    .information {
        position: absolute;
        top: 15%;
        bottom: 15%;
        left: 55%;
        right: 5%;
        z-index: 4;
    } 

    .info{
        width: 100%;
        height: 60%;
        padding: 40px 40px;
        padding-top: 50px;
        margin-top: 120px;
        justify-content: center;
        background-color: rgba(231, 231, 236, 0.4);
        border-radius: 8px;
    }

    p {
        font-family:sans-serif;
        font-size:18px;
        color: black;
        text-align: center;
    }

    h3 {
        text-align: center;
    } 

  @media screen and (max-width: 800px) {
      .information{
          flex-direction: column;
          height: 800px;
          margin: 0px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      #naslov1{
          font-size: 60px;
          padding: 0;
          margin-bottom: 100px;

      }
      .info{
          width: 100%;
          margin: 0;
          padding: 15px;
          justify-content: center;
      }
      @media screen and (max-width: 390px){
          #naslov1{
              font-size: 50px;
          }
      }
  }
</style>
