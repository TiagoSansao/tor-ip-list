import React, { useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/css/app.css";
import "./styles/css/global.css";


function App() {

  const [ip, setIp] = useState<String>("");

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    api.post("/filter-ip", { ip: ip });
    console.log(ip);
  }

  return (
    <main id="full-spa">
      <Header />
      <main id="app">
        <form onSubmit={submitHandler}>
          <input type="text" onChange={(e) => setIp(e.target.value)} />
          <input type="submit" />
        </form>
      </main>
      <Footer />
    </main>
  );
}

export default App;
