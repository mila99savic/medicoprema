<template>
    <div class="obaveza-container" v-if="this.obaveza">
        <div class="obaveza-container-inner">
            <div class="tabela-obaveza">
                <prikaz-obaveza-tabela></prikaz-obaveza-tabela>
            </div>
        </div>
    </div>
</template>

<script>
import PrikazObavezaTabela from './PrikazObavezaTabela';
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
    data(){
        return{
            broj: 0,
            obaveza: true
        }
    },
    components:{PrikazObavezaTabela},
    methods: {
        decrement: function(){
            if(this.broj > 0)
                this.broj--;
            else    
                this.broj=0;
        },
        increment: function(){
            if(this.broj < 11)
                this.broj++;
            else
                this.broj = 11;
        },
        zatvori: function() {
            this.$emit('editFinished', 'cancel')
        }
    }
}
</script>

<style scoped>
    .obaveza-container{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: bottom;
        background-image: linear-gradient(
            rgba(26, 111, 168, 0.171),
            rgba(57, 63, 61, 0.205)
        ),url("../../assets/task.jpg"); 
    }
    .obaveza-container-inner{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80%;
        width: 90%;
        /* background-color:  rgba(206, 231, 230, 0.986); */
        opacity: 1;
        padding: 1em;
    }
    .month{
        flex-direction: row;
        justify-content: center;
        display: flex;
    }
    #logoObligation{
        width: 4em;
        height: 2.5em;
    }
    .month-button{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .button-arrow{
        margin-right: 30px;
        margin-left: 30px;
    }
    .tabela-obaveza{
        height: calc(95% - 6em);
        overflow: auto;
        margin-top: 10px;
        margin-bottom: 25px;
    }
</style>