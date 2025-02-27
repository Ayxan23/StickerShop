import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface ImageNode {
  id: string;
  originalSrc: string;
  height: number;
  width: number;
  altText: string | null;
}

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: { node: ImageNode }[];
  };
}

interface ApiResponse {
  pageProps: {
    products: { node: ProductNode }[];
  };
}

const Home = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch(
      "https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <main className="container">
      <div className={styles.title}>
        <h1>Get Doggy Stickers!</h1>
        <p>
          Times are tough. Liven up your home with some cute Doggy Stickers. 🐶
        </p>
      </div>

      <div className={styles.productWrapper}>
        {data &&
          data.pageProps.products.map((item, i) => (
            <Link key={i} to={`detail/${item.node.id}`}>
              <div className={styles.product}>
                <div className={styles.productImage}>
                  <img
                    src={item.node.images.edges[0].node.originalSrc}
                    alt=""
                  />
                </div>
                <div className={styles.productTitle}>
                  <p></p>
                  <h4>{item.node.title}</h4>
                  <p>{item.node.description}</p>
                  <span>$9.99</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};

export default Home;
