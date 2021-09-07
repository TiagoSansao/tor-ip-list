import React, { useState, useRef } from "react";
import api from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AxiosResponse } from "axios";
import "./styles/css/app.css";
import "./styles/css/global.css";

// TODO
// Focus at element after submitting

function App() {

  const [ip, setIp] = useState<string>("");
  const [removeIp, setRemoveIp] = useState<string>("");
  const [addIpFeedback, setAddIpFeedback] = useState<string>("")
  const [removeIpFeedback, setRemoveIpFeedback] = useState<string>("")
  const [getIpsFeedback, setGetIpsFeedback] = useState<string>("")
  const [getFilteredIpsFeedback, setGetFilteredIpsFeedback] = useState<string>("")
  const [responseIps, setResponseIps] = useState({ ips: [] })

  const inputAddIpEl = useRef<any>(null);
  const inputRemoveIpEl = useRef<any>(null);

  async function blacklistIpHandler(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response: AxiosResponse<any> = await api.post("/blacklist-ip", { ip: ip });
      setAddIpFeedback(response.data.status);
      setIp("");
      inputAddIpEl.current.focus();
      setTimeout(() => {
        setAddIpFeedback("");
      }, 3000)
    } catch (e) {
      setAddIpFeedback("Error: Bad request");
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
    inputRemoveIpEl.current.focus();
    setTimeout(() => {
      setRemoveIpFeedback("");
    }, 3000)
  };

  async function getAllIpsHandler(event: React.FormEvent) {
    event.preventDefault();
    const response = await api.get("ips");
    setResponseIps(response.data);
    setGetIpsFeedback("Successfully retrieved list of all IPS")
    setResponseIps(response.data);
    setTimeout(() => {
      setGetIpsFeedback("");
    }, 3000)
  };

  async function getFilteredIpsHandler(event: React.FormEvent) {
    event.preventDefault();
    const response = await api.get("filtered-ips");
    setGetFilteredIpsFeedback("Successfully retrieved filtered list of IPS")
    setResponseIps(response.data);
    setTimeout(() => {
      setGetFilteredIpsFeedback("");
    }, 3000)

  };

  return (
    <main id="full-spa">
      <Header />
      <main id="lApp">
        <div id="division">
          <main id="app">
            <form id="blacklist-ip" onSubmit={blacklistIpHandler}>
              <h3>Blacklist an IP</h3>
              <p>IPS submitted in this form won't show up in the filtered-ips endpoint</p>
              <input ref={inputAddIpEl} type="text" value={ip} placeholder={"x.xxx.xx.xx"} required onChange={(e) => setIp(e.target.value)} />
              <input type="submit" /> <br />
              <span style={{ color: /Error:/.test(addIpFeedback) ? "red" : "green" }} id="blacklist-ip-feedback">{addIpFeedback}&nbsp;</span>
            </form>
            <form ref={inputRemoveIpEl} id="unblacklist-ip" onSubmit={unblacklistIpHandler}>
              <h3>Remove an IP from the blacklist</h3>
              <p>IPS submitted in this form will be removed from the blacklist</p>
              <input type="text" value={removeIp} placeholder={"x.xxx.xx.xx"} required onChange={(e) => setRemoveIp(e.target.value)} />
              <input type="submit" /> <br />
              <span style={{ color: /Error:/.test(removeIpFeedback) ? "red" : "green" }} id="blacklist-ip-feedback">{removeIpFeedback}&nbsp;</span>
            </form>
            <form id="get-ips" onSubmit={getAllIpsHandler}>
              <h3>Get all IPS</h3>
              <p>Retrieve a list of all TOR IPS</p>
              <input type="submit" value="Get IPS" /> <br />
              <span style={{ color: "green" }} id="blacklist-ip-feedback">{getIpsFeedback}&nbsp;</span>
            </form>
            <form id="get-filtered-ips" onSubmit={getFilteredIpsHandler}>
              <h3>Get only IPS which aren't blacklisted</h3>
              <p>Retrieve a list of TOR IPS without the ones which are blacklisted</p>
              <input type="submit" value="Get filtered IPS" /> <br />
              <span style={{ color: "green" }} id="blacklist-ip-feedback">{getFilteredIpsFeedback}&nbsp;</span>
            </form>
          </main>
          <aside id="panel">
            {responseIps.ips.map((ipLocalScope) => <p>{ipLocalScope}</p>)}
          </aside>
        </div>
      </main>
      <Footer />
    </main>
  );
}

export default App;
