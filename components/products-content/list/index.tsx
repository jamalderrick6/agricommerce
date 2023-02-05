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
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images} 
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent