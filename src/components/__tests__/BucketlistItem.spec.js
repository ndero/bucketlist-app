import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { shallowMount } from "@vue/test-utils";
import BucketlistItem from "@/components/BucketlistItem.vue";
import { bucketlists, items } from "@/components/__tests__/fixtures.js";

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
    },
  };
});
const propBucketlist = bucketlists[0];
const editedBucketlist = bucketlists[1];
const getResponse = {
  data: {
    results: items,
  },
};
const postResponse = {
  data: {
    results: { bucketlist: editedBucketlist },
  },
};
const deleteResponse = {
  data: {
    results: "",
  },
};

describe("Bucketlist Item tests", () => {
  let wrapper;

  beforeEach(() => {
    axios.get.mockResolvedValue(getResponse);
    axios.post.mockResolvedValue(postResponse);
    axios.patch.mockResolvedValue(postResponse);
    axios.delete.mockResolvedValue(deleteResponse);

    wrapper = shallowMount(BucketlistItem, {
      props: { bucketlist: propBucketlist },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("matches snapshot", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
  it("toggles edit and show items", () => {
    wrapper.vm.toggleEdit();
    expect(wrapper.vm.allowEdit).toBeTruthy();
    wrapper.vm.toggleEdit();
    expect(wrapper.vm.allowEdit).toBeFalsy();
    wrapper.vm.toggleShowItems();
    expect(wrapper.vm.showItems).toBeTruthy();
  });
  it("marks bucketlist as done", async () => {
    expect(wrapper.vm.bucketlist.done).toEqual(false);
    const { data } = await wrapper.vm.toggleBucketlistDone();
    expect(data.results.bucketlist.done).toEqual(true);
  });
  it("edits bucketlist", async () => {
    expect(wrapper.vm.bucketlist.name).toEqual("Buy Groceries");
    const { data } = await wrapper.vm.editBucketlist();
    expect(data.results.bucketlist.name).toEqual("Buy Fruits");
  });
  it("adds item to bucketlist", async () => {
    const { data } = await wrapper.vm.addItem();
    expect(data.results.bucketlist).toEqual(editedBucketlist);
  });
  it("gets items", async () => {
    const { data } = await wrapper.vm.getItems();
    expect(data.results).toEqual(items);
  });
  it("deletes item", async () => {
    const { data } = await wrapper.vm.removeItem();
    expect(data.results).toEqual("");
  });
  it("updates item", () => {
    wrapper.vm.items = items;
    const url = "http://127.0.0.1:8000/bucketlists/20/items/32/";
    const itemToUpdate = wrapper.vm.items.find((itm) => itm.url === url);
    expect(itemToUpdate.done).toEqual(true);
    const updateDone = { url, done: false };
    wrapper.vm.updateItem(updateDone);
    expect(itemToUpdate.done).toEqual(false);
    const updateName = { url, name: "Sukuma" };
    expect(itemToUpdate.name).toEqual("Sukumawiki");
    wrapper.vm.updateItem(updateName);
    expect(itemToUpdate.name).toEqual("Sukuma");
  });
});
