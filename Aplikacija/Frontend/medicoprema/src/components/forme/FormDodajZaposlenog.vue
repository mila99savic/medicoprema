<template>
    <div class="dodaj-zaposlenog-container">
        <el-dialog visible width="28%" heigth="30%" @close="$emit('zatvoriDodavanjeClana')" :modal-append-to-body="false">
            <el-form>
                <el-popover>
                    <img :src="Logo" style="height:70px; width: 200px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                </el-popover>
                <div class="stavka">
                    <label>Ime:</label>
                    <el-input class="input" v-model="zaposleni.FirstName" placeholder="Ime" size="small"></el-input>
                </div>
                <div class="stavka">
                    <label>Prezime:</label>
                    <el-input class="input" v-model="zaposleni.LastName" placeholder="Prezime" size="small"></el-input>
                </div>
                <div class="stavka">
                    <label>E-mail:</label>
                    <el-input class="input" v-model="zaposleni.Email" placeholder="korisnik@gmail.com" size="small"></el-input>
                </div>
                <div class="stavka">
                    <label>Korisničko ime:</label>
                    <el-input class="input" v-model="zaposleni.Username" placeholder="Korisničko ime" size="small"></el-input>
                </div>
                <div class="stavka">
                    <label>Šifra:</label>
                    <el-input class="input" v-model="zaposleni.Password" placeholder="******" size="small"></el-input>
                </div>
                <div class="dugme">
                        <el-button type="primary" size="mini" @click="prihvatiUnosForme()" style="margin-right:5px; border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Dodaj zaposlenog</el-button>
                        
                    </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
 import { apiFetch, destinationUrl, EMPLOYED_USER_TYPE } from "../../services/authFetch";
import { ERRORS } from '../../data/errorsCode';
export default {
    data() {
        return {
            Logo: logofirme2,
            zaposleni: {
                FirstName: '',
                LastName: '',
                Email: '',
                Username: '',
                Password: '',
                UserType: EMPLOYED_USER_TYPE
            }
        }
    },
    methods: {
        prihvatiUnosForme(){
            apiFetch('POST', destinationUrl + "User/CreateEmployedAsync", this.zaposleni)
                .then(result => {
                    if(result.Success) {
                        this.$message("Uspešno ste dodali novog zaposlenog!");
                        this.$emit("zatvoriDodavanjeClana");
                    }
                    else if (result.Errors != null && result.Errors.length != 0) {
                        this.$message({message: ERRORS[result.Errors[0].Code], type: "error"});
                    }
                }).catch(error => {
                    console.log(error);
                });
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
        flex-basis: 30%;
        width: 30%;
    }
    .input{
        flex-basis: 70%;
        width: 70%;
    }
    .dugme{
        display: flex;
        justify-content: center;
        margin-top: 5%;
    }
</style>