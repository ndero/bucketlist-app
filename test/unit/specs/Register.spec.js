import { mount } from '@vue/test-utils';
import axios from 'axios';
import Register from '@/components/Register';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({
    data: { token: 't0k3n#' },
  })),
}));

describe('Register tests', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Register);
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('toggle sign up', () => {
    cmp.vm.toggleSignUp();
    expect(cmp.vm.signUp).toBeFalsy();
  });
  it('login user', async () => {
    const response = await cmp.vm.loginUser();
    expect(response).toEqual({ data: { token: 't0k3n#' } });
  });
  it('register user', async () => {
    await cmp.vm.registerUser();
    expect(axios.post).toHaveBeenCalledTimes(2);
  });
  it('cannot register with unmatching passwords', async () => {
    cmp.setData({ password: 'pass123', confirPassword: '123pass' });
    await cmp.vm.registerUser();
    expect(cmp.vm.formErrors).toEqual("passwords don't match");
  });
});
