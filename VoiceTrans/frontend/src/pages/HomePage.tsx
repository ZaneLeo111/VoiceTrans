import styles from "./styles";
import { Navbar, Hero } from "../components";

const HomePage: React.FC = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart} h-screen`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
