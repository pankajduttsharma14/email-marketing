import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import {LoginService} from './api/auth';
Vue.config.productionTip = false
require('./assets/css/style.css');
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
  if(to.path!='/login')
  {
      var status=LoginService.CheckLogin();
      if(!status) router.push('/login');
  }
  else{
      status=LoginService.CheckLogin();
      if(status) router.push('/home');
  }
  
  
})
new Vue({
  router,
  render: h => h(App),
  props:{
    login:false,
  }

}).$mount('#app')
