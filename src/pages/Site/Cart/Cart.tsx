import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  productName: string;
  selectedSize: string;
  totalPrice: number;
  quantity: number;
  productImg: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(cart)) {
      cart = [];
    }
    setCartItems(cart);
  }, []);

  const removeItem = (id: string) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!Array.isArray(cart)) {
      cart = [];
    }

    const removedItem = cart.find((item: any) => item.id == id);
    const removedQuantity = removedItem ? removedItem.quantity : 0;

    const updatedCart = cart.filter((item: any) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const currentCount = Number(localStorage.getItem("cartCount") || 0);
    const newCount = Math.max(0, currentCount - removedQuantity);
    localStorage.setItem("cartCount", newCount.toString());

    window.dispatchEvent(new Event("storage"));

    alert("Product removed from cart.");
  };

  return (
    <div className="container">
      <div className={styles.yourCart}>
        <h2 className={styles.cartTitle}>Your Cart</h2>
      </div>

      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.imgName}>
                  <img src={item.productImg} alt={item.productName} />{" "}
                  {item.productName} {item.selectedSize}
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className={styles.quantityInput}
                  value={item.quantity}
                  min={1}
                />
              </td>
              <td>${item.totalPrice}</td>
              <td>
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pay}>
        <Link to="https://mpay.az/">
          <button className={styles.payButton}>Pay</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
