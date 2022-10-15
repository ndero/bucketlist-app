import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import BucketlistItems from "@/components/BucketlistItems.vue";

const pinia = createTestingPinia({ createSpy: vi.fn });

const wrapper = shallowMount(BucketlistItems, {
  global: {
    plugins: [pinia],
  },
});
const logoutSpy = vi.spyOn(wrapper.vm, "logout");

describe(" Bucketlist tests", () => {
  it("matches snapshot", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it("logs the user out", () => {
    const button = wrapper.find("#logout");
    expect(button.text()).toEqual("Logout");
    button.trigger("click");
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
