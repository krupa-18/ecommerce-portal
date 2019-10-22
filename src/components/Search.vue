<template>
<div>
       <input v-model="search" placeholder="search products by name">      
          <!-- <router-link :to="{name: 'Search'}"> -->
             <button type="button" class= "button" v-on:click="searchsubmit(search)" >Search</button>
          <!-- </router-link>  -->
        
         <ul v-bind:key="item.id" v-for="item in list">
            <img v-if="item.image" :src="'../assests/' + item.image" >
             {{ item.name }}
             {{ item.price }}
        </ul>    
  
</div>
</template>

<script>
import axios from 'axios';
 import router from '../router';
  export default {
     name: 'Search',
    data() {
        return {
            welcome: 'This is your profile',
            term: '',
            search: '',
            list: []
        }
    },
    
    created() {
      this.search = this.term = this.$route.params.term;
    },
    methods: 
    {  
      searchsubmit(search) {
      axios.get('http://localhost:4000/search/' + search)
      .then((response) => {
        console.log(response.data);
        this.list = response.data;
        
      })
      .catch((error) =>{
        console.log(error);
      });
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>