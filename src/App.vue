<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>
          <strong class="title">Vue Chat App</strong>
        </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!user.loggedIn" href="/login" text>
        <span class="mr-2">Login</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn v-if="!user.loggedIn" href="/register" text>
        <span class="mr-2">Register</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn v-if="user.loggedIn" href="/setting" text>
        <span class="mr-2">Setting</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn v-if="user.loggedIn" @click="logout" text>
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from "firebase/auth";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.replace({ name: "Home" });
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped>
.theme--light.v-application {
  background: #000;
  color: rgba(0, 0, 0, 0.87);
}

.title {
  color: rgba(110, 231, 183, 1);
  font-weight: bold;
}
</style>
