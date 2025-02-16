import React from "react";
import PublicPrivateRoutes from "./routing/PublicPrivateRoutes";
import Header from "./components/Header";


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
