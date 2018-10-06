import { mount } from '@vue/test-utils';
import axios from 'axios';
import EditBucketlist from '@/components/EditBucketlist';

const createCmp = propsData => mount(EditBucketlist, { propsData });

jest.mock('axios', () => ({
  patch: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(() => Promise.resolve({
    data: { name: 'New item' },
  })),
  post: jest.fn(() => Promise.resolve({
    data: { name: 'New item' },
  })),
}));

describe('EditBucketlist tests', () => {
  let cmp;

  beforeEach(() => {
    cmp = createCmp({ bucketlist: { name: 'name', done: false } });
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(cmp.vm.$el).toMatchSnapshot();
  });
  it('toggles edit and show modes', () => {
    cmp.vm.toggleEdit();
    expect(cmp.vm.allowEdit).toBeTruthy();
    cmp.vm.toggleShowItems();
    expect(cmp.vm.showItems).toBeTruthy();
  });
  it('toggles marking bucketlist as done', async () => {
    await cmp.vm.toggleBucketlistDone();
    expect(cmp.vm.bucketlist.done).toBeTruthy();
  });
  it('edits bucketlist', async () => {
    await cmp.vm.editBucketlist();
    expect(axios.patch).toBeCalled();
  });
  it('adds item to bucketlist', async () => {
    const result = await cmp.vm.addItem();
    expect(result).toEqual({ data: { name: 'New item' } });
  });
  it('gets items', async () => {
    const result = await cmp.vm.getItems();
    expect(result).toEqual({ data: { name: 'New item' } });
  });
  it('deletes an item', async () => {
    await cmp.vm.deleteItem('url');
    expect(cmp.vm.items).toEqual([]);
  });
});
