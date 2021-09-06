import axios from 'axios';

async function loadIps() {
  
  const urls = ["https://onionoo.torproject.org/summary?limit=5000", "https://www.dan.me.uk/tornodes"];
  const ips = [];

  // Store IPS from the first address

  const response_01 = await axios.get(urls[0]);
  response_01.data.relays.forEach((relay) => {
    ips.push(relay.a[0]);
  });

  console.log(ips);

  // Store IPS from the second address

};

export default loadIps;