import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/dataSlice";
import { RootState, AppDispatch } from "../../../redux/store";

interface ImageNode {
  id: string;
  originalSrc: string;
  height: number;
  width: number;
  altText: string | null;
}

interface ItemType {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    images: {
      edges: { node: ImageNode }[];
    };
  };
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
          data.pageProps.products.map((item:ItemType, i: number) => (
            <Link key={i} to={`detail/${item.node.id}`}>
              <div className={styles.product}>
                <div className={styles.productImage}>
                  <img
                    src={item.node.images.edges[0].node.originalSrc}
                    alt=""
                  />
                </div>
                <div className={styles.productTitle}>
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
