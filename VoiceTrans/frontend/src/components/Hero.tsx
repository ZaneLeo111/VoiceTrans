import styles from "../styles";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      // > md screen, flex-row; otherwise, flex-col
      className={`flex md:flex-row flex-col ${styles.paddingY} mx-auto`}
    >
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 text-center`}
      >
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Share <span className="text-gradient"> without </span> borders.
        </h1>
        <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
          Your one-stop solution for video language translation. Our advanced
          platform uses state-of-the-art AI technology to convert your videos
          into different languages, using your own voice.
        </p>
        <Link to="/upload">
          <button className="bg-blue-500 text-white px-4 py-2 mt-10 rounded">
            Try for free !
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
