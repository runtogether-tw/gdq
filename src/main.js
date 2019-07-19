import Vue from 'vue';
import './plugins/vuetify';
import { Plugin } from 'vue-fragment';
import './mixins/time';
import App from './App.vue';
import './js/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Plugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
