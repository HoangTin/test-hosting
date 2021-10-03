import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZJA4Y_MIOtEQDPFqUBo9WzLzXQWOF1mA",
  authDomain: "test-hosting-39ec6.firebaseapp.com",
  databaseURL:
    "https://test-hosting-39ec6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-hosting-39ec6",
  storageBucket: "test-hosting-39ec6.appspot.com",
  messagingSenderId: "593596264770",
  appId: "1:593596264770:web:8c4cde96665b09c90a98db",
  measurementId: "G-ZWVH0C1GNQ",
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
      console.log("login : ", user);
      store.dispatch("fetchUser", user);
    });
  },
}).$mount("#app");
