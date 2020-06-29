<template>
  <div class="forma-novo-obavestenje-container">
    <el-popover>
      <img
        :src="Logo"
        style="height:50px; width: 150px; margin: 0 auto; display:flex; justify-self: center;"
        slot="reference"
      />
    </el-popover>
    <div>
      <h5>Dodaj utisak o korisniku</h5>
    </div>
    <div>
      <label>Korisnik:</label>
      <el-input class="input" v-model="komentar.nameKorisnika"></el-input>
    </div>
    <label class="form-line">Tekst:</label>
    <el-input class="input" v-model="komentar.content" :rows="10"></el-input>
    <div class="form-line">
      <el-button
        @click="addComment()"
        type="success"
        round
        style="border-color:rgba(24, 102, 89, 0.925); background-color:rgba(24, 102, 89, 0.925);"
      >Sačuvaj</el-button>
      <el-button
        @click="ponisti"
        type="danger"
        round
        style="color:rgba(24, 102, 89, 0.925); background-color: white; border-color:white"
      >Poništi</el-button>
    </div>
  </div>
</template>
<script>
import { Form, Input, Button } from "element-ui";
import logofirme2 from "../../assets/logofirme2.png";
import { destinationUrl, apiFetch } from "../../services/authFetch";
import { getUserInfo } from "../../services/contextManagement";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Form, Input, Button },
  data() {
    return {
      Logo: logofirme2,
      obavestenjeText: "",
      naslov: "",
      komentar: {
        content: "",
        zaposlenid: "",
        nameKorisnika: ""
      }
    };
  },
  methods: {
     addComment() {
      // if(!this.validacija())
      //     return;
      this.komentar.zaposlenid = getUserInfo().userID;
      console.log(this.komentar);
       apiFetch("POST", destinationUrl + "/impression/add", this.komentar)
        .then(response => {
          if (response.Success) {
            this.$message("Dodali ste utisak!");
          } else {
            this.$message("doslo je do greske!");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
.forma-novo-obavestenje-container {
  width: 100%;
  height: 100%;
}
.form-line {
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
</style>

            