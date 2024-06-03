import { mount } from '@vue/test-utils';
import CocktailColumn from '../src/components/CocktailColumn.vue';

describe('CocktailColumn.vue', () => {
  const cocktail = {
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    strDrink: 'Margarita',
    strCategory: 'Cocktail',
    strInstructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and not mix into the cocktail.',
    strGlass: 'Cocktail glass',
    strIngredient1: 'Tequila',
    strIngredient2: 'Triple sec',
    strIngredient3: 'Lime juice',
    strMeasure1: '1 1/2 oz ',
    strMeasure2: '1/2 oz ',
    strMeasure3: '1 oz ',
  };

  it('renders correctly when not expanded', () => {
    const wrapper = mount(CocktailColumn, {
      props: {
        cocktail,
        isExpanded: false,
        index: 0,
      },
    });
    expect(wrapper.find('#non-expanded').exists()).toBe(true);
    expect(wrapper.find('.text-center').text().trim()).toBe('01');
  });

  it('renders correctly when expanded', async () => {
    const wrapper = mount(CocktailColumn, {
      props: {
        cocktail,
        isExpanded: true,
        index: 0,
      },
    });
    expect(wrapper.find('#non-expanded').exists()).toBe(false);
    expect(wrapper.find('img').attributes('src')).toBe(cocktail.strDrinkThumb);
    expect(wrapper.find('span.font-title').text()).toBe(cocktail.strDrink);
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('displays correct ingredients and measures', async () => {
    const wrapper = mount(CocktailColumn, {
      props: {
        cocktail,
        isExpanded: true,
        index: 0,
      },
    });
    const ingredients = wrapper.findAll('tbody tr');
    expect(ingredients).toHaveLength(3);
    expect(ingredients[0].find('td:first-child').text().trim()).toBe('Tequila');
    expect(ingredients[0].find('td:last-child').text().trim()).toBe('1 1/2 oz');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(CocktailColumn, {
      props: {
        cocktail,
        isExpanded: false,
        index: 0,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('does not render ingredients table when not expanded', () => {
    const wrapper = mount(CocktailColumn, {
      props: {
        cocktail,
        isExpanded: false,
        index: 0,
      },
    });
    expect(wrapper.find('table').exists()).toBe(false);
  });

  it('renders category and glass type correctly when expanded', async () => {
    const wrapper = mount(CocktailColumn, {
      props: {
        cocktail,
        isExpanded: true,
        index: 0,
      },
    });
    expect(wrapper.find('#category').text()).toContain(cocktail.strCategory);
    expect(wrapper.find('#glass').text()).toContain(cocktail.strGlass);
  });
});
