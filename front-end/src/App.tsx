import React, { useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/css/app.css";
import "./styles/css/global.css";
import { AxiosResponse } from "axios";


function App() {

  const [ip, setIp] = useState<string>("");
  const [removeIp, setRemoveIp] = useState<string>("");
  const [addIpFeedback, setAddIpFeedback] = useState<string>("")
  const [removeIpFeedback, setRemoveIpFeedback] = useState<string>("")

  async function blacklistIpHandler(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response: AxiosResponse<any> = await api.post("/blacklist-ip", { ip: ip });
      setAddIpFeedback(response.data.status);
      setIp("");
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

  async function unblacklistIpHandler(event: React.FormEvent) {
    event.preventDefault();
    const response: AxiosResponse<any> = await api.post("/unblacklist-ip", { ip: removeIp });
    setRemoveIpFeedback(response.data.status);
    setRemoveIp("");
    setTimeout(() => {
      setRemoveIpFeedback("");
    }, 3000)
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
          <input type="text" value={ip} placeholder={"x.xxx.xx.xx"} required onChange={(e) => setIp(e.target.value)} />
          <input type="submit" /> <br />
          <span id="blacklist-ip-feedback">{addIpFeedback}&nbsp;</span>
        </form>
        <form id="unblacklist-ip" onSubmit={unblacklistIpHandler}>
          <h3>Remove an IP from the backlist</h3>
          <p>IPS submitted in this form will be removed from the backlist</p>
          <input type="text" value={removeIp} placeholder={"x.xxx.xx.xx"} required onChange={(e) => setRemoveIp(e.target.value)} />
          <input type="submit" /> <br />
          <span id="blacklist-ip-feedback">{removeIpFeedback}&nbsp;</span>
        </form>
        <form id="get-ips" onSubmit={getAllIpsHandler}>
          <h3>Get all IPS</h3>
          <p>Retrieve a list of all TOR IPS</p>
          <input type="submit" value="Get IPS" />
        </form>
        <form id="get-filtered-ips" onSubmit={getFilteredIpsHandler}>
          <h3>Get only IPS which aren't blacklisted</h3>
          <p>Retrieve a list of TOR IPS without the ones which are blacklisted</p>
          <input type="submit" value="Get filtered IPS" />
        </form>
      </main>
      <Footer />
    </main>
  );
}

export default App;
