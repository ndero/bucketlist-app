import { defineStore } from "pinia";
import router from "@/router";

import {
  fetchBucketlists,
  createBucketlist,
  deleteItem,
  createUser,
  authenticateUser,
  getItem,
  patchItem,
  postItem,
} from "@/api";

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
      return response;
    },
    async addBucketlist() {
      const data = { name: this.newBucketlist, items: [] };
      const response = await createBucketlist(data);
      this.bucketlists.unshift(response.data);
      this.bucketlists = this.bucketlists.slice(0, 10);
      this.newBucketlist = "";
      this.count += 1;
      return response;
    },
    async removeBucketlist(url) {
      await deleteItem(url);
      const index = this.bucketlists
        .map((bucketlist) => bucketlist.url)
        .indexOf(url);
      this.bucketlists.splice(index, 1);
      this.count -= 1;
    },
    async logout() {
      window.localStorage.removeItem("token");
      router.replace({ name: "Login" });
    },
  },
});

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
  actions: {
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    invalidPassword() {
      return this.password.length < 7;
    },
    invalidConfirmPassword() {
      return this.password !== this.confirmPassword;
    },
    async loginUser() {
      let response;
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
      return response;
    },
    async registerUser() {
      const data = { email: this.email, password: this.password };
      await createUser(data);
      this.loginUser();
    },
  },
});

export const itemStore = defineStore("item", {
  state: () => {
    return {
      allowEdit: false,
      showItems: false,
      newName: this.bucketlist.name,
      items: [],
      newItem: "",
    };
  },
  getters: {
    // bucketlistName: (state) =>
  },
  actions: {
    toggleEdit() {
      this.allowEdit = !this.allowEdit;
    },
    toggleShowItems() {
      this.showItems = !this.showItems;
    },
    async editBucketlist() {
      const data = { name: this.newName };
      await patchItem(this.bucketlist.url, data);
      // this.bucketlist.name = this.newName; // mutating prop
      this.toggleEdit();
    },
    async toggleBucketlistDone() {
      const data = { done: !this.bucketlist.done };
      await patchItem(this.bucketlist.url, data);
      // this.bucketlist.done = !this.bucketlist.done; // mutating prop
    },
    async getItems() {
      const response = await getItem(this.bucketlist.items_url);
      this.items = response.data.results;
      return response;
    },
    async addItem() {
      const data = { name: this.newItem };
      const response = await postItem(this.bucketlist.items_url, data);
      this.items.unshift(response.data);
      this.newItem = "";
      return response;
    },
    async deleteItem(url) {
      await deleteItem(url);
      const index = this.items.map((item) => item.url).indexOf(url);
      this.items.splice(index, 1);
    },
  },
});
