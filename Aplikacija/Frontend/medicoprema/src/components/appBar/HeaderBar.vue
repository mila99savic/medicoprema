<template>
    <div class="header-container">
        <nav class="container">
            <div class="navbar-left">
                <el-popover
                    placement="top-start"
                    title="MEDICOprema"
                    width="200"
                    trigger="hover">
                    <img :src="Logo" @click="showHomePage()" style="height:70px; width: 200px;" slot="reference"/> 
               </el-popover>
            </div>
            <div class="navbar-right">
                <ul class="items">
                    <li class="list-item" v-for="item in itemList" :key="item.value" @click="emitMenuSelect(item.index)">
                        <a style="text-decoration:none; color:white;">{{item.label}}</a>
                    </li>
                    <li v-if="this.type == ANONYMOUS_USER_TYPE">
                        <el-button type="primary" @click="logovanje()"> Prijavi se </el-button>
                    </li>
                    <li v-if="this.type == REGULAR_USER_TYPE">
                        <el-button type="primary" @click="signOut()"> Odjavi se </el-button>
                    </li>
                    <li v-if="this.type == ANONYMOUS_USER_TYPE">
                        <el-button type="primary" class="dugme" @click="Signup()" plain> Registruj se </el-button>
                    </li>
                    <li v-if="this.type == REGULAR_USER_TYPE" @click="emitMenuSelect('korpa')">
                        <el-button type="primary" class="dugme" @click="$emit('signup')" plain>
                            <el-icon class="el-icon-shopping-cart-2"></el-icon>
                        </el-button>
                    </li>
                    <li v-if="this.type == REGULAR_USER_TYPE" @click="emitMenuSelect('profil')">
                        <el-button type="primary" class="dugme" @click="$emit('signup')" plain>
                            <el-icon class="el-icon-user-solid"></el-icon>
                        </el-button>
                    </li>
                </ul>
            </div>
            <div class="navbar-right-menu">
                <el-button  style="opacity:0.9; height: 50px; width: 50px;"> 
                    <el-icon class="el-icon-menu"></el-icon>
                </el-button>
            </div>
        </nav>
        <login v-if="this.showComp == 'login'" @closeLoginForm="signupEnd" @goToSignUpForm="Signup"></login>
        <form-signup v-if="this.showComp == 'signup'" @zavrsiPrijavu="signupEnd" ></form-signup>
    </div>
</template>

<script>
import popover from 'element-ui';
import logofirme from '../../assets/logofirme.png';
import menu from '../../assets/menu.png';
import { apiFetch, destinationUrl, ANONYMOUS_USER_TYPE, REGULAR_USER_TYPE } from '../../services/authFetch';
import { clearSessionStorage, clearLocalStorage, getPageToShow, setUserInfo } from '../../services/contextManagement';
import Login from "../forme/FormLogin.vue";
import FormSignup from "../forme/FormSignup.vue";
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {popover, Login, FormSignup},
    data(){
        return{
            itemList: this.list,
            slika: menu,
            showComp: '',
            ANONYMOUS_USER_TYPE: ANONYMOUS_USER_TYPE,
            REGULAR_USER_TYPE: REGULAR_USER_TYPE,
            Logo: logofirme
        }
    },
    methods: {
        showHomePage() {
            this.$emit('showHomePage', "pocetna");
        },
        signOut() {
            apiFetch('POST', destinationUrl + "/User/SignOut")
                .then(result => {
                    if(result.Success) {
                        clearLocalStorage();
                        clearSessionStorage();
                        setUserInfo(null, ANONYMOUS_USER_TYPE);
                        window.location.href = "/";
                    }
                });
        },
        signupEnd: function(){
            this.showComp = getPageToShow().page;
        },
        Signup: function(){
            this.showComp = 'signup';
        },
        logovanje: function(){
            this.showComp = 'login';
        }
    },
    props: ['list','type']
    
}
</script>

<style scoped>
    .header-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        background-color: rgb(0, 170, 133);
        flex: 0 0 70px;
    }
    .container{
        padding: 1em;
        display: flex;
        color: white;
        flex-direction: row;
    }
    .navbar-item{
        color:#c3cfe2; 
        margin-top:5px; 
        font-family:Arial Black, Gadget, sans-serif; 
        font-size:20px; text-decoration:none;
    }
    .navbar-left{
        text-transform: uppercase;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navbar-right{
        display: flex;
        width: 80%;
        justify-content: flex-end;
        align-items: stretch;
    }
    .dugme{
        margin-left: 15px;
    }
    .navbar-right-menu{
        display: none;
    }
    .items{
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        margin: 0;
        align-items: center;
    }
    .list-item{
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 25px;
        margin-left: 15px;
        font-size: 16px;
        width: 95px;
        height: 38px;
        justify-content: center;
        display: flex;
        align-items: center;
    }
    .list-item:hover{
        background-color: hsl(199, 75%, 54%);
        transition-duration: 500ms;
        border-radius: 6px;
    }

    @media screen and (max-width: 995px){
        .header-container{
            height: auto;
        }
        .container{
            flex-direction: column;
            height: 100%;
        }
        .navbar-left{
            width: 100%;
        }
        .navbar-right{
            width: 100%;
            justify-content: center;
        }
        .navbar-right-menu{
            display: none;
            flex-direction: row-reverse;
            width: 100%;
            margin-left: 10%;
        }
        .items{
            flex-wrap: wrap;
            justify-content: center;
            padding: 0%;
        }
        .items > li{
            margin: 5px 0;
        }
        .navbar-item{
            font-size: 15px;
            margin-left: 20px;
        }  
    }
</style>