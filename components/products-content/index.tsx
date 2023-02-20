import { useState } from "react";
import List from "./list";

type ProductTypes = {
  products: String[];
  filter: Function;
};

const ProductsContent = ({ products, filter }: ProductTypes) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  const selectChange = (e) => {
    filter(e.target.value);
  };

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>
          Products <span>({products.length})</span>
        </h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters"></i>
        </button>
        <form
          className={`products-content__filter ${
            orderProductsOpen ? "products-order-open" : ""
          }`}
        >
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select onChange={selectChange}>
                <option>Popular</option>
                <option value="favorites">My Favorites</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select onChange={selectChange}>
                <option>Popular</option>
                <option value="asc">Price: Lowest to Highest</option>
                <option value="desc">Price: Highest to Lowest</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List products={products} />
    </section>
  );
};

export default ProductsContent;
