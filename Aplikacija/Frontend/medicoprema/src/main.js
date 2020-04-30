import Vue from "vue";
//import App from "./App.vue";
import router from './routes/route'
import ElementUI from "element-ui";
import FormLogin from './components/Narudzbina';
import "element-ui/lib/theme-chalk/index.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
Vue.use(BootstrapVue);

export const vue = new Vue({
        router,
        render:
                h => h(FormLogin)
});

vue.$mount("#app");
