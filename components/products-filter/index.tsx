import { useState } from 'react';
import Checkbox from './form-builder/checkbox';
import Slider from 'rc-slider';

// data
import productsTypes from './../../utils/data/products-types';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = ({categories, setCategories}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const addQueryParams = (e) => {
    const { name, checked } = e.target;
    let cats = [...categories]
    if(categories.includes(name)){
      let index = categories.indexOf(name)
      cats.splice(index, 1)
      setCategories(cats)
    }else{
      cats.push(name)
      setCategories(cats)
    }
  }

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button type="button" 
        onClick={() => setFiltersOpen(!filtersOpen)} 
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
          Add Filter <i className="icon-down-open"></i>
      </button>
      
      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`}>
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            {productsTypes.map(type => (
              <Checkbox
                key={type.id} 
                name={type.name}
                label={type.name} 
                // onChange = {handleChange}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
          </div>
        </div>

        <button type="submit" className="btn btn-submit btn--rounded btn--yellow">Apply</button>
      </div>
    </form>
  )
}
  
export default ProductsFilter
  