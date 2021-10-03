<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Update Profile</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="username"
                    label="username"
                    type="text"
                    v-model="displayName"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="cancel">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="updateProfile">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { getAuth, updateProfile } from "firebase/auth";
export default {
  data() {
    return {
      displayName: "",
      userPhotoURL: "",
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    updateProfile() {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: this.displayName,
      })
        .then((userCredential) => {
          console.log("userCredential", userCredential);
          this.$router.replace({ name: "Chat" });
        })
        .catch((error) => {
          console.log("error", error);
          this.message = error.message;
        });
    },
    cancel() {
      this.$router.replace({ name: "Chat" });
    },
  },
};
</script>
