import Vue from 'vue';
import frag from 'vue-frag';
import vuetify from './plugins/vuetify';
import './mixins/time';
import App from './App.vue';
import './js/registerServiceWorker';

Vue.config.productionTip = false;

Vue.directive('frag', frag);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
