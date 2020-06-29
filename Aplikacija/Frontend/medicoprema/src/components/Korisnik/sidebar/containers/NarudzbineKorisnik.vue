<template>
    <div class="narudzbina-container">
        <div class="narudzbina-container-table">
            <h3>Lista narudžbina</h3>
            <el-table
                :data="this.listaNarudzbina"
                height="250"
                style="width:100%"
                :row-class-name="tableRowClassName"
                highlight-current-row
                @row-click="handleCurrentChange">
                <el-table-column min-width="20%" prop="date" label="Datum" sortable></el-table-column>
                <el-table-column min-width="20%" prop="address" label="Adresa"></el-table-column>
                <el-table-column min-width="20%" prop="price" label="Ukupna cena (din)"></el-table-column>
                <el-table-column min-width="20%" prop="number" label="Telefon"></el-table-column>
                <el-table-column min-width="20%" prop="status" label="Status"></el-table-column>
                <el-table-column min-width="20%" prop="notification" label="Notifikacija"></el-table-column>
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <el-button type="info" icon="el-icon-message" circle size="mini" @click="prikaziPoruku(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <prikaz-korpe :korpa="itemsinCart"></prikaz-korpe>
    </div>
</template>

<script>
import PrikazKorpe from "../../../prikazi/PrikazKorpe"
import ObavestiKorisnika from "../../../ObavestiKorisnika.vue"
import { APPROVED_REQUEST_MESSAGE, REJECTED_REQUEST_MESSAGE, ON_HOLD_REQUEST_MESSAGE } from "../../../../data/constants.js";
import { getUserInfo } from '../../../../services/contextManagement';
import { destinationUrl, apiFetch } from '../../../../services/authFetch';
// import { sortOrdersByDate } from '../../../../services/sort';
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {PrikazKorpe, ObavestiKorisnika},
    data() {
        return{
            listaNarudzbina:[],
            currentRow: null,
            itemsinCart: [],
            poruka1: APPROVED_REQUEST_MESSAGE,
            poruka2: REJECTED_REQUEST_MESSAGE,
            poruka3: ON_HOLD_REQUEST_MESSAGE
        }
    },
    methods: {
        handleCurrentChange(val){
            this.currentRow = val;
            console.log(this.currentRow.products)
            this.itemsinCart = this.currentRow.products;
        },
        prikaziPoruku(row){
            this.currentRow = row;
            if(this.currentRow.status == "potvrdjen")
                this.$notify({title: "OBAVEŠTENJE", message: this.currentRow.notification == null ? this.poruka1 : this.currentRow.Order.Notification, type:'success', position:'bottom-right'})
            else if(this.currentRow.status == "odbijen")
                this.$notify({title: "OBAVEŠTENJE", message: this.currentRow.notification == null ? this.poruka2 : this.currentRow.Order.Notification, type:'error', position:'bottom-right'})
            else
                this.$notify({title: "OBAVEŠTENJE", message: this.poruka3, type: 'warning', position: 'bottom-right'})
        },
        // eslint-disable-next-line no-unused-vars
        tableRowClassName({row, rowIndex}) {
            if(this.listaNarudzbina[rowIndex].status === 1){
                return 'success-row';
            }
            else if(this.listaNarudzbina[rowIndex].status === 2){
                return 'reject-row';
            }
            else if(this.listaNarudzbina[rowIndex].status === 3){
                return 'odHold-row';
            }
            else{
                return '';
            }
        }
    },
    mounted: function(){
         let userId = getUserInfo().userID;
            apiFetch('GET', destinationUrl + '/shop/orderdByUserId/' + userId)
                //.then(response => response.ok ? response.json() : new Error())
                .then(result =>{
                    this.listaNarudzbina = result.Data;
                    // sortOrdersByDate(result.Data.orders, false);
                })
    }
}
</script>

<style scoped>
    .narudzbina-container{
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;
    }
    .narudzbina-container-table{
        height: 47%;
        width: 90%;
        display: flex;
        flex-direction: column;
        background-color: rgba(206, 231, 230, 0.986);
        opacity: 1;
        padding: 1em 1em 0em 1em;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }

    .buttons {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
    }
    h3{
        text-align: center;
        font-family: sans-serif;
    }
</style>