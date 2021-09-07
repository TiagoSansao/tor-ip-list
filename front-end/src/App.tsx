import React, { useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/css/app.css";
import "./styles/css/global.css";
import axios, { AxiosResponse } from "axios";


function App() {

  const [ip, setIp] = useState<String>("");
  const [addIpFeedback, setAddIpFeedback] = useState<String>("")

  async function blacklistIpHandler(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response: AxiosResponse<any> = await api.post("/filter-ip", { ip: ip });
      setAddIpFeedback(response.data.status);
      setTimeout(() => {
        setAddIpFeedback("");
      }, 3000)
    } catch (e) {
      setAddIpFeedback("Bad request");
      setTimeout(() => {
        setAddIpFeedback("");
      }, 3000)
    };
  };

  async function getAllIpsHandler(event: React.FormEvent) {
    event.preventDefault();
    const response = await api.get("ips");
    console.log(response.data);
  };

  async function getFilteredIpsHandler(event: React.FormEvent) {
    event.preventDefault();
    const response = await api.get("filtered-ips");
    console.log(response.data);
  };



  return (
    <main id="full-spa">
      <Header />
      <main id="app">
        <form id="blacklist-ip" onSubmit={blacklistIpHandler}>
          <h3>Blacklist an IP</h3>
          <p>IPS submitted in this form won't show up in the filtered-ips endpoint</p>
          <input type="text" required onChange={(e) => setIp(e.target.value)} />
          <input type="submit" />
          <span id="blacklist-ip-feedback">{addIpFeedback}</span>
        </form>
        <form id="get-ips" onSubmit={getAllIpsHandler}>
          <h3>Get all IPS</h3>
          <p>Retrieve a list of all TOR IPS</p>
          <input type="submit" />
        </form>
        <form id="get-filtered-ips" onSubmit={getFilteredIpsHandler}>
          <h3>Get only IPS which aren't blacklisted</h3>
          <p>Retrieve a list of TOR IPS without the ones which are blacklisted</p>
          <input type="submit" />
        </form>
      </main>
      <Footer />
    </main>
  );
}

export default App;
