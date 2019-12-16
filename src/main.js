import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import vuetify from './plugins/vuetify';
import './mixins/time';
import App from './App.vue';
import './js/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Plugin);

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
