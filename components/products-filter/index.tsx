import { useState } from "react";
import Checkbox from "./form-builder/checkbox";
import Slider from "rc-slider";

// data
import productsTypes from "./../../utils/data/products-types";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

type CategoryTypes = {
  categories: String[];
  categoriesSelected: String[];
  setCategoriesSelected: Function;
};

const ProductsFilter = ({
  categories,
  categoriesSelected,
  setCategoriesSelected,
}: CategoryTypes) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const addQueryParams = (e: any): void => {
    const { name, checked } = e.target;
    let cats = [...categoriesSelected];
    if (categoriesSelected.includes(name)) {
      let index = categoriesSelected.indexOf(name);
      cats.splice(index, 1);
      setCategoriesSelected(cats);
    } else {
      cats.push(name);
      setCategoriesSelected(cats);
    }
  };

  return (
    <form className="products-filter" onChange={(e) => addQueryParams(e)}>
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Add Filter <i className="icon-down-open"></i>
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            {categories.map((type) => (
              <Checkbox
                key={type.id}
                name={type.attributes.Name}
                label={type.attributes.Name}
                // onChange = {handleChange}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              min={0}
              max={20}
              defaultValue={[3, 10]}
              tipFormatter={(value) => `${value}%`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-submit btn--rounded btn--yellow"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;
