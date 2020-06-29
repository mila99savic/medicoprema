<template>
    <div class="utisak-o-proizvodu">
        <!-- <el-dialog visible class="dialog" width="30%" center> -->
        <!-- <el-form> -->
            <el-popover>
                <img :src="Logo" style="height:50px; width: 150px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
            </el-popover>
            <h5>Dodaj utisak o proizvodu</h5>
            <div>
            <label>Proizvod:</label>
                <el-input v-model="data.nameProduct"></el-input>
            </div>
            <label class="form-line">Komentar:</label>
            <el-input type="textarea" v-model="data.content" :rows="10"></el-input>
            <div class="dugme">
                <el-button @click="potvrdiUnos()" type="success" round style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Sačuvaj</el-button>
                <!-- <el-button @click="ponisti" type="danger" round style="color:rgba(24, 102, 89, 0.925); background-color: white; border-color:white">Poništi</el-button> -->
            </div>
        <!-- </el-form> -->
        <!-- </el-dialog> -->
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
import { destinationUrl, apiFetch } from '../../services/authFetch';
import { getUserInfo } from '../../services/contextManagement';

export default {
    data() {
        return{
            Logo: logofirme2,
            data:{
                nameProduct:'',
                content: '',
                korisnikid:'',
                // productid:''
            }

        }
    },
    methods: {
        potvrdiUnos(){
            this.data.korisnikid = getUserInfo().userID;       
            console.log(this.data);

            apiFetch('POST', destinationUrl + "/comment/add", this.data)
                .then(response => {
                    console.log(response);
                    if(response.Success)
                        this.$message('Dodali ste utisak!');
                    else{
                        this.$message('Doslo je do greske! Ili proizvod ne postoji!');
                }

                    }).catch(err => console.log(err));
            },
        // ponisti: function () {
        //     this.$emit("zavrsenaPromena",'cancel');
        // }
    }
}
</script>

<style scoped>
    .utisak-o-proizvodu{
        /* display: flex; */
        width: 100%;
        height: 100%;
    }
    .form-line{
        display: block;
        margin-top: 1em;
    }
    .dugme{
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
    }
</style>