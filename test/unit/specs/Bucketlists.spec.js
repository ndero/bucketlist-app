import { mount, shallowMount } from '@vue/test-utils';
import axios from 'axios';
import Bucketlists from '@/components/Bucketlists';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    bucketlists: [], results: [],
  })),
}));

describe(' Bucketlist vue', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Bucketlists);
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should render correct contents', () => {
    expect(cmp.vm.count).toBe(0);
  });

  it('matches snapshot', () => {
    expect(cmp.vm.$el).toMatchSnapshot();
  });

  it('should render appropriate text if no bucketlists', () => {
    // const result = await cmp.trigger('keyup.enter');
    // expect(result).toEqual({ name: 'One' });

    // expect(axios.getBucketlists).toBeCalledWith('stuff');
  });

  it('should get bucketlists', () => {
    expect(cmp.vm.page).toBe(1);
  });

  it('gets bucketlists', async () => {
    const result = await cmp.vm.getBucketlists();
    expect(result).toEqual({ bucketlists: [], results: [] });
  });

  it('should delete a bucketlist', () => {

  });

  it('should add a bucketlist', () => {

  });
});
