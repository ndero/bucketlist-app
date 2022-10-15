import { defineStore } from "pinia";
import router from "@/router";

import {
  createUser,
  authenticateUser,
  fetchBucketlists,
  createBucketlist,
  deleteItem,
} from "@/api";

export const accountStore = defineStore("account", {
  state: () => {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      signUp: true,
      errors: "",
    };
  },
  getters: {
    invalidPassword: (state) => state.password.length < 7,
    invalidConfirmPassword: (state) => state.password !== state.confirmPassword,
  },
  actions: {
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    async loginUser() {
      try {
        const data = { username: this.email, password: this.password };
        const response = await authenticateUser(data);
        await window.localStorage.setItem("token", response.data.token);
        const store = bucketlistStore();
        await store.getBucketlists();
        router.replace({ name: "BucketlistItems" });
      } catch (error) {
        this.errors = error;
      }
    },
    async registerUser() {
      const data = { email: this.email, password: this.password };
      await createUser(data);
      this.loginUser();
    },
  },
});

export const bucketlistStore = defineStore("bucketlist", {
  state: () => {
    return {
      bucketlists: [],
      newBucketlist: "",
      user: "",
      count: 0,
      page: 1,
    };
  },
  actions: {
    async getBucketlists() {
      const response = await fetchBucketlists(this.page);
      this.bucketlists = response.data.results;
      this.count = response.data.count;
      this.user = response.data.results[0].user;
    },
    async addBucketlist() {
      const data = { name: this.newBucketlist, items: [] };
      const response = await createBucketlist(data);
      this.bucketlists.unshift(response.data);
      this.bucketlists = this.bucketlists.slice(0, 10);
      this.newBucketlist = "";
      this.count += 1;
    },
    async removeBucketlist(url) {
      await deleteItem(url);
      const index = this.bucketlists
        .map((bucketlist) => bucketlist.url)
        .indexOf(url);
      this.bucketlists.splice(index, 1);
      this.count -= 1;
    },
    async updateBucketlist(data) {
      const { url, name, done } = data;
      const bucketlist = this.bucketlists.find((b) => b.url === url);
      if (name) {
        bucketlist.name = name;
      } else {
        bucketlist.done = done;
      }
    },
    logout() {
      window.localStorage.removeItem("token");
      router.replace({ name: "Login" });
    },
  },
});
