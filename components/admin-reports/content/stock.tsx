import { useEffect, useState } from "react";
import { getToken } from "utils/helpers";
import { API, BEARER } from "utils/constant";
import { message } from "antd";
import csvDownload from "json-to-csv-export";
import { getProducts } from "pages/api/products";

const StockReports = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewedProducts, setViewedProducts] = useState("all");

  const fetchProducts = async () => {
    const data = await getProducts();
    if ([200, 201].includes(data.response.status)) {
      setProducts(data.json.data);
      setFilteredProducts(data.json.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (e) => {
    const { value } = e.target;
    setViewedProducts(value);
    if (value === "in_stock") {
      setFilteredProducts(
        products.filter((product) => !product.attributes.stock_needed)
      );
    } else if (value === "stock_needed") {
      setFilteredProducts(
        products.filter((product) => product.attributes.stock_needed)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const downloadProducts = () => {
    const json = filteredProducts.map((product) => ({
      productID: product.id,
      name: product.attributes.name,
      price: product.attributes.price,
      quantityAvailable: product.attributes.quantityAvailable,
    }));
    console.log(json);
    const dataToConvert = {
      data: json,
      filename: `${viewedProducts}_products`,
      delimiter: ",",
      headers: ["ID", "Name", "Price", "Available Quantity"],
    };
    csvDownload(dataToConvert);
  };

  return (
    <section className="content order">
      <div className="filter__select">
        <h4>Sort by: </h4>
        <div className="select-wrapper">
          <select onChange={filterProducts}>
            <option>All</option>
            <option value="in_stock">In Stock</option>
            <option value="stock_needed">Stock Needed</option>
          </select>
        </div>
      </div>
      <div className="actions">
        <div className="card">
          <span>Number of Products</span>
          <span>{filteredProducts && filteredProducts.length}</span>
        </div>
        <a
          href="http://localhost:1337/admin/content-manager/collectionType/api::product.product?page=1&pageSize=10&sort=name:ASC"
          className="view--button"
          target="_blank"
        >
          View Products
        </a>
        <button onClick={downloadProducts} className="download--button">
          Download products
        </button>
      </div>
    </section>
  );
};

export default StockReports;
