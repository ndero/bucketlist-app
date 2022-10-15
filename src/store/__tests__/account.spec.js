import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { setActivePinia, createPinia } from "pinia";
import { accountStore } from "@/store";
import { bucketlists } from "@/components/__tests__/fixtures.js";

vi.mock("axios", () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
    },
  };
});
const postResponse = {
  data: {
    results: { token: "@324dl" },
  },
};
const getResponse = {
  data: {
    results: bucketlists,
  },
};

describe("Account store", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(postResponse);
    axios.post.mockResolvedValue(getResponse);
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("initial state", () => {
    const store = accountStore();
    expect(store.email).toEqual("");
    expect(store.signUp).toEqual(true);
  });

  it("toggles between register and login", () => {
    const store = accountStore();
    expect(store.signUp).toEqual(true);
    store.toggleSignUp();
    expect(store.signUp).toEqual(false);
  });

  it("logs the user in", async () => {
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const store = accountStore();
    await store.loginUser();
    expect(storageSpy).toHaveBeenCalledOnce();
  });

  it("register user", async () => {
    const store = accountStore();
    await store.registerUser();
    // TODO: how to check router;
  });

  it("password checks", async () => {
    const store = accountStore();
    store.password = "teo89";
    expect(store.invalidPassword).toEqual(true);
    store.password = "testpass123";
    expect(store.invalidPassword).toEqual(false);
    store.confirmPassword = "123testpass";
    expect(store.invalidConfirmPassword).toEqual(true);
  });
});
