import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: {
      node: {
        id: string;
        originalSrc: string;
        height: number;
        width: number;
        altText: string | null;
      };
    }[];
  };
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedSize, setSelectedSize] = useState("3 x 3");
  const [quantity, setQuantity] = useState(1);

  const prices: { [key: string]: number } = {
    "3 x 3": 9.99,
    "4 x 4": 10.99,
    "5.5 x 5.5": 11.99,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json"
        );
        const data = await response.json();

        if (data && data.pageProps?.products) {
          setProducts(
            data.pageProps.products.map((p: { node: Product }) => p.node)
          );
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  const totalPrice = prices[selectedSize] * quantity;

  const addProduct = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(cart)) {
      cart = [];
    }

    const existingProduct = cart.find((item: any) => item.id === product?.id);
    if (existingProduct) {
      alert("This product is already in your cart!");
      return;
    }

    const productName = product?.title;
    const productImg = product?.images.edges[0].node.originalSrc;
    cart.push({
      id,
      quantity,
      totalPrice,
      productName,
      productImg,
      selectedSize,
    });
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    const currentCount = Number(localStorage.getItem("cartCount") || 0);
    localStorage.setItem("cartCount", (currentCount + 1).toString());

    window.dispatchEvent(new Event("storage"));
    alert("Product added to cart! 🛒");
  };

  return product ? (
    <div className="container">
      <section className={styles.detail}>
        <div className={styles.detailImg}>
          <img src={product.images.edges[0].node.originalSrc} alt="" />
        </div>
        <div className={styles.detailInfo}>
          <Link to="/">
            <FaArrowLeftLong />
            Back To All Products
          </Link>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <span>${totalPrice.toFixed(2)}</span>

          <div className={styles.detailInput}>
            <label>
              Qty.
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
              />
            </label>
            <label className={styles.detailSelect}>
              Size
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {Object.keys(prices).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            onClick={() => {
              addProduct();
            }}
          >
            Add To Cart <FaCartShopping size={22} />
          </button>
        </div>
      </section>
    </div>
  ) : (
    <p>Not Found</p>
  );
};

export default Detail;
