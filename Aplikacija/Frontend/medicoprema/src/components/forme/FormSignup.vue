<template>
    <div class="signup-container">
        <el-dialog visible width="30%" @close="$emit('closeSignupForm')">
            <div class="forma">
                <el-form>
                    <el-popover>
                    <img :src="Logo" style="height:70px; width: 200px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                    </el-popover>
                    <div class="stavka">
                        <label>Naziv ustanove:</label>
                        <el-input class="input" v-model="signupData.name" >
                            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="stavka">
                        <label>Ovlašćeni:</label>
                        <el-input class="input" v-model="signupData.lastname">
                             <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="stavka">
                        <label>Adresa:</label>
                        <el-input class="input" v-model="signupData.address">
                             <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="stavka">
                        <label>Broj telefona:</label>
                        <el-input class="input" v-model="signupData.number">
                             <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="stavka">
                        <label>E-mail:</label>
                        <el-input class="input" v-model="signupData.email">
                             <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="stavka">
                        <label>Korisničko ime:</label>
                        <el-input class="input" v-model="signupData.username">
                             <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="stavka">
                        <label>Lozinka:</label>
                        <el-input class="input" v-model="signupData.password" show-password></el-input>
                    </div>
                    <div class="dugme">
                        <el-button @click="onSignUpClick()" round style="margin-right:5px; color: white; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);">Registruj se</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
// import router from '../../routes/route.js';
import {setUserInfo } from "../../services/contextManagement";
import { apiFetch, destinationUrl,UserTypes, REGULAR_USER_TYPE } from '../../services/authFetch';
//import { destinationUrl } from '../../services/authFetch';
//import { ERRORS } from '../../data/errorsCode';
export default {
    data() {
        return {
            Logo: logofirme2,
            signupData: {
                name: '',
                lastname: '',
                address: '',
                number: '',
                email: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSignUpClick: async function() {
            // if(!this.isDataValid())
            //     this.$message({message: "Morate popuniti sva polja", type: "warning"});
            if (this.signupData.name==="" || this.signupData.lastname==="" || this.signupData.address===""
                || this.signupData.number==="" || this.signupData.email==="" || this.signupData.username==="" || this.signupData.password===""){
                    this.$message({message: "Morate popuniti sva polja", type: "warning"});
                }
            // else if(!this.isPhoneNumberValid())
            //     this.$message({message: "Broj telefona nije validan", type: "warning"});
            else{
                console.log(this.signupData);
                 apiFetch('POST', destinationUrl + "/auth/register", this.signupData)
                        .then(result => {
                            if(result.Success) {
                                console.log(result);
                                setUserInfo(result.Data.id, REGULAR_USER_TYPE);
                                window.location.href = "/" + UserTypes[REGULAR_USER_TYPE];
                            }
                            else{
                                this.$message('doslo je do greske!');
                            }
                        });
            }
        },  
        // isDataValid() {
        //    const {FirstName, LastName, Address, PhoneNumber, Email, Username, Password} = this.signupData;
        //     // const signup = [...this.signupData];
        //     return !FirstName || !LastName || !Address || !PhoneNumber || !Email || !Username || !Password ? 
        //         false : true;
        //     // return true;
        // },
        isPhoneNumberValid() {
            // if(isNaN(parseInt(this.signupData.number)) || this.signupData.number == "")
            //     return false;
            return true;
        }


    //     async onSignUpClick(){
    //         const response = await apiFetch('POST', destinationUrl + '/auth/register', this.signupData);
    //         if(response.ok){
    //             const responseBody = await response.json();
    //             console.log(responseBody);
    //             if(responseBody.Success){
    //                 this.Notification('Successfuly registration', 'is-success');
    //                 setAccessToken(responseBody.AuthToken);
    //                 setUserInfo(responseBody.savedUser);
    //                 router.push('home');
                   
    //             }else  this.Notification(responseBody.Status, 'is-warning');
    //         }else alert('Connection error with DB');
    //     },
    //      Notification:  function(message, type){
    //          this.$buefy.notification.open({
    //             duration: 2000,
    //             message: message,
    //             position: 'is-top-left',
    //             type: type,
    //         });
    //    }
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