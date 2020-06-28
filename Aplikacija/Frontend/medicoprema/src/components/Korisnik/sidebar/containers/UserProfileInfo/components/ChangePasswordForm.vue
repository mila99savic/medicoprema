<template>
    <div class="promena-lozinke-container">
        <div class="stavka">
            <label>Unesite staru lozinku:</label>
            <el-input class="input" type="password" v-model="oldPass" size="small"></el-input>
        </div>
        <div class="stavka">
            <label>Unesite novu lozinku:</label>
            <el-input class="input" type="password" v-model="newPass" size="small" show-password></el-input>
        </div>
        <div class="stavka">
            <label>Ponovite lozinku:</label>
            <el-input class="input" type="password" v-model="newPassRepeat" size="small" show-password></el-input>
        </div>
        <div class="dugme">
            <el-button @click="potvrdiUnos" round size="small" style="color:rgba(24, 102, 89, 0.925);">Potvrdi</el-button>
            <el-button @click="ponistiUnos" round size="small" type="danger" style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Poništi</el-button>
        </div>
    </div>
</template>

<script>
import {} from 'element-ui'
import { apiFetch, destinationUrl } from '../../../../../../services/authFetch';
import { getUserInfo } from '../../../../../../services/contextManagement';
// import { ERRORS} from "../../../../../../data/errorsCode.js";
    export default {
        data(){
            return{
                oldPass: '',
                newPass: '',
                newPassRepeat: '',
            }
        },
        methods: {
            validacijaPassworda: function(){
                if(this.oldPass == "" || this.newPass == "" || this.newPassRepeat == "") {
                    this.$message({message: "Morate uneti sva polja", type: 'error'});
                    return false;
                }
                if(this.newPass != this.newPassRepeat){
                    this.$message({message: "Lozinke se ne podudaraju", type: 'error'});
                    this.newPass = '';
                    this.newPassRepeat = '';
                    return false;
                }
                if(this.newPass.length < 6){
                    this.$message({message: "Lozinka mora da ima bar 6 karaktera", type: 'warning'});
                    this.newPass = '';
                    this.newPassRepeat = '';
                    return false;
                }
                return true;
            },
            potvrdiUnos: function(){
                // if(this.validacijaPassworda()){
                    let data = {
                        userId: getUserInfo().userID,
                        oldPass: this.oldPass,
                        newPass: this.newPass
                    }
                    apiFetch('PUT', destinationUrl + "/user/edit", data)
                    .then(result => {
                        // if(result.Success) {
                            console.log(result)
                            this.$message({message: "Uspesno ste promenili lozinku", type: "success"});
                            this.clearFormFilds();
                            this.$emit("closeChangePasswordForm");
                        // }
                        // else if(result.Errors != null) {
                        //     result.Errors.forEach(error => this.$message({
                        //         message: ERRORS[error.Code],
                        //         type: "warning"
                        //     }));
                        // }
                    });
                // }
            },
            ponistiUnos: function(){
                this.clearFormFilds();
                this.$emit("closeChangePasswordForm");
            },
            clearFormFilds() {
                this.newPass = "";
                this.newPassRepeat = "";
                this.oldPass = "";
            }
        }
    }
</script>

<style scoped>
    .promena-lozinke-container{
        width: 100%;
        height: 100%;
        margin-top: 30px;
    }
    .stavka{
        display: flex;
        align-content: center;
        justify-content: center;
        margin-top: 2vh;
    }
    label{
        flex: 1;
        font-size: 14px;
        flex-basis: 40%;
    }
    .input{
        flex: 1;
        flex-basis: 60%;
    }
    .dugme{
        margin-top: 1.5em;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>