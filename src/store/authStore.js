import { defineStore } from "pinia";
import router from "@/router";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { bucketlistStore } from "@/store/bucketliststore";

export const authStore = defineStore("account", {
  state: () => {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      signUp: false,
      errors: "",
      user: {},
    };
  },
  getters: {
    invalidPassword: (state) => state.password.length < 7,
    invalidConfirmPassword: (state) => state.password !== state.confirmPassword,
    loggedIn: (state) => state.user.uid !== undefined,
  },
  actions: {
    init() {
      const auth = getAuth();
      const store = bucketlistStore();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email } = user;
          this.user = { uid, email };
          store.init();
        } else {
          this.user = {};
        }
      });
    },
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    async loginUser() {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password);
        router.replace({ name: "BucketlistItems" });
      } catch (error) {
        this.errors = error;
      }
    },
    async registerUser() {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        router.replace({ name: "BucketlistItems" });
      } catch (error) {
        this.errors = error.message;
      }
    },
  },
});
