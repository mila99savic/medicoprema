<template>
    <div class="narudzbina-container">
        <div class="narudzbina-container-table">
            <h3>Lista narudžbina</h3>
            <el-table
                :data="listaNarudzbina"
                max-height="1000"
                style="width:100%"
                :row-class-name="tableRowClassName"
                highlight-current-row
                @row-click="handleCurrentChange">
                <el-table-column min-width="20%" prop="Order.Date" label="Datum"></el-table-column>
                <el-table-column min-width="20%" prop="Address" label="Adresa"></el-table-column>
                <el-table-column min-width="20%" prop="Order.Price" label="Ukupna cena"></el-table-column>
                <el-table-column min-width="20%" prop="PhoneNumber" label="Telefon"></el-table-column>
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
import { destinationUrl } from '../../../../services/authFetch';
import { sortOrdersByDate } from '../../../../services/sort';
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
        loadOrders(){
            let userId = getUserInfo().userID;
            fetch(destinationUrl + '/Order/GetOrdersByUserId/?userId=' + userId, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())
                .then(result =>{
                    this.listaNarudzbina = sortOrdersByDate(result.Data, false);
                })
        },
        handleCurrentChange(val){
            this.currentRow = val;
            this.itemsinCart = this.currentRow.Order.CartItems;
        },
        prikaziPoruku(row){
            this.currentRow = row;
            if(this.currentRow.Order.RequestsStatus == 1)
                this.$notify({title: "OBAVEŠTENJE", message: this.currentRow.Order.Notification == null ? this.poruka1 : this.currentRow.Order.Notification, type:'success', position:'bottom-right'})
            else if(this.currentRow.Order.RequestsStatus == 2)
                this.$notify({title: "OBAVEŠTENJE", message: this.currentRow.Order.Notification == null ? this.poruka2 : this.currentRow.Order.Notification, type:'error', position:'bottom-right'})
            else
                this.$notify({title: "OBAVEŠTENJE", message: this.poruka3, type: 'warning', position: 'bottom-right'})
        },
        // eslint-disable-next-line no-unused-vars
        tableRowClassName({row, rowIndex}) {
            if(this.listaNarudzbina[rowIndex].Order.RequestsStatus === 1){
                return 'success-row';
            }
            else if(this.listaNarudzbina[rowIndex].Order.RequestsStatus === 2){
                return 'reject-row';
            }
            else if(this.listaNarudzbina[rowIndex].Order.RequestsStatus === 3){
                return 'odHold-row';
            }
            else{
                return '';
            }
        }
    },
    mounted: function(){
        this.loadOrders();
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