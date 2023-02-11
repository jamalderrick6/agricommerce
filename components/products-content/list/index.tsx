import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { ProductTypeList } from 'types';



const ProductsContent = ({ products }:any) => {
  return (
    <>
      {!products && 
        <ProductsLoading />
      }

      {products &&
        <section className="products-list">
          {products.map((item: ProductTypeList)  => (
            <ProductItem 
              id={item.id} 
              name={item.attributes.name}
              price={item.attributes.price}
              currentPrice={item.attributes.price}
              key={item.id}
              images={item.attributes.image} 
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent