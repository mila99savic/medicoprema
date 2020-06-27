<template>
    <div class="proizvodi-container">
        <div class="lista-proizvoda" v-loading="isSpinnerActive" 
            :loading-options="{text: 'text', background: 'rgb(0, 0, 0, 0.6)'}" 
            v-if="this.Images == ''" > 
            <div v-for="(item, index) in proizvodi" :key="item.value" :list="proizvodi">
            <template :list="this.menuItems">
                <div class="prikaz-proizvoda-container">
                    <div class="part1">
                        <img class="slika" v-bind:src="item.imageUrl" />
                    </div>
                    <div class="part2part3">
                        <div class="part2" >
                            <h4>{{item.title}}</h4>
                            <p id="opis">{{item.description}}</p>
                             <!-- <input type="file" :disabled="omoguciDugme" accept="image/*" @change="uploadImage($event)" id="file-input" >  -->
                        </div>
                        <div class="part3">
                            <h6 id="cena">Cena: {{item.price}}din</h6>
                            <el-button id="dugmeDodaj" type="success" round size="medium" style="color: white; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);" @click="onClickDodajUKorpu(index)">Dodaj u korpu</el-button>
                            <el-button type="text" @click="formaDodavanje = true" style="color:rgba(24, 102, 89, 0.925);" class="dugme-za-dodavanje">Komentari
                            </el-button> 
                            <el-button type="text" @click="formaDodaj = true" style="color:rgba(24, 102, 89, 0.925);" class="dugme-za-dodavanje">Dodaj komentar</el-button>                           
                            <el-dialog :before-close="handleFormClose" :visible.sync="formaDodaj">
                <form-dodaj-utisak-o-proizvodu @zavrsenUnos="prihvatiUnos($event)"></form-dodaj-utisak-o-proizvodu>
            </el-dialog>
                            <!-- <el-dialog :before-close="handleFormClose" :visible.sync="formaDodavanje" style="width:1500px; height:1000px">
                                    <el-table :data="listaUtisaka">
                                        <el-table-column prop="content" label="Komentar" class="table-column"></el-table-column>
                                        <el-table-column prop="date" label="Datum" class="table-column"></el-table-column>
                                        <el-table-column prop="productid" label="Ime proizvoda" class="table-column"></el-table-column>
                                        <el-table-column prop="korisnikid" label="Ime korisnika" class="table-column"></el-table-column>
                                        <el-table-column align="center">
                                            <template slot-scope="scope">
                                                <el-button type="danger" icon="el-icon-delete" circle size="mini" 
                                                    @click="deleteProductItem(scope.row._id)"></el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="dodaj-dugme">
                                    <el-button @click="innerVisible = true" style="color:white; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);" type="success" class="dugme-za-dodavanje" circle>
                                        <el-icon class="el-icon-edit"></el-icon>    
                                    </el-button>         
                                    </div>
                                    <el-dialog width="30%" title="Inner Dialog" :visible.sync="innerVisible" append-to-body>
                                    <form-dodaj-utisak-o-proizvodu @zavrsenUnos="prihvatiUnos($event)"></form-dodaj-utisak-o-proizvodu>
                                    </el-dialog>
                            </el-dialog> -->
                        </div>
                    </div>
                </div>
            </template>
            </div>
        </div> 
                <!-- <utisak-o-proizvodu v-if="this.showComp == 'utisak'"></utisak-o-proizvodu> -->

    </div>
</template>

