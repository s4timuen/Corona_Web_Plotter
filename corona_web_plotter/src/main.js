import Vue from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import i18n from '@/locales/i18n.js';

import router from '@/components/router/router.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueCookies);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
