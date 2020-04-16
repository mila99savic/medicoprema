<template>
    <div class="korpa-container">
        <h3>Sadržaj narudžbine</h3>
        <el-table :data="this.korpa" height="250" style="width:80%; border:1p solid black;">
            <el-table-column prop="Title" label="Naziv" class="table-column" min-width="100" sortable></el-table-column>
            <el-table-column prop="ProductType" label="Tip" class="table-column" min-width="100"></el-table-column>
            <el-table-column prop="Quantity" label="Količina" class="table-column" min-width="100"></el-table-column>
            <el-table-column prop="Price" label="Cena" class="table-column" min-width="100"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getUserInfo } from '../../services/contextManagement';
import { REGULAR_USER_TYPE } from '../../services/authFetch';
export default {
    data(){
        return{
            uprava:''
        }
    },
    beforeMount: function() {
        if(getUserInfo().userType == REGULAR_USER_TYPE){
            this.uprava = false;
        }
        else{
            this.uprava = true;
        }
    },
    props: ['korpa']
}
</script>

<style scoped>
.korpa-container{
        height: 47%;
        width: 90%;
        display: flex;
        flex-direction: column;
        background-color: rgba(206, 231, 230, 0.986);
        opacity: 1;
        padding: 1em;
        justify-content: center;
        align-items: center;
}
h3{
    text-align: center;
    font-family: sans-serif;
}
</style>
