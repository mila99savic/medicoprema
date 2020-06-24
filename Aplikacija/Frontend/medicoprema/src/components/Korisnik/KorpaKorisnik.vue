<template>
    <div class="korpa-container">
        <div class="korpa-tabela">
            <div class="cena">
                <h4>Ukupna cena: {{izracunajCenu()}} RSD</h4>
            </div>
            <el-table :data="items" max-height="1000" style="border-radius: 3px;">
                <el-table-column prop="productTitle" label="Naziv" sortable min-width="100" class="table-column"></el-table-column>
                <el-table-column prop="quantity" label="Količina"  min-width="100" class="table-column"></el-table-column>
                <el-table-column prop="productPrice" label="Cena" min-width="100" class="table-column"></el-table-column>
                <el-table-column align="center" prop="Image" min-width="100">
                    <template slot-scope="cartItem">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="deleteCartItem(cartItem.row)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button round :disabled="items.length == 0 ? true : false" style="margin-top: 10px; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);" @click="Naruci()" type="primary">Naruči</el-button>
        </div>
    </div>
</template>

<script>
import FooterBar from "../appBar/FooterBar.vue"
import { getUserInfo } from '../../services/contextManagement';
import { destinationUrl, apiFetch } from '../../services/authFetch';
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {FooterBar},
    data(){
        return{
            items:[],
            productId: "",
        }
    },
    methods:{
            Naruci(){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()).padStart(2,'0');
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;

                const formData = new FormData();
                formData.append('DeliveryAddress', '');
                formData.append('userId', getUserInfo().userID);
                formData.append('Date', today);
                formData.append('productPrice', this.izracunajCenu());
                this.items.forEach((item, index)=> {
                    formData.append("items[" + index + "].productId",item.productId);
                    formData.append("items[" + index + "].quantity", item.quantity);
                    formData.append("items[" + index + "].title", item.productTitle);
                    formData.append("items[" + index + "].productPrice", item.productPrice);
                });
                fetch(destinationUrl + "/shop/create-order", {
                    method: 'POST', body: formData
                }).then(response => response.ok ? response.json() : new Error())
                .then(result=>{
                    if(result.Success)
                    {
                        this.$message({message: "Uspešno odrađena narudžbina", type: "success"});
                        this.items = [];
                    }
                    else
                        this.$message({message: "Neuspešno odrađena narudžbina", type: "error"});
                }).catch(error => console.log(error));
            },
            izracunajCenu(){
                let result = 0;
                this.items.forEach(el =>{
                    result += el.productPrice * el.quantity;
                });
                return result.toFixed(2); 
            },
            deleteCartItem(cartItem) {
                this.items = this.items.filter(item => item.productId != cartItem.productId);
                const formData = new FormData();
                console.log(getUserInfo().userID);
                console.log(cartItem.productId);
                formData.append("productId", this.productId);
                formData.append("userId", getUserInfo().userID);

                var body = {
                        productId: cartItem.productId,
                        userId: getUserInfo().userID
                    }
                apiFetch('DELETE', destinationUrl + "/shop/cart-delete-item", body);
              //  fetch(destinationUrl + "/shop/cart-delete-item", {responseType: 'text'}, {method: "DELETE", formData});           
            
        }
    },
    mounted: function() {
        fetch(destinationUrl + "/shop/cart/" + getUserInfo().userID, {method: 'GET'})
            .then(response => response.ok ? response.json() : new Error())
            .then(result => {
                if(result.Success) {
                    this.items = result.Data.items;
                    this.productId = result.Data.Id;
                }
                // this.preloadImages();
            }).catch(error => console.log(error));
        console.log(this.items);
    }
}
</script>

<style scoped>
    .korpa-container{
            display: flex;
            height: 90%;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: auto;
            background-color: rgba(224, 224, 235, 0.445);  
    }
    .korpa-tabela{
        display: flex;
        padding: 5px;
        height: 80%;
        width: 60%;
        flex-direction: column;
        align-items: center;
    }

    .footer-bar{
        justify-content: flex-end;
    }
    .cena {
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: flex-end;
    }
</style>