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
        </nav>
    </div>
</template>

<script>
import popover from 'element-ui';
import logofirme from '../../assets/logofirme.png';

export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {popover},
    data(){
        return{
            Logo: logofirme
        }
    }
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
    .navbar-left{
        text-transform: uppercase;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
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
    }
</style>