import React, { useState } from "react";
import Header from "./Header";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EsqueceuSenha from "./pages/EsqueceuSenha";

function Main() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      {/* O header estava duplicado */}
      {/* <Header currentPage={currentPage} /> */}
      {currentPage === "login" && <Login onPageChange={setCurrentPage} />}
      {currentPage === "content" && <Content />}
      {currentPage === "profile" && <Profile onPageChange={setCurrentPage} />}
      {currentPage === "esqueceusenha" && (
        <EsqueceuSenha onPageChange={setCurrentPage} />
      )}
    </>
  );
}

export default Main;
