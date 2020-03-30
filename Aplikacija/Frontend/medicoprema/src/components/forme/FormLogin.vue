<template>
    <div class="login-container">
        <el-dialog visible width="28%" @close="$emit('closeLoginForm')">
            <div class="forma">
                <el-form>
                    <el-popover>
                    <img :src="Logo" style="height:70px; width: 200px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                    </el-popover>
                    <div class="stavka">
                        <label>E-mail:</label>
                        <el-input class="input" v-model="loginData.Email" placeholder="korisnik@gmail.com"></el-input>
                    </div>
                    <div class="stavka">
                        <label>Lozinka:</label>
                        <el-input class="input" v-model="loginData.Password" placeholder="******"></el-input>
                    </div>
                    <div class="dugme">
                        <el-button @click="onLoginSubmit()" type="primary" style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Prijavi se</el-button>
                        <el-button type="text" @click="signUpForm()" style="color:rgba(24, 102, 89, 0.925);">Registruj se</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
import { apiFetch, destinationUrl, UserTypes } from '../../services/authFetch';
import { setUserInfo } from '../../services/contextManagement';
import {ERRORS} from '../../data/errorsCode';
export default {
    data () {
        return {
            Logo: logofirme2,
            loginData: {
                Email: '',
                Password: ''
            }
        }
    },
    methods: {
        onLoginSubmit() {
            if(!this.isDataValid()) 
                return;
            apiFetch('POST', destinationUrl + "/User/SignIn", this.loginData)
                .then(result => {
                    if(result.Succes){
                        setUserInfo(result.Data.Id, result.Data.UserType);
                        window.location.href = "/" + UserTypes[result.Data.UserType];
                    }
                    else if(result.Errors != null && result.Errors.length != 0) {
                        this.$message({message: ERRORS[result.Errors[0].Code], type:"error"});
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        signUpForm() {
            this.$emit("goToSignUpForm");
        },
        isDataValid() {
            if(this.loginData.Email == "" || this.loginData.Password == "") {
                this.$message({message: "Morate popuniti sva polja", type: "warning"});
                return false;
            }
            return true;
        }
    }
}
</script>

<style scoped>
    .login-container{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
    }
    .stavka{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .input{
        flex-basis: 70%;
        margin: 0;  
    }
    .label{
        flex-basis: 30%;
        font-size: 15px;
    }
    .dugme{
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
    }
    @media screen and (max-width: 1250px){
        .stavka{
            flex-direction: column;
            padding: 0;
        }
    }
</style>