import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';
import { vi } from 'vitest';

vi.mock('axios');

describe('App.vue', () => {
  const mockCocktails = [
    { strDrink: 'Margarita', strDrinkThumb: '', strCategory: '', strInstructions: '', strGlass: '' },
    { strDrink: 'Martini', strDrinkThumb: '', strCategory: '', strInstructions: '', strGlass: '' },
    { strDrink: 'Mojito', strDrinkThumb: '', strCategory: '', strInstructions: '', strGlass: '' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { drinks: mockCocktails } });
    vi.clearAllMocks();  // Reset all mocks before each test
  });

  it('fetches and displays cocktails', async () => {
    const wrapper = mount(App);
    await flushPromises();
    expect(wrapper.findAllComponents({ name: 'CocktailColumn' })).toHaveLength(3);
  });

  it('expands the correct column on click', async () => {
    const wrapper = mount(App);
    await flushPromises();
    const columns = wrapper.findAllComponents({ name: 'CocktailColumn' });
    await columns[1].trigger('click');
    expect(wrapper.vm.expandedColumn).toBe(1);
  });

  it('fetches new cocktails on button click', async () => {
    axios.get.mockResolvedValueOnce({ data: { drinks: [mockCocktails[1]] } });
    axios.get.mockResolvedValueOnce({ data: { drinks: [mockCocktails[2]] } });

    const wrapper = mount(App);
    await flushPromises();
    const refreshButton = wrapper.find('button');
    await refreshButton.trigger('click');
    await flushPromises();

    expect(wrapper.findAllComponents({ name: 'CocktailColumn' })).toHaveLength(3);
    expect(axios.get).toHaveBeenCalledTimes(6); // 3 initial + 3 refresh
  });

  it('fetches cocktails initially on created', async () => {
    const wrapper = mount(App);
    await flushPromises();
    expect(wrapper.vm.cocktails).toHaveLength(3);
  });
});
