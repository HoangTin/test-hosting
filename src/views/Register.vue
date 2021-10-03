<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>New Account</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    label="email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default {
  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          console.log("createUserWithEmailAndPassword");
          sendEmailVerification(auth.currentUser).then(() => {
            this.$router.replace({ name: "Login" });
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
};
</script>
