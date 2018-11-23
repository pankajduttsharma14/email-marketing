<template>
    <div class="login_page">

    <section id="wrapper">
        <div class="login-register"  v-bind:style="{ 'background-image': 'url(' + bg + ')' }">

            <div class="login-box card">
                <div class="card-body">
                    <form class="form-horizontal form-material" id="loginform" action="index.html" novalidate @submit.prevent="LoginAuth" :validator="$v.form">
                        <h3 class="box-title m-b-20">Sign In</h3>
                        <div class="alert alert-danger" v-if="loginError">Invalid login id or password</div>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" type="text" placeholder="Username" v-model.trim="name" @click="$v.name.$touch()">
                                 <p class="error-message" v-if="!$v.name.required && $v.name.$dirty">Please Enter Userid</p>
                            </div>

                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control" type="password" placeholder="Password"  v-model.trim="password" @click="$v.password.$touch()"> </div>
                                <p class="error-message" v-if="!$v.password.required && $v.password.$dirty">Please Enter Password</p>

                        </div>
                      
                        <div class="form-group text-center m-t-20">
                            <div class="col-xs-12">
                                <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit" :disabled="$v.$invalid">Log In</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
var image = require("@/assets/images/background/login.jpg");
import Vue from 'vue';
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import {LoginService} from '../api/auth';
import {EncryptionModule} from '../api/excryptionservice';
import router from '../routes';
import $ from 'jquery';
Vue.use(Vuelidate)
export default {
  name: "Login",
  data() {
    return {
    bg: image,
    name:'',
    password:'',
    loginError:false
    };
  },
  methods:{
     LoginAuth()
     {   $('.preloader').css('display','block');
         var data={user_email:this.name, password:this.password, 'role_id': 1}
         this.name='';
         this.password='';
         this.$v.$reset();
         LoginService.LoginAuth(data).then(response=>{

             $('.preloader').css('display','none');
            if(response.status==200)
            {   var records= response.data.data;
                localStorage.setItem('user_id', records.user_id);
                localStorage.setItem('loginStatus', EncryptionModule.EncryptionService('LoggedIn1'));
                router.push('/home');
            }
            else{
                this.loginError=true;
                setTimeout(()=>{
                    this.loginError=false;
                },3000);
            }
         }).catch(e=>{
             $('.preloader').css('display','none');
             throw e;
         })
     }
  },
  validations:{
      name:{
          required,
      },
      password:{
          required
      }
  }
};
</script>

<style scoped>
    .error-message
    {
        font-size: 12px;
        color: red;
    }
</style>
