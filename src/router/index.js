import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import PunchCard from '../components/PunchCard'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path:'/',
      name:'login',
      component: Login
    },{
      path:'/punchCard',
      name:'punchCard',
      component: PunchCard
    }
  ]
})
