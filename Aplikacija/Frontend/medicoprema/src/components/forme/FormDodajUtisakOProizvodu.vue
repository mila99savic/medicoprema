<template>
    <div class="utisak-o-proizvodu">
        <el-dialog visible class="dialog" width="30%" center>
            <el-popover>
                <img :src="Logo" style="height:50px; width: 150px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
            </el-popover>
            <h5>Dodaj utisak o proizvodu</h5>
            <!-- <label class="form-line">Tekst:</label> -->
            <el-input type="textarea" v-model="utisakText" :rows="10"></el-input>
            <div class="dugme">
                <el-button @click="potvrdiUnos" type="success" style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Sačuvaj</el-button>
                <el-button @click="ponisti" type="danger" style="color:rgba(24, 102, 89, 0.925); background-color: white; border-color:white">Poništi</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../../assets/logofirme2.png';
export default {
    data() {
        return{
            Logo: logofirme2,
            utisakText:''
        }
    },
    methods: {
        potvrdiUnos: function(){
            if(this.utisakText==='')
            {
                this.$message('Morate uneti tekst utiska')
                return
            }
            var novo = {
                tekst: this.utisakText,
            }
            this.utisakText=''
            this.$emit('zavrsenUnos', novo)
        },
        ponisti: function(){
            this.$emit('zavrsenUnos','cancel')
        }
    }
}
</script>

<style scoped>
    .utisak-o-proizvodu{
        display: flex;
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