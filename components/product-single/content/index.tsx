import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import { ProductType, ProductStoreType } from "types";
import { RootState } from "store";
import { AddToCart } from "pages/api/cart";
import { useAuthContext } from "context/AuthContext";
import { Alert, Spin } from "antd";

type ProductContent = {
  product: ProductType;
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const { user, cartItems, setUserCartItems } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");

  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      })
    );
  };

  const addToCart = async () => {
    const productToSave: ProductStoreType = {
      name: product.attributes.name,
      thumb: product.attributes.image.data
        ? `http://localhost:1337${product.attributes.image.data[0].attributes.url}`
        : "",
      price: product.attributes.price,
      count: count,
    };

    setIsLoading(true);
    try {
      const data = await AddToCart(productToSave);
      let items = [...cartItems];
      items.push(data.data);

      setUserCartItems(items);
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="product-content">
      {error ? (
        <Alert
          className="alert_error"
          message={error}
          type="error"
          closable
          afterClose={() => setError("")}
        />
      ) : null}
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product.id}
        </h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.attributes.name}</h2>

        <div className="product__prices">
          <h4>Ksh{product.attributes.price}</h4>
          {product.discount && <span>Ksh{product.attributes.price}</span>}
        </div>
        <div className="product__features">
          {product.attributes.description}
          {/* <ul>
          {
            product.features.map((feature, index) => <li key={index}>{feature}</li>)
          }
          </ul> */}
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setCount(count - 1)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart {isLoading && <Spin size="small" />}
            </button>
            <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
            >
              <i className="icon-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
