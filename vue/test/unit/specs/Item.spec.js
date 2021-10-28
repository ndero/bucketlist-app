import { mount } from '@vue/test-utils';
import axios from 'axios';
import Item from '@/components/Item';

const createCmp = propsData => mount(Item, { propsData });

jest.mock('axios', () => ({
  patch: jest.fn(),
}));

describe('Item tests', () => {
  let cmp;

  beforeEach(() => {
    cmp = createCmp({ item: { name: 'name', done: false } });
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('toggles edit mode', () => {
    cmp.vm.toggleEdit();
    expect(cmp.vm.allowEdit).toBeTruthy();
  });
  it('edit item', async () => {
    await cmp.vm.editItem();
    expect(axios.patch).toBeCalled();
  });
  it('toggle item done', async () => {
    await cmp.vm.toggleItemDone();
    expect(cmp.vm.item.done).toBeTruthy();
  });
});
