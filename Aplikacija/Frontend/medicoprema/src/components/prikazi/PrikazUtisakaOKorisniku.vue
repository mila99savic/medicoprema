<template>
    <div class="prikaz-utisaka-container">
        <div ref="containerUtisci" class="prikaz-utisaka">
            <div class="container">
                <el-card :key="utisak.id_utiska" class="utisak_card" v-for="utisak in utisci">
                    <div class="UtisakHeader">
                        <h1>{{utisak.korisnik}}</h1>
                        <el-button v-if="zaposleniAutor == utisak.id_utiska"
                            @click="deleteUtisak(utisak.id_utiska)" type="danger"
                            icon="el-icon-delete" circle size="mini" 
                            style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);"></el-button>
                    </div>
                    <div>
                        <p>{{utisak.tekst}}</p>
                    </div>
                    <label class="datum-footer">{{utisak.vreme}}</label>
                </el-card>
            </div>
            <div class="pagination-container">
                <el-pagination background class="obavestenja-pagination" @current-change="pageChange($event)"
                               layout="prev, pager, next"
                               :total="this.brojObavestenja"
                               :page-size="5"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import CustomBar from "../CustomBar.vue";
import {Card, Button, Icon, Pagination} from "element-ui";
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: { CustomBar, Card, Button, Icon, Pagination},
    data(){
        return{
            zaposleniAutor:this.idZaposlenog,
            ukupanBrojUtisaka:this.brojUtisaka,
            utisci:this.utisciZaPrikaz
        }
    },
    methods:{
        pageChange: function (event) {
                this.$emit('pageChange', event)
        },
        deleteUtisak: function(event){
            this.$emit('brisanjeUtiska',event)
        }
    },
    props:["utisciZaPrikaz", "brojUtisaka", "idZaposlenog", "trenutnaStrana"],
    watch:{
        utisciZaPrikaz: function(pom){
            this.utisci=pom;
            this.$refs['containerUtisci'].scrollTo(0,0)
        },
        brojUtisaka: function(pom){
            this.ukupanBrojUtisaka=pom
        }
    }
}
</script>

<style scoped>
    .prikaz-utisaka-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .prikaz-utisaka{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding-right: 17px;
        box-sizing: content-box;
    }
    .autor {
        font-size: 20px;
        margin: 0 auto;
    }
    .datum-footer {
        font-size: 18px;
        font-style: italic;
        float: right;
    }
    .pagination-container {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 2em;
        opacity: 0.8;
    }
    .utisak-card {
        width: 80%;
        /*height: 20em;*/
        margin: 0 auto;
        padding-bottom: 0.5em;
        border: none;
        margin-top: 1.5em;
        overflow: auto;
        background-color: rgba(221, 243, 241, 0.938);
        opacity: 0.8;

    }

    .utisakHeader {
        height: 20%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>