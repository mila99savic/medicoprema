<template>
    <div class="filter-container">
        <div class="item">
             <label>Ime: </label>
             <el-input v-model="ime" placeholder="Ime za pretragu">
                 <i slot="prefix" class="el-input__icon el-icon-search"></i>
             </el-input>
        </div>
        <div class="item">
            <label>Prezime: </label>
            <el-input v-model="prezime" placeholder="Prezime za pretragu">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ime: '',
            prezime: ''
        }
    }
}
</script>
<style>
    .filter-container{
        height: 50px;
        width: 100%;
        justify-content: center;
        display: flex;
        flex-direction: row;
    }
    .item{
        display: flex;
        flex-direction: row;
        margin-left: 20px;
    }
    label{
        margin-top: 5px;
        margin-right: 25px;
        font-family: 'Times New Roman', Times, serif;
        font-size: 18px;
    }
    
</style>


