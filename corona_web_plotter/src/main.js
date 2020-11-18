import Vue from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';

import router from '@/components/router/router.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
