<template>
    <div class="utisci-korisnika-container">
        <div class="utisci-korisnika" >
            <h5 style="text-align:center; font-family: 'Times New Roman', Times, serif;">Lista utisaka o korisnicima</h5>
            <el-table :data="this.listaUtisaka" height="250" style="height:300px; width:900px; background: linear-gradient(0deg, #bccecfc7, #fcfcfcab);">
                <el-table-column prop="content" label="Komentar" class="table-column"></el-table-column>
                <el-table-column prop="date" label="Datum" class="table-column"></el-table-column>
                <el-table-column prop="nameKorisnika" label="Ime korisnika" class="table-column"></el-table-column>
                <el-table-column prop="addressKorisnika" label="Adresa korisnika" class="table-column"></el-table-column>
                <el-table-column align="center">
                </el-table-column>
            </el-table>
            <div class="dodaj-dugme">
            <el-button @click="formaDodavanje = true" style="color:white; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);" type="success" class="dugme-za-dodavanje" circle>
                <el-icon class="el-icon-edit"></el-icon>    
            </el-button>         
            </div>
            <el-dialog :before-close="handleFormClose" :visible.sync="formaDodavanje">
                <form-dodaj-utisak-o-korisniku @zavrsenUnos="prihvatiUnos($event)"></form-dodaj-utisak-o-korisniku>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import PrikazUtisakaOKorisniku from "./prikazi/PrikazUtisakaOKorisniku.vue";
import FormDodajUtisakOKorisniku from "./forme/FormDodajUtisakOKorisniku.vue";
import { apiFetch, destinationUrl } from '../services/authFetch'
import { setPageShown } from '../services/contextManagement'
export default {
        // eslint-disable-next-line vue/no-unused-components
    components:{ PrikazUtisakaOKorisniku, FormDodajUtisakOKorisniku},
    data(){
        return{
            listaUtisaka:[],
            formaDodavanje: false,
            showComp:''
        }
    },
    methods:{
        deleteProductItem(index){
            //let productId = getProductInfo().productID;
             //this.indeksIzabranogProizvoda = index;
             console.log(index);
            //console.log(id);
            apiFetch('DELETE', destinationUrl + "/admin/deleteProduct/" + index)
                .then(result =>{
                    if(result.Success){
                        this.$message("Proizvod je uspešno obrisan!");
                        this.$emit("loadDataTable");
                    }
                }).catch(error=>{console.log(error);})
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
            // this.sacuvajUtisak(event)
            this.loadDataTable()
        },
        dodajProizvod:function(){
            this.showComp='dodaj';
            setPageShown('dodaj');
        },
        zavrsiDodavanje(){
            this.showComp='';
            this.loadDataTable();
        },
        loadDataTable(){
            apiFetch('GET', destinationUrl + "/impression/all")
                .then(result=>{
                    this.listaUtisaka=result.Data;
                });
        }
    },
    mounted:function(){
        this.$emit('loadDataTable');
    },
    created(){
        this.$on('loadDataTable', this.loadDataTable);
    }
}
</script>

<style scoped>
    .utisci-korisnika-container{
        height: 100%;
        width: 100%;
        display: flex;
    }
    .utisci-korisnika{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* background-color: rgba(206, 231, 230, 0.986); */
        opacity: 1;
        padding: 1em;
        background-size: cover;
        background-position: bottom;
        background-image: linear-gradient(
            rgba(26, 111, 168, 0.171),
            rgba(57, 63, 61, 0.205)
        ),url("../assets/utisak.jpg"); 
        justify-content: center;
        
    }
    .dodaj-dugme{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    
    .el-table {
        margin-bottom: 15px;
        margin-left: 20%;
        margin-right: 20%;
        width: 100%;
    }
    @media screen and (max-width: 700px) {
    
    }
</style>