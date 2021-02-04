import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import PunchCard from '../components/PunchCard'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path:'/login',
      name:'login',
      component: Login
    },{
      path:'/punchCard',
      name:'punchCard',
      component: PunchCard
    },{
      path:'/home',
      name:'home',
      component: Home
    }
  ]
})
