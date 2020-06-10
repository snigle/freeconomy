/// <reference types="cordova-plugin-device" />
import "bootstrap";
import "./index.scss";
import "./img/faviconpng.png";

import Vue from "vue";
import App from "./appVue/app.vue";

var app = {
    // Application Constructor
    initialize: function() {
        new Vue({
            template: '<App/>',
            components: { App },
          }).$mount("#app");
    }

};

app.initialize();