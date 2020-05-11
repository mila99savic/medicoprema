<template>
    <div class="zakazivanja-korisnik-profil">
        <el-table :data="this.listaZahteva"
            :default-sort="{prop: 'Date', order: 'descending'}"
                style="font-size: 17px;" height="70%" width="70%">
            <el-table-column prop="Date" label="Datum" sortable class="table-column"></el-table-column>
            <el-table-column prop="Time" label="Vreme" class="table-column"></el-table-column>
            <el-table-column prop="Location" label="Lokacija" class="table-column"></el-table-column>
            <el-table-column prop="EventType" label="Tip" class="table-column"></el-table-column>
            <el-table-column prop="RequestStatus" align="center" label="Status" class="table-column">
                <template slot-scope="scope" label="Status">
                    <el-button v-if="scope.row.RequestStatus == 1" type="success"
                        icon="el-icon-check" circle @click="obavestenje(scope.row)"></el-button>
                    <el-button v-if="scope.row.RequestStatus == 2" type="danger"
                        icon="el-icon-close" circle @click="obavestenje(scope.row)"></el-button>
                    <el-button v-if="scope.row.RequestStatus == 3" type="warning"
                        icon="el-icon-question" circle @click="obavestenje(scope.row)"></el-button>
                </template>
            </el-table-column>
            <el-table-column align="right" label="Obriši">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle size="mini"
                        @click="obrisiZahtev(scope.row)"></el-button>                    
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { APPROVED_REQUEST_MESSAGE, REJECTED_REQUEST_MESSAGE, ON_HOLD_REQUEST_MESSAGE } from '../../data/constants';
import { getUserInfo } from '../../services/contextManagement';
import { destinationUrl, apiFetch } from '../../services/authFetch';
export default {
    data() {
        return{
            listaZahteva:[]
        }
    },
    methods: {
        obavestenje(row){
            if(row.RequestStatus == 1)
                this.$notify({title: "OBAVEŠTENJE", message: row.Notification==null ? APPROVED_REQUEST_MESSAGE : row.Notification, type: 'success', position: 'bottom-right'})
            else if(row.RequestStatus == 2)
                this.$notify({title: "OBAVEŠTENJE", message: row.Notification==null ? REJECTED_REQUEST_MESSAGE : row.Notification, type: 'error', position: 'bottom-right'})
            else
                this.$notify({title: "OBAVEŠTENJE", message: ON_HOLD_REQUEST_MESSAGE, type: 'warning', position: 'bottom-right'})
        },
        pribaviZahteve(){
            let userId = getUserInfo().userID;
            fetch(destinationUrl + '/Request/GetRequestsByUserId/?id=' + userId, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())
                .then(result=>{
                    this.listaZahteva=result.Data;
                })
        },
        obrisiZahtev(row){
            apiFetch('POST', destinationUrl + "/Request/DeleteRequest?id=" + row.Id)
                .then(result => {
                    if(result.Success) {
                        this.$message("Zahtev je uspešno obrisan!");
                        this.listaZahteva.splice(this.listaZahteva.indexOf(row),1);
                    }
                }).catch(error=>{
                    console.log(error)
                });
        }
    },
    beforeMount(){
        this.pribaviZahteve()
    }
}
</script>

<style scoped>
.zakazivanja-korisnik-profil{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
}
</style>