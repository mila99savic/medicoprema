<template>
    <div class="profil-card">
        <div class="profile">
            <img :src="profileUrl"/>
        </div>
        <div class="profile-info">
            <label>Ime:</label>
            <label>{{user.FirstName}}</label>
        </div>
        <div class="profile-info">
            <label>Prezime:</label>
            <label>{{user.LastName}}</label>
        </div>
        <div class="profile-info">
            <label>E-mail:</label>
            <label>{{user.Email}}</label>
        </div>
        <div class="profile-info">
            <label>Lozinka:</label>
            <label>{{user.Password}}</label>
        </div>
        <div class="profile-info">
            <label>Adresa:</label>
            <label>{{user.Address}}</label>
        </div>
        <div class="profile-info">
            <label>Broj telefona:</label>
            <label>{{user.PhoneNumber}}</label>
        </div>
        <div class="dugme">
            <el-button class="dugme-lozinka" type="primary" @click="() => $emit('openChangePasswordForm')" style="margin-right:5px; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);">Promeni lozinku</el-button>
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
                FirstName: '',
                LastName: '',
                Email: '',
                Password: '',
                Address: '',
                PhoneNumber: ''
            }
        }
    },
    methods: {
        getUser() {
            let userId = getUserInfo().userID;
            fetch(destinationUrl + 'User/GetUserById/?id=' + userId, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())
                .then(result => {
                    this.user.FirstName = result.Data.FirstName;
                    this.user.LastName = result.Data.LastName;
                    this.user.Email = result.Data.Email;
                    this.user.Password = "*****";
                    this.user.Address = result.Data.Address;
                    this.user.PhoneNumber = result.Data.PhoneNumber;
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
