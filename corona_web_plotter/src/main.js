import Vue from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import i18n from '@/components/locales/i18n.js';
import router from '@/components/router/router.js';
import store from '@/components/store/store.js'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueCookies);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
