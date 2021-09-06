import axios from 'axios';
import fs from 'fs/promises';



async function loadIps() {
  
  const urls = ["https://onionoo.torproject.org/summary?limit=5000", "https://www.dan.me.uk/torlist"];
  let ips = [];

  // Store IPS from the first address

  const response_01 = await axios.get(urls[0]);
  // const response_02 = await axios.get(urls[1]);

  response_01.data.relays.forEach((relay) => {
    ips.push(relay.a[0]);
  });

  // Store IPS from the second address

  //  DUE TO THE DAN API LIMITATIONS, IT IS ONLY POSSIBLE TO REQUEST DATA ONCE IN THIRTY MINUTES
  //  SO, I DOWNLOADED A SAMPLE RESPONSE TO BUILD THE APPLICATION

  const response_02_data = await fs.readFile("./src/utils/www.dan.me.uk.txt", "utf-8");
  ips = ips.concat(response_02_data.split("\n"));

  // ips = ips.concat(response_02.data.split("\n"));

  return ips;
};

export default loadIps;