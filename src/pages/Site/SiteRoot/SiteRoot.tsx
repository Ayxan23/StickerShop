import Header from "../../../layout/Site/Header/Header";
import Footer from "../../../layout/Site/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";

const SiteRoot = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default SiteRoot;
