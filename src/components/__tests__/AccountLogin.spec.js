import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import AccountLogin from "@/components/AccountLogin.vue";

const pinia = createTestingPinia({ createSpy: vi.fn });
const wrapper = shallowMount(AccountLogin, {
  global: {
    plugins: [pinia],
  },
});
describe("Register tests", () => {
  it("login view with errors snapshot", () => {
    wrapper.vm.singUp = false;
    wrapper.vm.errors = "Forbiden";
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it("displays login and register errors", () => {
    wrapper.vm.password = "short";
    expect(wrapper.vm.invalidPassword).toEqual(true);
    wrapper.vm.password = "doaFi4w7rt.";
    expect(wrapper.vm.invalidPassword).toEqual(false);
    wrapper.vm.confirmPassword = "doaFi4w7rt";
    expect(wrapper.vm.invalidConfirmPassword).toEqual(true);
  });
});
