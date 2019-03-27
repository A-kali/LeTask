import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(ElementUI);

import VueResource from 'vue-resource'
Vue.use(VueResource);

new Vue({
    el: '#app',
    render: h => h(App)
});


