import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Search from '../components/Search'
import Productdetail from '../components/Productdetail'
import Register from '../components/Register'
import Login from '../components/Login'
import Header from '../components/Header'
import Cart from '../components/Cart'
import Order from '../components/Order'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/search/:term',
      name: 'Search',
      component: Search
     },
    {
      path: '/product-detail/:id',
      name: 'Productdetail',
      component: Productdetail
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/get-cart-items',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/placeorder',
      name: 'Order',
      component: Order
    }

  ]
})



