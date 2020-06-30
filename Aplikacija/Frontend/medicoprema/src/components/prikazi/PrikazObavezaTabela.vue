<template>
  <div class="prikaz-obaveza">
    <el-table
      v-if="this.ListaObaveza.length > 0"
      :data="this.ListaObaveza"
      :default-sort="{prop: 'Date'}" height="400"
      style="height:700px; width:600px; background: linear-gradient(0deg, #bccecfc7, #fcfcfcab);">
      <!-- <el-table-column prop="CustomerFirstName" label="Ime" width="100px" class="table-column"></el-table-column> -->
      <!-- <el-table-column prop="CustomerLastName" label="Prezime" width="100px" class="table-column"></el-table-column> -->

      <el-table-column prop="date" label="Datum" width="200px" class="table-column" sortable></el-table-column>
      <el-table-column prop="location" label="Lokacija" width="200px" class="table-column"></el-table-column>
            <el-table-column
        prop="numberKorisnika"
        label="Broj telefona"
        width="200px"
        class="table-column"></el-table-column>
        <el-table-cloumn  width="139px"></el-table-cloumn>
      <el-table-column prop="type" label="Tip" width="139px" class="table-column"></el-table-column>
      <el-table-column prop="comment" label="Dodatne informacije" width="200px" class="table-column"></el-table-column>
      <el-table-column align="right" width="150px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="medium"
            
            @click="deleteTask(scope.row._id)"
          ></el-button> 
        </template>
      </el-table-column> 
    </el-table>
    <label v-else>Nemate dodeljene obaveze</label>
  </div>
</template>

<script>
import { destinationUrl, apiFetch } from "../../services/authFetch";
import { getUserInfo } from "../../services/contextManagement";
// const types = ["Obuka", "Servis aparata", "Preventivni godišnji pregled"];

export default {
  data() {
    return {
      ListaObaveza: [],
      rowdate: "",
      date: ""
    };
  },
  methods: {
    pribaviListuZahteva: function() {

      apiFetch('GET', destinationUrl + "/task/getTasks/" + getUserInfo().userID)
        //.then(response => (response.ok ? response.json() : new Error()))
        .then(result => {
          // if(result.Success) {
          this.ListaObaveza = result.Data;
          this.odrediTipDogadjaja();
          //}
          // else
          //     this.$message({message: "Došlo je do greske prilikom učitavanja zahteva!"})
        })
        .catch(error => {
          console.log(error);
        });
    },
   deleteTask(taskId){
     apiFetch('DELETE', destinationUrl + "/task/delete/" + taskId)
            // fetch(destinationUrl + '/Task/DeleteTask?id=' + taskId, {method: "DELETE"})
            .then(result => {
                    if(result.Success) {
                        this.$message("Obaveza je uspešno obrisana!");
                    }
                }).catch(error => {console.log(error)});

                this.pribaviListuZahteva();
        }

  },
  beforeMount() {
    this.pribaviListuZahteva();
    var currentDate = new Date();

    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var monthShown;

    month += 1;
    if (month < 10) monthShown = "0" + month;
    var year = currentDate.getFullYear();
    this.date = year + "-" + monthShown + "-" + date;
  }
};
</script>

<style scoped>
.prikaz-obaveza {
  display: flex;
  justify-content: center;
  width: 1200px;
}
</style>
