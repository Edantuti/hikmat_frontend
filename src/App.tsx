import Footer from "./components/Footer";
import Header from "./components/Header";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <section className="min-h-[76vh] max-h-full">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default App;
