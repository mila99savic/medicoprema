<template>
    <div class="korpa-container">
        <div class="korpa-tabela">
            <div class="cena">
                <h4>Ukupna cena: {{izracunajCenu()}} RSD</h4>
            </div>
            <el-table :data="cartItems" max-height="1000" style="border-radius: 3px;">
                <el-table-column prop="Title" label="Naziv" min-width="100" class="table-column"></el-table-column>
                <el-table-column prop="ProductType" label="Tip" min-width="100" class="table-column"></el-table-column>
                <el-table-column prop="Quantity" label="Količina" min-width="100" class="table-column"></el-table-column>
                <el-table-column prop="Price" label="Cena" min-width="100" class="table-column"></el-table-column>
                <el-table-column align="center" prop="Image" min-width="100">
                    <template slot-scope="cartItem">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="deleteCartItem(cartItem.row)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button :disabled="cartItems.length == 0 ? true : false" style="margin-top: 10px; background-color: rgba(24, 102, 89, 0.925); border-color:rgba(24, 102, 89, 0.925);" @click="Naruci()" type="primary">Naruči</el-button>
        </div>
    </div>
</template>

<script>
import FooterBar from "../appBar/FooterBar.vue"
import { getUserInfo } from '../../services/contextManagement';
import { destinationUrl } from '../../services/authFetch';
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {FooterBar},
    data(){
        return{
            cartItems:[],
            cartId: "",
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
            formData.append('UserId', getUserInfo().userID);
            formData.append('Date', today);
            formData.append('Price', this.izracunajCenu());
            this.cartItems.forEach((item, index)=> {
                formData.append("CartItems[" + index + "].ProductType",item.ProductType);
                formData.append("CartItems[" + index + "].Quantity", item.Quantity);
                formData.append("CartItems[" + index + "].Title", item.Title);
                formData.append("CartItems[" + index + "].Price", item.Price);
            });
            fetch(destinationUrl + "/Order/PerformOrder", {
                method: 'POST', body: formData
            }).then(response => response.ok ? response.json() : new Error())
            .then(result=>{
                if(result.Success)
                {
                    this.$message({message: "Uspešno odrađena narudžbina", type: "success"});
                     this.cartItems = [];
                }
                else
                    this.$message({message: "Neuspešno odrađena narudžbina", type: "error"});
            }).catch(error => console.log(error));
        },
        izracunajCenu(){
            let result = 0;
            this.cartItems.forEach(el =>{
                result += el.Price;
            });
            return result.toFixed(2); 
        },
        deleteCartItem(cartItem) {
            this.cartItems = this.cartItems.filter(item => item.Id != cartItem.Id);
            const formData = new FormData();
            formData.append("CartId", this.cartId);
            formData.append("CartItemId", cartItem.Id);
            fetch(destinationUrl + "/Cart/DeleteItem", {method: 'POST', body: formData});
        }
    },
    mounted() {
        fetch(destinationUrl + "/Cart/GetCartByUserId/?userId=" + getUserInfo().userID, {method: 'GET'})
            .then(response => response.ok ? response.json() : new Error())
            .then(result => {
                if(result.Success) {
                    this.cartItems = result.Data.CartItems;
                    this.cartId = result.Data.Id;
                }
                this.preloadImages();
            }).catch(error => console.log(error));
        console.log(this.cartItems);
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