<script>
import { apiFetch, destinationUrl, REGULAR_USER_TYPE } from '../../services/authFetch';
import { getUserInfo } from '../../services/contextManagement';
// import UtisakOProizvodu from "../../components/UtisakOProizvodu.vue";
import FormDodajUtisakOProizvodu from "../forme/FormDodajUtisakOProizvodu.vue";
export default {
        // eslint-disable-next-line vue/no-unused-components
    components:{ FormDodajUtisakOProizvodu },
    data(){
        return{
            formaDodavanje:false,
            formaDodaj:false,
            innerVisible: false,
            listaUtisaka: [],
            proizvodi: [],
            isSpinnerActive: false,
            indeksIzabranogProizvoda: null,
            Images: [],
            // showComp:'utisci'
        }
    },
    methods: {
        loadDataTable() {
            apiFetch('GET', destinationUrl + "/shop/products")
                .then(result => {
                    this.proizvodi = result.Data;
                });
        },
        loadTable(){
            apiFetch('GET', destinationUrl + "/comment/all")
                .then(result=>{
                    this.listaUtisaka=result.Data;
                });
        },
        prikazKomentara(){
            this.$emit("goToUtisakOProizvodu");
        },
        onClickDodajUKorpu(index) {
            if(getUserInfo().userType == REGULAR_USER_TYPE){
                this.indeksIzabranogProizvoda = index;
                this.dodajUKorpu(); 
            }
            else{
                this.$message("Da biste naručili proizvod morate se prijaviti ili registrovati.");
                this.$emit("gotoLogin");
            }
        },
        handleFormClose: function () {
            this.formaDodaj = false;
        },
        prihvatiUnos: function(event){
            this.formaDodaj = false
            if (event === 'cancel')
                return
            if (this.userId == '') {
                this.$message({message: "Problem sa autentifikacijom. Molimo vas prijavite se ponovo.", type: 'error'})
            }
            event.id_korisnik = this.userId;
            // this.sacuvajUtisak(event)
            this.loadTable()
        },
        zavrsiDodavanje(){
            this.showComp='';
            this.loadTable();
        },
        dodajUKorpu(){
            if(!this.isSpinnerActive) {    
                const formData = new FormData();
                formData.append("UserId", getUserInfo().userID);
                formData.append("cart[" + 0 + "].items.productId", this.proizvodi[this.indeksIzabranogProizvoda].ProductType);
                formData.append("cart[" + 0 + "].items.quantity", 1);
                formData.append("cart[" + 0 + "].items.productTitle", this.proizvodi[this.indeksIzabranogProizvoda].title);
                formData.append("cart[" + 0 + "].items.productPrice", this.proizvodi[this.indeksIzabranogProizvoda].price);

                fetch(destinationUrl + "/shop/postToCart", {method: 'POST', body: formData})
                    .then(response => response.ok ? response.json() : new Error())
                    // eslint-disable-next-line no-unused-vars
                    .then(result => { 
                        this.$message({message: "Uspešno ste dodali proizvod u online korpu.", type: "success"});
                        this.resetSpinner();
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(error => { 
                        this.$message({message: "Greška pri dodavanju proizvoda u online korpu.", type: "error"})
                        this.resetSpinner();
                    });
            }
            else {
                this.isSpinnerActive = true;
            }
        },
        resetSpinner() {
            this.isSpinnerActive = false;
        },
    },
    mounted: function() {
        this.$emit('loadDataTable');
    },
    created() {
        this.$on('loadDataTable', this.loadDataTable);
    }
}
</script>

<style  scoped>
.lista-proizvoda{
  display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.proizvodi-container{
        display: flex;
        height: 90%;
        width: 100%;
        flex-direction: column;
        background-color: rgba(224, 224, 235, 0.445);
        overflow: auto;
}
.prikaz-proizvoda-container{
    height: 290px;
    width: 75%;
    background: linear-gradient(0deg, #bccecfc7, #fcfcfcab );
    margin-top: 15px;
    border-radius: 3px;
    margin-left: 15%;
    display: flex;
    flex-direction: row;
}
.part1{
    height: 100%;
    width: 35%;
    display: flex;
    justify-content: center;
    align-proizvodi: center;
}
.part2part3{
    display: flex;
    width: 75%;
}
.part2{
     height: 100%;
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-proizvodi: center;
    flex-direction: column;
}
.part3{
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-proizvodi: center;
}
#cena{
    margin-bottom:20%; 
    margin-top:20%;
}
#dugmeDodaj{
    width: 50%;
    margin-bottom:20%;
}
.slika{
    height: 80%;
    width: 80%;
}
@media screen and (max-width: 1210px) {
    #dugmeDodaj{
        width: 70%;
        white-space: unset;
    }
}
@media screen and (max-width: 800px) {
    .part2part3{
        flex-direction: column;
        width: 60%;
    }
    .part1{
        width: 40%;
    }
    .part2{
        width: 100%;
    }
    .part3{
        width: 100%;
    }
    #cena{
        margin-bottom:2%; 
        margin-top:2%;
    }
    #dugmeDodaj{
        width: 60%;
        margin-bottom:2%;
    }
    #opis{
        display: none;
    }
}

</style>


