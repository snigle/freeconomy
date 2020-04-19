/// <reference types="cordova-plugin-device" />
import "bootstrap";
import "./index.scss";
import "./img/faviconpng.png";

import Vue from "vue";
import App from "./appVue/app.vue";
import Navbar from "./components/navbar.vue";
import { any } from "prop-types";
import store from "./appVue/store";


var app = {
    // Application Constructor
    initialize: function() {
        new Vue({
            template: '<App/>',
            components: { App,  Navbar},
          }).$mount("#app");
    }

};

app.initialize();