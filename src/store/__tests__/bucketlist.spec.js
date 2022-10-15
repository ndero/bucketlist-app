import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import axios from "axios";
import { setActivePinia, createPinia } from "pinia";
import { bucketlistStore } from "@/store";
import { bucketlists } from "@/components/__tests__/fixtures.js";

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    },
  };
});
const getResponse = {
  data: {
    results: bucketlists,
  },
};
const postResponse = {
  data: {
    results: bucketlists[0],
  },
};

describe("BucketlistItems store tests", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(getResponse);
    axios.post.mockResolvedValue(postResponse);
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("initial state", () => {
    const store = bucketlistStore();
    expect(store.bucketlists).toHaveLength(0);
    expect(store.page).toEqual(1);
  });

  it("gets bucketlists", async () => {
    const store = bucketlistStore();
    expect(store.bucketlists).toHaveLength(0);
    await store.getBucketlists();
    expect(store.bucketlists).toHaveLength(4);
  });

  it("adds a new bucketlist", async () => {
    const store = bucketlistStore();
    store.newBucketlist = "New Bucketlist";
    await store.addBucketlist();
    expect(store.bucketlists).toHaveLength(1);
  });

  it("remove bucketlist", async () => {
    const url = "http://127.0.0.1:8000/bucketlists/17/";
    const store = bucketlistStore();
    store.bucketlists = bucketlists;
    expect(store.bucketlists).toHaveLength(4);
    await store.removeBucketlist(url);
    expect(store.bucketlists).toHaveLength(3);
  });

  it("update bucketlist", () => {
    const store = bucketlistStore();
    store.bucketlists = bucketlists;
    const url = "http://127.0.0.1:8000/bucketlists/18/";
    // update name
    const updateData = { url, name: "Learn soft skills" };
    const bucketlistToUpdate = store.bucketlists.find((b) => b.url === url);
    expect(bucketlistToUpdate.name).toEqual("Learn programming concepts");
    store.updateBucketlist(updateData);
    expect(bucketlistToUpdate.name).toEqual("Learn soft skills");
    // update done status
    expect(bucketlistToUpdate.done).toEqual(false);
    const updateDone = { url, done: true };
    store.updateBucketlist(updateDone);
    expect(bucketlistToUpdate.done).toEqual(true);
  });

  it("logs the user out", async () => {
    const store = bucketlistStore();
    const storageSpy = vi.spyOn(Storage.prototype, "removeItem");
    store.logout();
    expect(storageSpy).toHaveBeenCalledTimes(1);
  });
});
