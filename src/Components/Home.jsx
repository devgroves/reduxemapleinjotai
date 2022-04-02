import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
import Product from "./Product";
import Cart from "./Cart";

export const productAtom = atom(Product);
export const priceAtom = atom(Cart);
export const totalAtom = atom(0);

export default function Home() {
  return (
    <div>
      <div>
        <h2>Shopping Cart Example</h2>
        <hr />
        <ProductsContainer />
        <hr />
        <CartContainer />
      </div>
    </div>
  );
}

const ProductsContainer = () => {
  const [product, setProduct] = useAtom(productAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const handleClick = (val) => {
    const data = product;
    data[val.id].quantity = data[val.id].quantity - 1;
    setProduct([...data]);
    addProduct(val);
  };
  function addProduct(val) {
    const data = price;
    data.forEach((res, i) => {
      if (res.title === val.title && res.price === val.price) {
        res.quantity = res.quantity + 1;
        console.log("res.quantity", res.quantity);
      }
    });
    setPrice(data);
  }

  return (
    <>
      <h3>Products</h3>
      {product &&
        product.map((val) => (
          <div key={val.id}>
            {val.title} - ${val.price} {val.quantity !== 0 ? `x ${val.quantity}` : ""}
            <br />
            <button disabled={val.quantity === 0} onClick={() => handleClick(val)}>
              {val.quantity !== 0 ? "Add to Cart" : "Sold Out"}
            </button>
            <br /> <br />
          </div>
        ))}
    </>
  );
};

const Container = () => {
  const [cart, setCart] = useAtom(priceAtom);
  const [total, setTotal] = useAtom(totalAtom);
  useEffect(() => {
    cart.forEach((val) => {
      const count = val.quantity * val.price;
      setTotal(total + count);
    });
  });
  return (
    <>
      <h3>Your Cart</h3>
      {cart &&
        cart.map((val) => (
          <div key={val.id}>{val.quantity !== 0 ? `${val.title} - ${val.price} x ${val.quantity}` : null}</div>
        ))}
      Total:$ {total}
      <br />
      <br />
      <button
        disabled={total === 0}
        onClick={() => {
          setCart(Cart);
        }}
      >
        CheckOut
      </button>
    </>
  );
};

export const CartContainer = React.memo(Container);
