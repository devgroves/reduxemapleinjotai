import React from "react";
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
  const [total, setTotal] = useAtom(totalAtom);
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
        setTotal(total + res.price);
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

const CartContainer = () => {
  const [cart] = useAtom(priceAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const CheckOut = () => {
    cart.forEach((res, i) => {
      if (res.quantity !== 0) {
        res.quantity = 0;
      }
    });
  };
  return (
    <>
      <h3>Your Cart</h3>
      {cart &&
        cart.map((val) => (
          <div key={val.id}>
            {val.quantity !== 0 ? (
              <>
                {val.title} - ${val.price} x {val.quantity}
              </>
            ) : null}
          </div>
        ))}
      Total:$ {total}
      <br />
      <br />
      <button
        disabled={total === 0}
        onClick={() => {
          CheckOut();
          setTotal(0);
        }}
      >
        CheckOut
      </button>
    </>
  );
};
