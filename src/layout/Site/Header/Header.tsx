import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const currentCount = Number(localStorage.getItem("cartCount") || 0);
    setCount(currentCount);

    const handleStorageChange = () => {
      setCount(Number(localStorage.getItem("cartCount") || 0));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <Link to="/">
            <div className={styles.logo}>
              <img src="img/icon.svg" alt="" />
              Doggy Stickers
            </div>
          </Link>
          <Link to="/cart">
            <div className={styles.cart}>
              <FaCartShopping size={22} />
              {count != 0 && <div>{count}</div>}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
