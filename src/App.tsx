import Header from "./Header";
import Navbar from "./NavBar";

function App() {
  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Contact", url: "/contact" },
  ];

  // Use the links array as a prop when rendering the Navbar
  return (
    <>
      <Header title={"VoiceTrans"} />
      {/* <Navbar />; */}
    </>
  );
}

export default App;
