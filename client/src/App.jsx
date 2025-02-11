import React from "react";
import PublicPrivateRoutes from "./routing/PublicPrivateRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      {/* <Footer/> */}
      <PublicPrivateRoutes />
    </>
  );
};

export default App;
