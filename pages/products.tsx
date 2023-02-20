import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import ProductsFilter from "../components/products-filter";
import ProductsContent from "../components/products-content";
import { useEffect, useState } from "react";
import ProductsData from "utils/data/products";
import { getProducts } from "./api/products";
import { getCategories } from "./api/categories";
import { RootState } from "store";

const Products = () => {
  const { favProducts } = useSelector((state: RootState) => state.user);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [all, setAll] = useState([]);
  const [categoriesSelected, selCategoriesSelected] = useState([]);

  console.log("fav products", favProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      if ([200, 201].includes(data.response.status)) {
        setAll(data.json.data);
        setProducts(data.json.data);
      }
    };

    const fetchCategories = async () => {
      const data = await getCategories();
      if ([200, 201].includes(data.response.status)) {
        setCategories(data.json.data);
        setProducts(data.json.data);
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategories = (lst: any) => {
    selCategoriesSelected(lst);

    if (lst.length) {
      let filteredProducts = products.filter((product) =>
        product.attributes.categories.data.some(
          (r) => lst.indexOf(r.attributes.Name) >= 0
        )
      );
      setProducts(filteredProducts);
    } else {
      setProducts(all);
    }
  };

  const filterProducts = (criteria: String) => {
    console.log("criteria", criteria);
    if (criteria === "favorites") {
      setProducts(all.filter((prod) => favProducts.includes(prod.id)));
    } else if (criteria === "asc") {
      let ascs = all.sort((a, b) => a.attributes.price - b.attributes.price);
      setProducts(ascs);
    } else if (criteria === "desc") {
      let descs = all.sort((a, b) => b.attributes.price - a.attributes.price);
      setProducts(descs);
    } else {
      setProducts(all);
    }
  };

  console.log("products", products);

  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            categories={categories}
            setCategoriesSelected={handleCategories}
            categoriesSelected={categoriesSelected}
          />
          <ProductsContent
            filter={(crit) => filterProducts(crit)}
            products={products}
          />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;
