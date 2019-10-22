<template>
  <div class="HelloWorld">
    <div align='center'>
      <div id="search">
        <input v-model="search" placeholder="search products by name">      
          <router-link  :to="{ name: 'Search', params: { term: search }}">
             <button type="button" class= "button"  v-on:click="searchsubmit(search)" >Search</button>
          </router-link>          
      </div>
      <ul v-bind:key="item.id" v-for="item in list">
        <img v-if="item.image" :src=" require(`@/assets/${item.image}`) "/>
          {{ item.name }}
          {{ item.price }}
    </ul>    
      </div>
  </div>
</template>
  

<script>

  import Search from './Search';
  import axios from 'axios';
  export default {
    name: 'HelloWorld',
    
    data () {
      return {
        list: {},
        search: ''
      }
    },
    components: {
      Search
    },
     created() {
            this.search = this.$route.params.search;
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
    },
    mounted()
    {
      axios.get('http://localhost:4000/mostpopular')
      .then((response) => {
        console.log(response.data);
        this.list = response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

img {
  max-width: 300px;
  height: auto;
}

.button {
  background-color: #4CAF50;
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
</style>
