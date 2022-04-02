import React from "react";
import { atom, useAtom } from "jotai";
import Product from "./Product";

export const productAtom = atom(Product);
export const cartAtom = atom([]);
const totalAtom = atom((get) => {
  let totalPrice = 0;
  get(cartAtom).forEach(item => {
    totalPrice += (item.price * item.quantity);
  })
  return totalPrice;
});


export default function Home() {
  return (
    <div>
      <div>
        <h2>Shopping Cart Example</h2>
        <br />
        <ProductsContainer />
        <br />
        <CartContainer />
      </div>
    </div>
  );
}


function ProductsContainer() {
  const [product, setProduct] = useAtom(productAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const handleClick = (val) => {
    const data = product;
    console.log("item to add ", val);
    let tempCart = [...cart];
    console.log("before cart add", tempCart);

    let isFound = false;
    tempCart.forEach(item => {
      if (item.id === val.id) {
        item.quantity += 1;
        isFound = true;
      }
    });

    if (!isFound) 
        tempCart.push({id: val.id, title: val.title, price: val.price, quantity: 1});

    setCart(tempCart);
    console.log("after cart add", cart);

    data[val.id].quantity = data[val.id].quantity - 1;
    setProduct([...data]);
    // addProduct(val);
    console.log('pushed item', cart);

  };
  
  

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
  const [ cart ] = useAtom(cartAtom);
  const [ totalPrice ] = useAtom(totalAtom);
  const doCheckout = () => {
    console.log("total price ", totalPrice);
    cart.forEach((res, i) => {
      if (res.quantity !== 0) {
        res.quantity = 0;
      }
    });
  };
  
  return (
    <>
      <h3>Your Cart</h3>
      {cart ?
        cart.map((val) => (
          <div key={val.id}>
            {val.quantity !== 0 ? (
              <>
                {val.title} - ${val.price} x {val.quantity}
              </>
            ) : null}
          </div>
        )) : "Please add items to the cart"}
      <br />
      { totalPrice > 0 ? <>Total: ${totalPrice}</>: null}
      <br />
      <br />
      <button
        disabled={cart.length === 0}
        onClick={() => {
          doCheckout();
        }}
      >
        CheckOut
      </button>
    </>
  );
};
