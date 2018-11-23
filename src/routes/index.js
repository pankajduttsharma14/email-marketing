import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home';
import Login from '../components/login';
// import Campaign from '../components/campaign';
Vue.use(Router)

const routes = [
  {
    path: '/', redirect:'/login'
  },
  {
    path: '/login', component: Login, meta: {
      title: "Login"
    }
  },
  {
    path: '/home', component: Home, meta: {
      title: 'Home'
    }
  },
  // {
  //   path: '/campaign', component: Campaign, meta: {
  //     title: 'Campaign'
  //   }
  // },



]
export default new Router({
  routes, // short for `routes: routes`,
  linkActiveClass: "active"
})
