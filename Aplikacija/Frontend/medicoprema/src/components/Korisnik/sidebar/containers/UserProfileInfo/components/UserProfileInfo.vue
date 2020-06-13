<template>
    <div class="profil-card">
        <div class="profile">
            <el-avatar :size="70" :src="profileUrl"></el-avatar>
        </div>
        <div class="profile-info">
            <label>Ime:</label>
            <label>{{user.name}}</label>
        </div>
        <div class="profile-info">
            <label>Prezime:</label>
            <label>{{user.lastname}}</label>
        </div>
        <div class="profile-info">
            <label>E-mail:</label>
            <label>{{user.email}}</label>
        </div>
        <div class="profile-info">
            <label>Lozinka:</label>
            <label>{{user.password}}</label>
        </div>
        <div class="profile-info">
            <label>Adresa:</label>
            <label>{{user.address}}</label>
        </div>
        <div class="profile-info">
            <label>Broj telefona:</label>
            <label>{{user.number}}</label>
        </div>
        <div class="dugme">
            <el-button class="dugme-lozinka" round @click="() => $emit('openChangePasswordForm')" style="color:white; margin-right:5px; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);">Promeni lozinku</el-button>
        </div>
    </div>
</template>

<script>
import picture from "../../../../../../assets/profil_picture1.png";
import { getUserInfo } from '../../../../../../services/contextManagement';
import { destinationUrl } from '../../../../../../services/authFetch';
export default {
    data(){
        return{
            profileUrl: picture,
            user: {
                name: '',
                lastname: '',
                email: '',
                password: '',
                address: '',
                number: ''
            }
        }
    },
    methods: {
        getUser() {
            let userId = getUserInfo().userID;
            
            fetch(destinationUrl + '/user/findById/' + userId, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())                
                .then(result => {
                    this.user.name = result.Data.name;
                    this.user.lastname = result.Data.lastname;
                    this.user.email = result.Data.email;
                    this.user.password = "*****";
                    this.user.address = result.Data.address;
                    this.user.number = result.Data.number;
                }).catch(error => console.log(error));
        }
    },
    mounted: function(){
        this.getUser();
    }
}
</script>

<style scoped>
    .profile {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .profile-info {
        width: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 auto;     
    }

    .profil-card {
        width: 100%;
        padding: 1em;
        background: rgba(206, 231, 230, 0.986);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .dugme-lozinka{
        width: 200px;
        font-size: 15px;
    }
    .dugme{
        display: flex;
        height: 100px;
        justify-content: center;
        align-items: center;
    }


    .profile-info label {
        width: 40%;
        font-size: 1.35vw;
    }

    .profile-info label + label {
        color: rgba(0, 0, 0, 0.7)
    }
</style>
