import Vue from 'vue';

Vue.filter('time', (val) => val.toString().padStart(2, 0));
Vue.filter('timeformat', (val) => `${val.getHours().toString().padStart(2, 0)}:${val.getMinutes().toString().padStart(2, 0)}`);
Vue.filter('dateformat', (val) => `${(val.getMonth() + 1).toString().padStart(2, 0)}/${val.getDate().toString().padStart(2, 0)}`);
