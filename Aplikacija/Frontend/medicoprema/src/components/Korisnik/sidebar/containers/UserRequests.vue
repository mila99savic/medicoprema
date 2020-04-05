<template>
    <div class="zakazivanja-korisnik-profil">
        <el-table :data="this.listaZahteva"
            :default-sort="{prop:'Date', order:'ascending'}"
            style="font-size: 17px;" height="70%" width="70%">
            <el-table-column prop="Date" label="Datum" class="table-column"></el-table-column>
            <el-table-column prop="Time" label="Vreme" class="table-column"></el-table-column>
            <el-table-column prop="Location" label="Lokacija" class="table-column"></el-table-column>
            <el-table-column prop="EventType" label="Tip" class="table-column"></el-table-column>
            <el-table-column prop="RequestStatus" align="center" label="Status">
                <template slot-scope="scope" label="Status">
                    <el-button v-if="scope.row.RequestStatus == 1" type="success"
                        icon="el-icon-check" circle @click="obavestenje(scope.row)"></el-button>
                    <el-button v-if="scope.row.RequestStatus == 2" type="danger"
                        icon="el-icon-close" circle @click="obavestenje(scope.row)"></el-button>
                    <el-button v-if="scope.row.RequestStatus == 3" type="warning"
                        icon="el-icon-quesstion" circle @click="obavestenje(scope.row)"></el-button>
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
import { getUserInfo } from '../../../../services/contextManagement'
import { apiFetch, destinationUrl } from '../../../../services/authFetch'
export default {
    data() {
        return {
            poruka1: 'Vaš zahtev je prihvaćen.',
            poruka2: 'Vaš zahtev je odbijen.',
            poruka3: 'Vaš zahtev se obrađuje',
            listaZahteva: []
        }
    },
    methods: {
        obavestenje(row){
            if(row.ReqestStatus == 1) 
                this.$notify({title: "OBAVEŠTENJE", message: row.Notification==null ? this.poruka1 : row.Notification, type:'success', position: 'bottom-right'})
            else if(row.ReqestStatus == 2)
                this.$notify({title: "OBAVEŠTENJE", message: row.Notification==null ? this.poruka2 : row.Notification, type: 'error', position: 'bottom-right'})
            else
                this.$notify({title: "OBAVEŠTENJE", message: this.poruka3, type: 'warning', position: 'bottom-right'})
        },
        pribaviZahtev(){
            let userId = getUserInfo().userID;
            fetch(destinationUrl + '/Request/GetRequestsByUserId/?id=' + userId, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())
                .then(result => {
                    this.listaZahteva = result.Data;
                })
        },
        obrisiZahtev(row){
            apiFetch('POST', destinationUrl + "/Request/DeleteRequest?id=" + row.Id)
                .then(result => {
                    if(result.Success) {
                        this.$message("Zahtev je uspešno obrisan!");
                        this.listaZahteva.splice(this.listaZahteva.indexOf(row),1);
                    }
                }).catch(error => {console.log(error)});
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