<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">Cart Details</h1>
      </div>
      <table class="table col-md-12 mx-auto">
        <thead>
           <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete product</th>
          </tr>
        </thead>
        <tbody v-bind:key="item.id" v-for="item in cartdetails">
          <tr>
            <td><img v-if="item.product_logo" :src="require(`@/assets/${item.product_logo}`)"/></td>
            <td>{{item.product_title }}</td>
            <td>{{item.product_price}}</td>
            <td>
                <!-- <button type="button" class="incbutton" @click="item.no_of_items += 1">+</button> -->
                 <h5>selected qty : {{item.no_of_items }}</h5>
                 <input type="number" class="quantity"   :v-model="quantity" min="1">
                 <!-- <span v-if="item.no_of_items === 0"> {{ deletecart(item.id) }}</span> -->
                 
                <button type="button" class="incbutton"  @click="updatecart(item.id)">update</button>                
            </td>
            <td>
              <button type="button" class= "button" v-on:click.prevent="deletecart(item.id)">Delete</button>
            </td>           
          </tr>
        </tbody>    
        <tfoot>
          <tr>
            <th></th>
            <th colspan="2" >Total Amount: {{ total }}</th>
            <th></th>
          </tr>
          <tr>
            <td colspan="6" align="right"><button class="buybutton btn-success pull-right"  v-on:click="placeorder()">Proceed to Buy</button></td>
          </tr>
        </tfoot>  
      </table>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import Order from './Order.vue'

export default {
  name: 'Cart',
  data () {  
    return {
      cartdetails: {},
      quantity: {}
     }
  },
  
  computed: {
    total() {
      var amount = 0;
      for(var i in this.cartdetails) {
        amount += parseFloat(this.cartdetails[i].product_price);
      }
      //console.log("Total amount is :"+amount);
      return amount;
    },
    // items() {
    //   var item = 0;
    //   for(var i in this.cartdetails) {
    //     item += parseFloat(this.cartdetails[i].no_of_items);
    //   }
    //   return item;
    // }
  
  }, 
  methods: { 

    getCartDetails() { 
      var token = localStorage.getItem('usertoken');
      axios.get('http://localhost:4000/carts/getcartitemsbyuserid',
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
       // console.log(response.data);
        this.cartdetails = response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
    },
    deletecart(cartid) {
      var token = localStorage.getItem('usertoken');
      axios.delete('http://localhost:4000/carts/deletecart/' + cartid ,
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // console.log(response.data);
        this.getCartDetails();
      })
      .catch((error) =>{
        console.log(error);
      }); 
    },
    updatecart(cartid) {

      if(this.quantity === ''){
        alert("please enter the quantity");
      } else {
        console.log(cartid+" "+this.quantity);
        var token = localStorage.getItem('usertoken');
        axios.put('http://localhost:4000/carts/updatecart/'+ cartid,
        {
            "no_of_items" : this.quantity
        },
        { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          // console.log(response.data);
          this.getCartDetails();
        })
        .catch((error) =>{
          console.log(error);
        }); 
      }
    },
    placeorder() {
      router.push({ name: 'Order'});
    }
  },
  mounted:  function () { 
    this.getCartDetails();
  },
  //   mounted(){
  //      quantity  = this.item.no_of_items
  // }
}
</script>
<style scoped>
.button {
  background-color: rgb(143, 35, 35);
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.incbutton {
  background-color: green;
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.buybutton {
  background-color: rgb(13, 15, 15);
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
img {
  max-width: 300px;
  height: 50px;
}
.quantity {
  width: 50px;
  text-align: center;
  border: 1px solid rgb(126, 25, 209);

}
</style>