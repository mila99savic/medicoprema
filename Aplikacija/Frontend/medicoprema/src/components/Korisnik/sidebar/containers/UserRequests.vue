<template>
  <div class="zakazivanja-korisnik-profil">
    <div class="zakazivanja-table">
      <h3>Lista zakazanih usluga</h3>
      <el-table
        :data="this.listaZahteva"
        :default-sort="{prop:'Date', order:'ascending'}"
        style="font-size:17px; width:100%;"
        max-height="250"
      >
        <el-table-column prop="date" label="Datum" class="table-column" sortable></el-table-column>
        <el-table-column prop="time" label="Vreme" class="table-column"></el-table-column>
        <el-table-column prop="location" label="Lokacija" class="table-column"></el-table-column>
        <el-table-column prop="type" label="Tip" class="table-column"></el-table-column>
        <el-table-column prop="status" align="center" label="Status">
          <!-- <template slot-scope="scope" label="Status">
                        <el-button v-if="scope.row.RequestStatus == 1" type="success"
                            icon="el-icon-check" circle @click="obavestenje(scope.row)"></el-button>
                        <el-button v-if="scope.row.RequestStatus == 2" type="danger"
                            icon="el-icon-close" circle @click="obavestenje(scope.row)"></el-button>
                        <el-button v-if="scope.row.RequestStatus == 3" type="warning"
                            icon="el-icon-quesstion" circle @click="obavestenje(scope.row)"></el-button>
          </template>-->
        </el-table-column>
        <el-table-column align="right" label="Obriši">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="obrisiZahtev(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "../../../../services/contextManagement";
import { apiFetch, destinationUrl } from "../../../../services/authFetch";
export default {
  data() {
    return {
      poruka1: "Vaš zahtev je prihvaćen.",
      poruka2: "Vaš zahtev je odbijen.",
      poruka3: "Vaš zahtev se obrađuje",
      listaZahteva: []
    };
  },
  methods: {
    obavestenje(row) {
      if (row.status == 1)
        this.$notify({
          title: "OBAVEŠTENJE",
          message: row.Notification == null ? this.poruka1 : row.Notification,
          type: "success",
          position: "bottom-right"
        });
      else if (row.ReqestStatus == 2)
        this.$notify({
          title: "OBAVEŠTENJE",
          message: row.Notification == null ? this.poruka2 : row.Notification,
          type: "error",
          position: "bottom-right"
        });
      else
        this.$notify({
          title: "OBAVEŠTENJE",
          message: this.poruka3,
          type: "warning",
          position: "bottom-right"
        });
    },
    obrisiZahtev(row) {
      this.listaZahteva = this.listaZahteva.filter(e => e._id != row._id);

      var body = {
        reqId: row.requestId,
        userId: getUserInfo().userID
      };
      console.log(body);

      apiFetch("DELETE", destinationUrl + "/request/delete/", body)
        .then(result => {
          console.log(result);
          if (result.Success) {
            this.$message("Zahtev je uspešno obrisan!");
            this.listaZahteva.splice(this.listaZahteva.indexOf(row), 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    apiFetch(
      "GET",
      destinationUrl + "/request/getByUserId/" + getUserInfo().userID
    )
      .then(result => {
        if (result.Success) {
          this.listaZahteva = result.Data;
          console.log(this.listaZahteva);
        }
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.zakazivanja-korisnik-profil {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.zakazivanja-table {
  width: 100%;
  display: flex;
  flex-direction: column;
}
h3 {
  text-align: center;
  font-family: sans-serif;
}
</style>