<template>
    <div class="menu-container">
        <div class="header-bar" text-color="white">
            <div class="naslov"><h3 style="color:rgba(173, 226, 222, 0.938); margin-top:5px; font-family:Arial Black, Gadget, sans-serif; font-size:30px;"> MEDICOprema </h3> </div>
            <div class="top-menu-button-container">
                <el-button class="top-menu-button" @click="zatvoriMeni">
                    <el-icon class="el-icon-menu"></el-icon>
                </el-button>
                <el-button class="odjava" type="primary" @click="logout()" style="margin-right:5px; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);"> Odjavi se </el-button>
            </div>
        </div>
        <div class="body-container">
            <transition name="el-zoom-in-center">
            <div class="side-menu" v-if="this.menuShown">
                <el-menu style="height:100%; font-family:sans-serif; 
                         background:  linear-gradient(0deg, rgba(173, 226, 222, 0.938), rgba(22, 177, 164, 0.979) );  font-size:20px;"
                    background-color="rgba(52, 211, 198, 0.986)"
                    mode="vertical"
                    text-color="white" 
                    active-text-color="rgba(144, 225, 240, 0.938)"
                    @select="emitMenuSelect($event)" :router="false">
                    <el-menu-item v-for="item in itemList" :key="item.key" class="side-menu-item" :index="item.index"
                        style=" background: linear-gradient(0deg, rgba(39, 160, 150, 0.938), rgba(22, 177, 164, 0.979) );">
                       <img v-if="item.slika != undefined" style="height:30%; margin-right: 1em; margin-left:0.1em; position:left;
                       margin-top:20px;" :src="getImgUrl(item.slika)"/>{{item.label}}
                    </el-menu-item>
                </el-menu>
            </div>
            </transition>
            <slot></slot>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {Button,Menu, MenuItem,Icon} from 'element-ui'
import { apiFetch, destinationUrl, ANONYMOUS_USER_TYPE } from '../services/authFetch';
import { clearLocalStorage, clearSessionStorage, setUserInfo } from '../services/contextManagement';
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {Icon,Button,Menu,MenuItem},
    data() {
        return{
            itemList: this.list,
            menuShown: true
        }
    },
    methods: {
        zatvoriMeni: function(){
            this.menuShown = !this.menuShown;
        },
        getImgUrl(slika){
            return require("../assets/" + slika)
        },
        emitMenuSelect: function(event){
            this.$emit('changeView', event)
        },
        logout(){
            apiFetch('POST', destinationUrl + "/User/SignOut")
                .then(result => {
                    if(result.Success) {
                        clearLocalStorage();
                        clearSessionStorage();
                        setUserInfo(null, ANONYMOUS_USER_TYPE);
                        window.location.href = "/";
                    }
                });
        }
    },
    props: ['list']
    
}
</script>
<style scoped> 
.naslov{
    display: flex;

    margin-top: 5px;
    padding-left: 2em;
}
.menu-container{
    flex-direction: column;
    height: 100%;
}
.header-bar{
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: column;
    position: relative;
    /*background-color: rgba(26, 104, 168, 0.904);*/
    background: linear-gradient(0deg, rgba(22, 177, 164, 0.979),rgba(173, 226, 222, 0.938) );
}
.top-menu-button-container{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    opacity: 0.95;
    position: absolute;
    top: 0;
    padding-right: 3em;
    padding-top: 0.5em;
    padding-bottom: 0.3em;
}
.body-container{
    display: flex;
    flex-direction: row;
    height: calc(100% - 56px);
    width: 100%;
    position: absolute;
    flex-direction: row;
}
.side-menu{
    height: 100%;
    width: 14em;
     /*background-color: #2980c7d3;*/

}
.side-menu-item{
    display: flex;
    
}
@media screen and (max-width: 700px){
    .body-container{
        flex-direction: column;
    }
    .side-menu{
        height: 225px;
        width: 100%;
    }
}

</style>


