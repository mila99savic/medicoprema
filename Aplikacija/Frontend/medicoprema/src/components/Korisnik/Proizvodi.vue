<template>
    <div class="proizvodi-container">
        <div class="lista-proizvoda" v-loading="isSpinnerActive" 
            :loading-options="{text: 'text', background: 'rgb(0, 0, 0, 0.6)'}" 
            v-if="this.Images == ''" > 
            <div v-for="(item, index) in proizvodi" :key="item.value" :list="proizvodi">
            <template>
                <div class="prikaz-proizvoda-container">
                    <div class="part1">
                        <img class="slika" v-bind:src="item.ImageUrl" />
                    </div>
                    <div class="part2part3">
                        <div class="part2" >
                            <h4>{{item.Title}}</h4>
                            <p id="opis">{{item.Description}}</p>
                             <!-- <input type="file" :disabled="omoguciDugme" accept="image/*" @change="uploadImage($event)" id="file-input" >  -->
                        </div>
                        <div class="part3">
                            <h6 id="cena">Cena: {{item.Price}}din</h6>
                            <el-button id="dugmeDodaj" type="success" size="medium" @click="onClickDodajUKorpu(index)">Dodaj u korpu</el-button>
                        </div>
                    </div>
                </div>
            </template>
            </div>
        </div> 
    </div>
</template>

<script>
// import { apiFetch, destinationUrl, REGULAR_USER_TYPE } from '../../services/authFetch';
// import { getUserInfo } from '../../services/contextManagement';
export default {
    data(){
        return{
            proizvodi: [],
            isSpinnerActive: false,
            indeksIzabranogProizvoda: null,
            Images: [],
        }
    },
    // methods: {
    //     loadDataTable() {
    //         apiFetch('GET', destinationUrl + "/Product/GetAllProducts")
    //             .then(result => {
    //                 this.proizvodi = result.Data;
    //             });
    //     },
    //     onClickDodajUKorpu(index) {
    //         if(getUserInfo().userType == REGULAR_USER_TYPE){
    //             this.indeksIzabranogProizvoda = index;
    //             this.dodajUKorpu(); 
    //         }
    //         else{
    //             this.$message("Da biste naručili proizvod morate se prijaviti ili registrovati.");
    //             this.$emit("gotoLogin");
    //         }
    //     },
    //     dodajUKorpu(){
    //         if(!this.isSpinnerActive) {    
    //             const formData = new FormData();
    //             formData.append("UserId", getUserInfo().userID);
    //             formData.append("CartItems[" + 0 + "].ProductType", this.proizvodi[this.indeksIzabranogProizvoda].ProductType);
    //             formData.append("CartItems[" + 0 + "].Format", this.proizvodi[this.indeksIzabranogProizvoda].Size);
    //             formData.append("CartItems[" + 0 + "].Quantity", 1);
    //             formData.append("CartItems[" + 0 + "].Title", this.proizvodi[this.indeksIzabranogProizvoda].Title);
    //             formData.append("CartItems[" + 0 + "].Price", this.proizvodi[this.indeksIzabranogProizvoda].Price);

    //             fetch(destinationUrl + "/Cart/AddToCart", {method: 'POST', body: formData})
    //                 .then(response => response.ok ? response.json() : new Error())
    //                 // eslint-disable-next-line no-unused-vars
    //                 .then(result => { 
    //                     this.$message({message: "Uspešno ste dodali proizvod u online korpu.", type: "success"});
    //                     this.resetSpinner();
    //                 })
    //                 // eslint-disable-next-line no-unused-vars
    //                 .catch(error => { 
    //                     this.$message({message: "Greška pri dodavanju proizvoda u online korpu.", type: "error"})
    //                     this.resetSpinner();
    //                 });
    //         }
    //         else {
    //             this.isSpinnerActive = true;
    //         }
    //     },
    //     resetSpinner() {
    //         this.isSpinnerActive = false;
    //     },
    // },
    // mounted: function() {
    //     this.$emit('loadDataTable');
    // },
    // created() {
    //     this.$on('loadDataTable', this.loadDataTable);
    // }
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
    align-items: center;
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
    align-items: center;
    flex-direction: column;
}
.part3{
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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


