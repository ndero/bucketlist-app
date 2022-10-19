import { defineStore } from "pinia";
import router from "@/router";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db, postItem, patchItem, deleteItem } from "@/firebase";
import { authStore } from "@/store/authStore.js";

let bucketlistsRef;

export const bucketlistStore = defineStore("bucketlist", {
  state: () => {
    return {
      bucketlists: [],
      newBucketlist: "",
      email: "",
      userId: "",
    };
  },
  getters: {
    count: (state) => state.bucketlists.length,
  },
  actions: {
    init() {
      const store = authStore();
      const { email, uid } = store.user;
      this.email = email;
      this.userId = uid;
      bucketlistsRef = collection(db, "Users", uid, "Bucketlists");
      this.getBucketlists();
    },
    async getBucketlists() {
      onSnapshot(bucketlistsRef, (querySnapshot) => {
        let response = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const { id } = doc;
          response.push({ id, ...data });
        });
        this.bucketlists = response;
      });
    },
    async addBucketlist() {
      const data = { name: this.newBucketlist };
      await postItem(bucketlistsRef, data);
      this.newBucketlist = "";
    },
    async updateBucketlist(bucketlistId, data) {
      const bucketlistRef = doc(bucketlistsRef, bucketlistId);
      await patchItem(bucketlistRef, data);
    },
    async removeBucketlist(bucketlistId) {
      const bucketlistRef = doc(bucketlistsRef, bucketlistId);
      await deleteItem(bucketlistRef);
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.bucketlists = [];
          this.email = "";
          router.replace({ name: "Login" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
