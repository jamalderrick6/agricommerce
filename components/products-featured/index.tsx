import ProductsCarousel from './carousel';
import useSwr from 'swr';
import { useEffect, useState } from 'react';
import { getProducts } from 'pages/api/products';

const ProductsFeatured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const data = await getProducts();
      if([200,201].includes(data.response.status)){
        setProducts(data.json.data)
      }
    }
    fetchProducts()
  }, []);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Products</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={products} />
      </div>
    </section>
  )
};

export default ProductsFeatured