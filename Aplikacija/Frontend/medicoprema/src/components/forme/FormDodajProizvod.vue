<template>
    <div class="dodaj-proizvod-container">
        <el-dialog visible width="28%" heigth="30%" @close="$emit('zatvoriDodavanjeProizvoda')" :modal-append-to-body="false">
            <el-form>
                <el-popover>
                    <img :src="Logo" style="height:70px; width: 200px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                </el-popover>
                <div class="stavka">
                    <label>Naziv:</label>
                    <el-input class="input" v-model="proizvod.title" placeholder="Naziv proizvoda" size="small">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </div>
                <div class="stavka">
                    <label>Cena:</label>
                    <el-input class="input" v-model="proizvod.price" placeholder="Cena proizvoda" size="small">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </div>
                <div class="stavka">
                    <label>Opis:</label>
                    <el-input class="input" type="textarea" :autosize="{ minRows: 4}" v-model="proizvod.description" placeholder="Opis proizvoda" size="small"></el-input>
                </div>
                <!-- <div class="stavka"> -->
                    <!-- <label>Slika:</label> -->
                    <!-- <input type="file" accept="image/*" @change="uploadImages($event)" id="file-input"> -->
                <!-- </div> -->
                <div class="stavka">
                    <label>Slika:</label>
                    <el-input class="input" type="textarea" :autosize="{ minRows: 4}" v-model="proizvod.imageUrl" placeholder="Slika proizvoda" size="small"></el-input>
                </div>

                <div class="dugme">
                    <el-button round size="mini" @click="addProduct()" style="color:white; margin-right:5px; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Dodaj proizvod</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
//import { ERRORS } from '../../data/errorsCode';
import { destinationUrl, apiFetch } from '../../services/authFetch';
export default {
    data(){
        return{
            Logo:logofirme2,
            proizvod: {
                title: '',
                price: '',
                description: '',
                imageUrl: ''
            },
            isSpinnerActive: false,
            isUploadingDone: false,
            //uploadingImagesInProgress: false
        }
    },
    methods: {
        validacija() {
            if(this.proizvod.title == '' || this.proizvod.price == '' || this.proizvod.description == '') {
                this.$message({message: "Morate uneti polja za naziv i cenu, kao i upload-ovati sliku.", type: "warning"});
                return false;
            }
            else if(this.proizvod.imageUrl == '' 
            //&& !this.uploadingImagesInProgress
            ){
                this.$message({message: "Morate upload-ovati bar jednu sliku", type: "warning"});
                    return false;
            }
            else
                return true;
        },
        async addProduct(){
            console.log(this.proizvod)
            if(!this.validacija())
                return;
            
            await apiFetch('POST', destinationUrl + "/admin/addProduct/", this.proizvod)
            .then(response => {
                if(response.Success)
                    this.$message('Dodali ste prizvod!');
                else{
                    this.$message('doslo je do greske!');
            }

                 }).catch(err => console.log(err))
                    
            
        }
    }
}
</script>

<style scoped>
    .dodaj-proizvod-container {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    label {
        font-size: 15px;
        text-align: left;
        flex-basis: 30%;
        width: 30%;
    }
    .stavka {
        display: flex;
        flex-direction: row;
        margin: 5px;
        justify-content: space-between;
    }
    .el-input {
        flex-basis: 70%;
        width: 70%;
    }
    .el-input.el-input--small{
        width: 100%;
        margin: 0px;
    }
    .dugme {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-right: 5px;
    }
</style>

