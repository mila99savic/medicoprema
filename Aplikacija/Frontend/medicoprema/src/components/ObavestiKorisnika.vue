<template>
    <div class="obavestenje-container">
        <el-dialog width="30%" @close="$emit('zatvoriPoruku')" :visible.sync="dialog" :modal-append-to-body="false">
            <el-popover>
                <img :src="Logo" style="height:50px; width: 150px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
            </el-popover>
            <h5 style="text-align:left; font-family:sans-serif; font-size:15px;"> Obaveštenje korisniku </h5>
            <el-input v-model="obavestenje" type="textarea" :rows="2" style="height:200px" size="small" :autosize="{minRows:9, maxRows:9}"></el-input>
            <el-button round style="color: white; position:right; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);" size="small" @click="proslediPoruku">Pošalji</el-button>
        </el-dialog>
    </div>
</template>

<script>
import logofirme2 from '../assets/logofirme2.png';

export default {
    data() {
        return{
            Logo: logofirme2,
            obavestenje: '',
            dialog:true,
            mounted: function() {
                this.dialog=true
            }
        }
    },
    methods: {
        proslediPoruku() {
            this.$emit("proslediPoruku", this.obavestenje);
        }
    },
}
</script>