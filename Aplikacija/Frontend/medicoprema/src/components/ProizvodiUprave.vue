<template>
    <div class="proizvodi-uprave-container">
        <div class="proizvodi-uprave">
            <h5 style="text-align:center; font-family: 'Times New Roman', Times, serif;">Lista proizvoda</h5>
            <el-table :data="this.listaProizvoda">
                <el-table-column prop="Title" label="Naziv" class="table-column"></el-table-column>
                <el-table-column prop="Price" label="Cena" class="table-column"></el-table-column>
                <el-table-column prop="ProductType" label="Tip" class="table-column"></el-table-column>
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteProductItem(scope.row.Id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="dodaj-dugme">
                <el-button round size="mini" style="height:50px; width:130px; color:white; margin-right:5px; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);" @click="dodajProizvod"> Dodaj proizvod </el-button> 
            </div>
        </div>
        <form-dodaj-proizvod v-if="this.showComp == 'dodaj'" @zatvoriDodavanjeProizvoda="zavrsiDodavanje"></form-dodaj-proizvod>
    </div>
</template>

<script>
import FormDodajProizvod from './forme/FormDodajProizvod'
import { apiFetch, destinationUrl } from '../services/authFetch'
import { setPageShown } from '../services/contextManagement'
export default {
    components:{FormDodajProizvod},
    data(){
        return{
            listaProizvoda:[],
            showComp:''
        }
    },
    methods:{
        deleteProductItem(id){
            apiFetch('POST', destinationUrl + "/Product/RemoveShopProduct?productId=" + id)
                .then(result =>{
                    if(result.Success){
                        this.$message("Proizvod je uspešno obrisan!");
                        this.$emit("loadDataTable");
                    }
                }).catch(error=>{console.log(error);})
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
            apiFetch('GET', destinationUrl + "/Product/GetAllProducts")
                .then(result=>{
                    this.listaProizvoda=result.Data;
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
    .proizvodi-uprave-container{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .proizvodi-uprave{
        height: 85%;
        width: 90%;
        display: flex;
        flex-direction: column;
        background-color: rgba(206, 231, 230, 0.986);
        opacity: 1;
        padding: 1em;
    }
    .dodaj-dugme{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .el-table {
        margin-bottom: 15px;
        width: 100%;
    }
    @media screen and (max-width: 700px) {
        .proizvodi-uprave {
            height: 100%;
            width: 100%;
            padding: 0.5em;
        }
    }
</style>