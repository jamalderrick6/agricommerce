import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import ProductsFilter from "../components/products-filter";
import ProductsContent from "../components/products-content";
import { useEffect, useState } from "react";
import ProductsData from "utils/data/products";
import { getProducts } from "./api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [all, setAll] = useState([])
  const [categoriesSelected, selCategoriesSelected] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const data = await getProducts();
      if([200,201].includes(data.response.status)){
        setAll(data.json.data)
        setProducts(data.json.data)
      }
    }
    fetchProducts()
  }, []);

  const handleCategories = (lst: any) => {
    selCategoriesSelected(lst);

    if (lst.length) {
      let filteredProducts = products.filter((product) =>
        lst.includes(product.attributes.category.data.attributes.name)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(all);
    }
  };

  console.log('products', products)

  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            setCategories={handleCategories}
            categories={categoriesSelected}
          />
          <ProductsContent products={products} />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;
