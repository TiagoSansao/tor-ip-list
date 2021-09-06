import React, { useState } from "react";
import api from "./services/api";



function App() {

  const [ip, setIp] = useState<String>("");

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    api.post("/filter-ip", { ip: ip });
  }

  return (
    <main>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={(e) => setIp(e.target.value)} />
        <input type="submit" />
      </form>
    </main>
  );
}

export default App;
