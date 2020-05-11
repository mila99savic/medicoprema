<template>
    <div class="promena-lozinke-container">
        <el-dialog visible class="dialog" width="30%" center>
            <el-form>
                <el-popover>
                    <img :src="Logo" style="height:50px; width: 150px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
                </el-popover>
                <div class="naziv">
                    <h5>Promena lozinke</h5>
                </div>
                <div class="stavka">
                    <label>Unesite staru lozinku:</label>
                    <el-input type="password" v-model="oldPass" size="small"></el-input>
                </div>
                <div class="stavka">
                    <label>Unesite novu lozinku:</label>
                    <el-input type="password" v-model="newPass" size="small" show-password></el-input>
                </div>
                <div class="stavka">
                    <label>Ponovite lozinku:</label>
                    <el-input type="password" v-model="newPassRepeat" size="small" show-password></el-input>
                </div>
                <div class="dugme">
                    <el-button @click="potvrdiUnos" size="small" type="success" icon="el-icon-check" circle style=" background-color:rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);"></el-button>
                    <el-button @click="ponistiUnos" size="small" type="danger" style="background-color:white; border-color:white; color:rgba(24, 102, 89, 0.925);">Poništi</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
export default {
    data(){
        return{
            Logo: logofirme2,
            oldPass: '',
            newPass: '',
            newPassRepeat: ''
        }
    },
    methods: {
        validacijaSifre: function(){
            if(this.newPass != this.newPassRepeat){
                this.$message({message:"Lozinke se ne podudaraju", type: 'error' })
                this.newPass = ''
                this.newPassRepeat = ''
                return false
            }
            if(this.oldPass.length>16){
                this.$message({message:"Lozinka može da ima najviše 16 karaktera", type:'error'})
                this.newPass = ''
                this.newPassRepeat = ''
                return false
            }
            return true
        },
        potvrdiUnos: function(){
            if(this.validacijaSifre()){
                var sifra = {
                    newPassword: this.newPass,
                    oldPassword: this.oldPass
                }
                this.$emit("zavrsenaPromena", sifra)
            }
        },
        ponistiUnos: function(){
            this.$emit("zavrsenaPromena",'cancel');
        }
    }
}
</script>

<style scoped>
    .promena-lozinke-container{
        display: flex;
        justify-content: center;
        height: 100%;
        widows: 100%;
    }
    /* .stavka label{
        width: 40%;
        font-size: 13px;
    }
    .stavka label + * {
        width: 60%;
    } */
    .stavka{
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }
    .el-input{
        flex-basis: 60%;
        margin: 0;  
    }
    label{
        flex-basis: 40%;
        font-size: 13px;
    }
    .dugme{
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
    }
</style>