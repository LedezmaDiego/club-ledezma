import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Bienvenido a la página principal</h1>
      </div>
    </>
  );
}
