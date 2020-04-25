<template>
    <div class="utisak-o-korisniku-container">
        <div class="backgroundImage"></div>
        <div class="dugme-dodaj">
            <el-button @click="formaDodavanje = true" style="color:white; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);" type="success" class="dugme-za-dodavanje" circle="">
                <el-icon class="el-icon-edit"></el-icon>
            </el-button>
            <el-dialog :before-close="handleFormClose" :visible.sync="formaDodavanje">
                <form-dodaj-utisak-o-korisniku @zavrsenUnos="prihvatiUnos($event)"></form-dodaj-utisak-o-korisniku>
            </el-dialog>
        </div>
        <div class="utisak-o-korisniku">
            <prikaz-utisaka-o-korisniku trenutnaStrana="trenutnaStrana" :idZaposlenog="this.idZaposlenog"
                                :brojUtisaka="this.brojUtisaka"
                                :utisciZaPrikaz="this.utisciZaPrikaz"
                                @brisanjeUtiska="brisanjeUtiska($event)"
                                @pageChange="promenaStrane($event)">
            </prikaz-utisaka-o-korisniku>
        </div>
    </div>
</template>

<script>
import PrikazUtisakaOKorisniku from "./prikazi/PrikazUtisakaOKorisniku.vue";
import FormDodajUtisakOKorisniku from "./forme/FormDodajUtisakOKorisniku.vue";
import {apiFetch, destinationUrl} from "../services/authFetch";
import {dBTimeToString} from "../services/pomocneFunkcije";
import { getUserInfo } from '../services/contextManagement';
import {Button, Icon, Dialog} from 'element-ui'
export default {
    
    // eslint-disable-next-line vue/no-unused-components
    components:{PrikazUtisakaOKorisniku, FormDodajUtisakOKorisniku,Button,Icon,Dialog},
    data(){
        return{
            formaDodavanje: false,
            brojUtisaka: 0,
            utisciZaPrikaz: [],
            trenutnaStrana: 1,
            userId: '',
        }
    },
    methods:{
        promenaStrane: function (event) {
            this.trenutnaStrana = event
            this.pribaviUtiske()
        },
        handleFormClose: function () {
            this.formaDodavanje = false;
        },
        prihvatiUnos: function(event){
            this.formaDodavanje = false
            if (event === 'cancel')
                return
            if (this.userId == '') {
                this.$message({message: "Problem sa autentifikacijom. Molimo vas prijavite se ponovo.", type: 'error'})
            }
            event.id_zaposleni = this.userId;
            this.sacuvajUtisak(event)
            this.pribaviUtiske()
        },
        pribaviUtiske: async function(){
            var that = this
            await apiFetch('GET', destinationUrl + "/obavestenje/straniceno?strana=" + (that.trenutnaStrana - 1).toString()
                , {responseType: 'json'}).then(function (res) {
                // eslint-disable-next-line no-unused-vars
                var date
                res.rows.forEach(x => x.vreme = dBTimeToString(x.vreme))
                that.brojUtisaka = res.count
                that.utisciZaPrikaz = res.rows
            })
        },
        sacuvajUtisak: async function(body){
            var that = this
            return await apiFetch('POST', destinationUrl + "/obavestenje/dodaj", {responseType: 'text'}, body).then(async function(res){
                if(res.charAt(0) == '2'){
                    that.$message({message: "Uspešno dodat utisak.", type: "success"})
                    await that.pribaviUtiske()
                    return
                }
                that.$message({message: "Greška pri dodavanju utiska!", type: "error"})
            })
        },
        brisanjeUtiska: async function(id){
            var that = this
            await apiFetch('DELETE', destinationUrl + "/obavestenje/obrisi/" + id, {responseType: 'text'}).then(function (res) {
                if (res.charAt(0) == "2") {
                    that.$message({message: "Uspešno brisanje utiska", type: 'success'})
                    that.pribaviUtiske()
                    return
                }
                else {
                    that.$message({message: "Greška prilikom brisanja utiska!", type: 'error'})
                }
                that.pribaviUtiske()
            })
        }
    },
    props:["idZaposlenog"],
    beforeMount(){
        this.pribaviUtiske()
        this.userId= getUserInfo().userID
    }
}
</script>

<style scoped>
    .utisak-o-korisniku-container{
        width: 100%;
        height: 100%;
    }
    .dugme-dodaj{
        height: 4em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dugme-za-dodavanje{
        height: 4em;
        width: 4em;
    }
    .utisak-o-korisniku {
        height: calc(100% - 4em)
    }
    .backgroundImage {
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        background-image: url("../assets/pozadina.png");
        background-size: cover;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(3px);
    }
</style>