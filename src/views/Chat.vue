<template>
  <div>
    <div class="container-sm mt-20">
      <div class="mx-5">
        <Messages
          v-for="{
            messageId,
            text,
            userPhotoURL,
            userName,
            userId,
          } in messages"
          :key="messageId"
          :name="userName"
          :photo-url="userPhotoURL"
          :sender="userId === currentUser.data.userId"
        >
          {{ text }}
        </Messages>
      </div>
    </div>
    <div ref="scrollView" class="mt-20" />
    <div class="bottom">
      <div class="container-sm">
        <form v-if="currentUser.loggedIn" @submit.prevent="sendMessage">
          <input v-model="inputMessage" placeholder="Message" required />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SendIcon from "../components/SendIcon.vue";
import Messages from "../components/Messages.vue";
import {
  collection,
  getFirestore,
  orderBy,
  addDoc,
  query,
  limit,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export default {
  components: {
    Messages,
    SendIcon,
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      messages: [],

      inputMessage: "",
    };
  },
  mounted() {
    const db = getFirestore();
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      snapshot
        .docChanges()
        .reverse()
        .forEach((change) => {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            this.messages.push({
              messageId: change.doc.id,
              text: change.doc.data().text,
              userPhotoURL: "https://i.pinimg.com/474x/14/a6/32/14a632d773d56ebda196f5f65b437275--funny-emoticons-smileys.jpg",
              userName: change.doc.data().userName,
              userId: change.doc.data().userId,
            });
            this.$refs.scrollView.scrollIntoView({ behavior: "smooth" });
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
    });
  },
  methods: {
    async sendMessage() {
      if (!this.currentUser.loggedIn) {
        return;
      }
      const _user = this.currentUser.data;
      if (_user !== null) {
        const db = getFirestore();
        var userPhoto =
          _user.userPhotoURL == undefined ? "" : _user.userPhotoURL;
        const docRef = await addDoc(collection(db, "messages"), {
          userName: _user.displayName,
          userId: _user.userId,
          userPhotoURL: userPhoto,
          text: this.inputMessage,
          createdAt: serverTimestamp(),
        });
        this.inputMessage = "";
        console.log("Document written with ID: ", docRef.id);
      }
    },
  },
};
</script>

<style scoped>
.container-sm {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
.mt-20 {
  margin-top: 10rem;
}
.container-sm {
  max-width: 36rem;
}

.mx-5 {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}

.message {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
}
.flex {
  display: flex;
}
.avatar {
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
}

.mt-1 {
  margin-top: 0.25rem;
}
img,
video {
  max-width: 100%;
  height: auto;
}

img {
  display: block;
  vertical-align: middle;
}
img {
  border-style: solid;
}

.message .text {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}

.bg-gray-700 {
  --tw-bg-opacity: 1;
  background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
}
.w-3\/4 {
  width: 75%;
}

.bottom {
  position: fixed;
  bottom: 0px;
  --tw-bg-opacity: 1;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  width: 100%;
}
.bottom form {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.bottom form input {
  flex-grow: 1;
  margin: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 0.25rem;
  border-radius: 0.25rem;
  border-style: none;
  --tw-bg-opacity: 1;
  background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
</style>
