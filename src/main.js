import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { messages } from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

//CSS
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/style.css";

//JS
import "bootstrap/dist/js/bootstrap";
import * as jquery from "jquery";

Vue.config.productionTip = false;
Vue.prototype.jquery = jquery;

// Add a rule.
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  });
});

extend("number", {
  validate: value => {
    // return /^[0-9]$/.test(value);
    return !isNaN(value);
  },
  message: "{_field_} in correct format."
});

// Register it globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
