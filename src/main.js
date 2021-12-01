import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo79QXA1wj7mkAm8cH8lNcQxefsBDrjYo",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourprojectId",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "942900002197",
  appId: "1:942900002197:web:a8c3f11c4b081bf74a0a9c",
  measurementId: "G-TPYTZG44L5",
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
  },
}).$mount("#app");
