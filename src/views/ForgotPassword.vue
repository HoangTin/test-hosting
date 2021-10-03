<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Reset Password</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    label="email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="resetPassword">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    resetPassword() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          alert("Check your email to change password");
        })
        .catch((error) => {
          this.message = error.message;
        });
    },
  },
};
</script>
