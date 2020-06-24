<template>
  <div class="prikaz-obaveza">
    <el-table
      v-if="this.ListaObaveza.length > 0"
      :data="this.ListaObaveza"
      :default-sort="{prop: 'Date'}"
    >
      <!-- <el-table-column prop="CustomerFirstName" label="Ime" width="100px" class="table-column"></el-table-column> -->
      <!-- <el-table-column prop="CustomerLastName" label="Prezime" width="100px" class="table-column"></el-table-column> -->
      <el-table-column
        prop="numberKorisnika"
        label="Broj telefona"
        width="100px"
        class="table-column"
      ></el-table-column>
      <el-table-column prop="date" label="Datum" width="100px" class="table-column" sortable></el-table-column>
      <!-- <el-table-column prop="Time" label="Vreme" width="80px" class="table-column"></el-table-column> -->
      <el-table-column prop="location" label="Lokacija" width="100px" class="table-column"></el-table-column>
      <el-table-column prop="type" label="Tip" width="100px" class="table-column"></el-table-column>
      <el-table-column prop="comment" label="Dodatne informacije" class="table-column"></el-table-column>
      <el-table-column align="right" width="50px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="medium"
            v-if="datum(scope.row)"
            @click="deleteTask((scope.row.Id))"
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
const types = ["Obuka", "Servis aparata", "Preventivni godišnji pregled"];

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
      // fetch(destinationUrl + "/task/getTasks/" + userid, { method: "GET" })
      apiFetch('GET', destinationUrl + "/task/getTasks/" + getUserInfo().userID)
        //.then(response => (response.ok ? response.json() : new Error()))
        .then(result => {
          // if(result.Success) {

          console.log(result.Data);
          this.ListaObaveza = result.Data.tasks;
          this.odrediTipDogadjaja();
          //}
          // else
          //     this.$message({message: "Došlo je do greske prilikom učitavanja zahteva!"})
        })
        .catch(error => {
          console.log(error);
        });
    },
    odrediTipDogadjaja() {
      this.ListaObaveza.forEach(el => {
        el.type = types[el.type];
      });
    },
    deleteTask(Id) {
      fetch(destinationUrl + "Task/DeleteTask?id=" + Id, { method: "POST" })
        .then(result => {
          if (result.Success) {
            this.$message("Obaveza je uspešno obrisana!");
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.pribaviListuZahteva();
    },
    datum(row) {
      return row.date < this.date;
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
}
</style>
