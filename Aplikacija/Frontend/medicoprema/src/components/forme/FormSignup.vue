<template>
    <div class="signup-container">
        <el-dialog visible width="30%" @close="$emit('closeSignupForm')">
            <div class="forma">
                <el-form>
                    <el-popover>
                    <img :src="Logo" style="height:70px; width: 200px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                    </el-popover>
                    <div class="stavka">
                        <label>Ime:</label>
                        <el-input class="input" v-model="signupData.FirstName" placeholder="Sanja"></el-input>
                    </div>
                    <div class="stavka">
                        <label>Prezime:</label>
                        <el-input class="input" v-model="signupData.LastName" placeholder="Stankovic"></el-input>
                    </div>
                    <div class="stavka">
                        <label>Adresa:</label>
                        <el-input class="input" v-model="signupData.Address" placeholder="Aleksandra Medvedeva bb"></el-input>
                    </div>
                    <div class="stavka">
                        <label>Broj telefona:</label>
                        <el-input class="input" v-model="signupData.PhoneNumber" placeholder="06X XXX XXX"></el-input>
                    </div>
                    <div class="stavka">
                        <label>E-mail:</label>
                        <el-input class="input" v-model="signupData.Email" placeholder="korisnik@gmail.com"></el-input>
                    </div>
                    <div class="stavka">
                        <label>Korisničko ime:</label>
                        <el-input class="input" v-model="signupData.Username" placeholder="Korisničko ime"></el-input>
                    </div>
                    <div class="stavka">
                        <label>Lozinka:</label>
                        <el-input class="input" v-model="signupData.Password" placeholder="******"></el-input>
                    </div>
                    <div class="dugme">
                        <el-button @click="onSignUpClick()" type="primary" style="margin-right:5px; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);">Registruj se</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
import {setUserInfo} from "../../services/contextManagement";
import { apiFetch, destinationUrl, UserTypes, REGULAR_USER_TYPE } from '../../services/authFetch';
import { ERRORS } from '../../data/errorsCode';
export default {
    data() {
        return {
            Logo: logofirme2,
            signupData: {
                FirstName: '',
                LastName: '',
                Address: '',
                PhoneNumber: '',
                Email: '',
                Username: '',
                Password: ''
            }
        }
    },
    methods: {
        onSignUpClick() {
            if(!this.isDataValid())
                this.$message({message: "Morate popuniti sva polja", type: "warning"});
            else if(!this.isPhoneNumberValid())
                this.$message({message: "Broj telefona nije validan", type: "warning"});
            else{
                apiFetch('POST', destinationUrl + "/User/CreateUserAsync", this.signupData)
                        .then(result => {
                            if(result.Success) {
                                setUserInfo(result.Data, REGULAR_USER_TYPE);
                                window.location.href = "/" + UserTypes[REGULAR_USER_TYPE];
                            }
                            else if(result.Errors != null && result.Errors.length != 0) {
                                this.$message({message: ERRORS[result.Errors[0].Code], type: "error"});
                            }
                        });
            }
        },
        isDataValid() {
            const {FirstName, LastName, Address, PhoneNumber, Email, Username, Password} = this.signupData;
            return !FirstName || !LastName || !Address || !PhoneNumber || !Email || !Username || !Password ? 
                false : true;
        },
        isPhoneNumberValid() {
            if(isNaN(parseInt(this.signupData.PhoneNumber)) || this.signupData.PhoneNumber == "")
                return false;
            return true;
        }
    }
}
</script>

<style scoped>
    .stavka{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px; 
    }
    .input{
        flex-basis: 70%; 
        margin: 0;
    }
    label{
        flex-basis: 30%;
        font-size: 15px;
    }
    .dugme{
        display: flex;
        justify-content: center;
        padding: 5px;
    }
    @media screen and (max-width: 1250px){
        .stavka{
            flex-direction: column;
            padding: 0;
        }
        .dugme{
            margin-top: 5px;
        }
        label{
            margin-bottom: 0;
        }
    }
</style> 