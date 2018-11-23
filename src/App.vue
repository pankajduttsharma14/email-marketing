<template>
  <div id="app">
    <div id="main-wrapper">
      <!-- Loader -->
    <div class="preloader" style="display: none;">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle> </svg>
    </div>
     <Header v-if="['/login'].indexOf($route.path)==-1 "/>
     <router-view></router-view>
     <!-- <Footer/> -->
    </div>
  </div>
</template>
<script>
import Header from "./components/shared/header";


export default {
  name: "app",
  el: "#app",
  components: {
    Header,
    
    
    
    
  },

  methods: {}
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
