import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "@/router";

import {
  createUser,
  authenticateUser,
  fetchBucketlists,
  createBucketlist,
  deleteItem,
} from "@/api";

export const accountStore = defineStore("account", () => {
  // state
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const signUp = ref(true);
  const errors = ref("");
  // getters
  const invalidPassword = computed(() => password.value.length < 7);
  const invalidConfirmPassword = computed(
    () => password.value !== confirmPassword.value
  );
  // actions
  const toggleSignUp = () => {
    signUp.value = !signUp.value;
  };
  const loginUser = async () => {
    try {
      const data = { username: email.value, password: password.value };
      const response = await authenticateUser(data);
      await window.localStorage.setItem("token", response.data.token);
      const store = bucketlistStore();
      await store.getBucketlists();
      router.replace({ name: "BucketlistItems" });
    } catch (error) {
      errors.value = error;
    }
  };
  const registerUser = async () => {
    const data = { email: email.value, password: password.value };
    await createUser(data);
    loginUser();
  };

  return {
    email,
    password,
    confirmPassword,
    signUp,
    errors,
    invalidPassword,
    invalidConfirmPassword,
    toggleSignUp,
    loginUser,
    registerUser,
  };
});

export const bucketlistStore = defineStore("bucketlist", () => {
  const bucketlists = ref([]);
  const newBucketlist = ref("");
  const user = ref("");
  const count = ref(0);
  const page = ref(1);

  const getBucketlists = async () => {
    const response = await fetchBucketlists(page.value);
    bucketlists.value = response.data.results;
    count.value = response.data.count;
    user.value = response.data.results[0].user;
  };
  const addBucketlist = async () => {
    const data = { name: newBucketlist.value, items: [] };
    const response = await createBucketlist(data);
    bucketlists.value.unshift(response.data);
    bucketlists.value = bucketlists.value.slice(0, 10);
    newBucketlist.value = "";
    count.value += 1;
  };
  const removeBucketlist = async (url) => {
    await deleteItem(url);
    const index = bucketlists.value
      .map((bucketlist) => bucketlist.url)
      .indexOf(url);
    bucketlists.value.splice(index, 1);
    count.value -= 1;
  };
  const updateBucketlist = async (data) => {
    const { url, name, done } = data;
    const bucketlist = bucketlists.value.find((b) => b.url === url);
    if (name) {
      bucketlist.name = name;
    } else {
      bucketlist.done = done;
    }
  };
  const logout = () => {
    window.localStorage.removeItem("token");
    router.replace({ name: "Login" });
  };

  return {
    bucketlists,
    newBucketlist,
    user,
    count,
    page,
    getBucketlists,
    addBucketlist,
    removeBucketlist,
    updateBucketlist,
    logout,
  };
});
