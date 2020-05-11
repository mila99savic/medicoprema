<template>
    <div class="forma-novo-obavestenje-container">
        <el-popover>
            <img :src="Logo" style="height:50px; width: 150px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
        </el-popover>
        <div><h5>Dodaj utisak o korisniku</h5></div>
        <div>
            <label>Korisnik:</label>
            <el-input v-model="naslov"></el-input>
        </div>
        <label class="form-line">Tekst:</label>
        <el-input type="textarea" v-model="obavestenjeText" :rows="10"></el-input>
        <div class="form-line">
            <el-button @click="potvrdiUnos" type="success" round style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);">Sačuvaj</el-button>
            <el-button @click="ponisti" type="danger" round style="color:rgba(24, 102, 89, 0.925); background-color: white; border-color:white">Poništi</el-button>
        </div>
    </div>
</template>
<script>
import {Form, Input, Button} from 'element-ui'
import logofirme2 from '../../assets/logofirme2.png';

export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {Form,Input,Button,},
    data() {
        return {
            Logo:logofirme2,
            obavestenjeText: '',
            naslov: '',
        }
    },
    methods: {
        potvrdiUnos: function () {
            if (this.naslov === '') {
                this.$message('Morate uneti naslov obavestenja')
                return
            }
            if (this.obavestenjeText === '') {
                this.$message('Morate uneti tekst obavestenja')
                return
            }
            var novo = {
                tekst: this.obavestenjeText,
                naslov: this.naslov,
            }
            this.obavestenjeText = ''
            this.naslov = ''
            this.$emit('zavrsenUnos', novo)
        },
        ponisti: function () {
            this.$emit('zavrsenUnos', 'cancel')
        }
    }
}
</script>
<style>
    .forma-novo-obavestenje-container {
        width: 100%;
        height: 100%;
    }
    .form-line{
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
    }
</style>

            