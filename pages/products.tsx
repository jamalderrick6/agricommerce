import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';
import { useEffect, useState } from 'react';
import useSwr from 'swr';

const Products = () => {
  const [products, setProducts] = useState([])
  const [categoriesSelected, selCategoriesSelected] = useState([])

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error } = useSwr('/api/products', fetcher);

    useEffect(() => {
      setProducts(data)
    }, [data])

    const handleCategories = (lst:any) => {
      selCategoriesSelected(lst)

      if(lst.length){
        let filteredProducts = products.filter((product) => lst.includes(product.category))
        setProducts(filteredProducts)
      }else{
        setProducts(data)
      }
    }

  return(
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter setCategories = {handleCategories} categories = {categoriesSelected} />
          <ProductsContent products = {products} />
        </div>
      </section>
      <Footer />
    </Layout>
  )
}
  
export default Products
  