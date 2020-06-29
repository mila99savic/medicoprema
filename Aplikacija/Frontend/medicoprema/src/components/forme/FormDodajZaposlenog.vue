<template>
    <div class="dodaj-zaposlenog-container">
        <el-dialog visible width="28%" heigth="30%" @close="$emit('zatvoriDodavanjeClana')" :modal-append-to-body="false">
            <el-form>
                <el-popover>
                    <img :src="Logo" style="height:70px; width: 200px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                </el-popover>
                <div><h5>Dodavanje zaposlenog</h5></div>
                <div class="stavka">
                    <label>Ime:</label>
                    <el-input class="input" v-model="zaposleni.name" size="small">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </div>
                <div class="stavka">
                    <label>Prezime:</label>
                    <el-input class="input" v-model="zaposleni.lastname" size="small">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </div>
                <div class="stavka">
                    <label>E-mail:</label>
                    <el-input class="input" v-model="zaposleni.email" size="small">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </div>
                <div class="stavka">
                    <label>Korisničko ime:</label>
                    <el-input class="input" v-model="zaposleni.username" size="small">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </div>
                <div class="stavka">
                    <label>Šifra:</label>
                    <el-input class="input" v-model="zaposleni.password" size="small" show-password></el-input>
                </div>
                <div class="dugme">
                        <el-button round size="mini" @click="prihvatiUnosForme()" style="color:white; margin-right:5px; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Dodaj zaposlenog</el-button>
                        
                    </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
import {setUserInfo } from "../../services/contextManagement";
 import { apiFetch, destinationUrl, EMPLOYED_USER_TYPE } from "../../services/authFetch";
// import { ERRORS } from '../../data/errorsCode';
export default {
    data() {
        return {
            Logo: logofirme2,
            zaposleni: {
                name: '',
                lastname: '',
                email: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        prihvatiUnosForme:async function(){
            if (this.zaposleni.name==="" || this.zaposleni.lastname==="" || 
                this.zaposleni.email==="" || this.zaposleni.username==="" || this.zaposleni.password===""){
                    this.$message({message: "Morate popuniti sva polja", type: "warning"});
                }
            else{
                console.log(this.zaposleni);
                apiFetch('POST', destinationUrl + "/auth/registerEmployed", this.zaposleni)
                    .then(result => {
                        // console.log(result);
                                if(result.Success) {
                                    // console.log(result);
                                    setUserInfo(result.Data.id, EMPLOYED_USER_TYPE);
                                    this.$message('Uspesno dodat novi zaposleni!');
                                }
                                else{
                                    this.$message('doslo je do greske!');
                                }
                            });
            }
        }
    }
}
</script>

<style scoped>
    .dodaj-zaposlenog-container{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
    }
    .stavka{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px;
    }
    .label{
        font-size: 15px;
        text-align: left;
        flex-basis: 35%;
        width: 35%;
    }
    .input{
        flex-basis: 65%;
        width: 65%;
    }
    .dugme{
        display: flex;
        justify-content: center;
        margin-top: 5%;
    }
</style>