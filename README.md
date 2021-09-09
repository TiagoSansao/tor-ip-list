<header>
  <h1 align="center"> TOR IP LIST </h1>
  <p align="center"> 
    <strong> MANAGE YOUR OWN TOR IP LIST</strong> 
  </p>
  <p align="center"> 
    <a href="#about">About</a> •
    <a href="#endpoints">Endpoints</a> •
    <a href="#preview">Preview</a> •
    <a href="#setup">App setup</a> •
    <a href="#dependencies">Dependencies</a> 
  </p>
  <hr/>
</header>
<main>

  <div id="about">
    <h3 align="center">💁 About</h3>
    <p>This application retrieves IPS from <a href="https://www.dan.me.uk/tornodes" target="_blank">dan.me.uk</a> and <a href="https://onionoo.torproject.org/summary?limit=5000" target="_blank">onionoo.torproject.org</a>, subsequently it unifies them into one list. The main functionality of the application, is that you can blacklist specific   IPS which are saved in a database, and when the filtered-ips endpoint is requested, it returns in the response the ips from the unified list without the ips you manually blacklisted. You can use either our website or our REST API endpoints to communicate with the server.</p>
  </div>

  <hr/>

  <div id="endpoints">
    <h3 align="center">⭐ Endpoints</h3>
    <b>GET</b>&nbsp;&nbsp;&nbsp;&nbsp;192.168.0.4:5555/ips <br/>

```javascript
// *** Response preview ***
{
  "ips": [...],
}
```
<br />

<b>GET</b>&nbsp;&nbsp;&nbsp;&nbsp;192.168.0.4:5555/filtered-ips <br />
```javascript
// *** Response preview ***
{
  "ips": [...],
  "blacklistedIps": [...]
}
```
<br />

<b>POST</b>&nbsp; 192.168.0.4:5555/blacklist-ip <br />

```
Request header:
  Content-Type: application/x-www-form-urlencoded

Url-encoded:
  ip: {ip}
```
```javascript
// *** Response preview ***
{
  "status": "Successfully added IP: {ip} to the blacklist"
}

OR

{
  "status": "Error: the IP: {ip} is already blacklisted"
}
```
<br />

<b>POST</b>&nbsp; 192.168.0.4:5555/unblacklist-ip

```
Request header:
  Content-Type: application/x-www-form-urlencoded

Url-encoded:
  ip: {ip}
```
```javascript
// *** Response preview ***
{
  "status": "Successfully removed IP: {ip} from the backlist."
}

OR

{
  "status": "Error: the IP: {ip} wasn't blacklisted."
}
```

  </div>

  <hr/>

  <div align="center" id="preview">
    <h3 align="center">👀 Preview</h3>
    <img width='390px' src="./front-end/src/assets/preview02.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='390px' src="./front-end/src/assets/preview01.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='390px' src="./front-end/src/assets/preview03.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='390px' src="./front-end/src/assets/preview04.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
  </div>

  <hr/>

  <div id="setup">
    <h3 align="center">💻 Setup application</h3>
    <p> :warning: It's necessary to have <a href="https://www.docker.com/" target="_blank">Docker</a> installed in your computer to be able to proceed from here! </p>
<ul><li>Instructions</li></ul>

```markdown
# Pull the docker image
$ docker pull tiagosansao/tor-ip-list:latest

# Clone the repository
$ git clone https://github.com/TiagoSansao/tor-ip-list.git

# Go to the repository's folder
$ cd ./tor-ip-list

# Go to the back-end folder
$ cd ./back-end

# Run the docker image
$ docker run -p 5555:5555 tiagosansao/tor-ip-list
```

  <p>In the back-end directory, create an file named ".env", write it following this structure, remember that you will have to create your own MongoDB database in order to put your connect credentials.</p>

```markdown
PORT=5555
MONGOOSE_URI=mongodb+srv://{name}:{password}@cluster0.adurt.mongodb.net/devforum?retryWrites=true&w=majority
```

  </div>

  <hr/>

  <div id="Dependencies">
    <h3 align="center">🚀 Dependencies</h3>
    <ul>
      <li>Front-end</li>
        <ul>
          <li><a href="https://reactjs.org/">React</a></li>
          <li><a href='https://reactrouter.com/web/guides/quick-start'>React-router-dom</a></li>
          <li><a href='https://github.com/axios/axios'>Axios</a></li>
          <li><a href='https://www.typescriptlang.org/'>TypeScript</a></li>
        </ul>
      <li>Back-end</li>
      <ul>
        <li><a href='https://nodejs.org/en/'>Node.js</a></li>
        <li><a href='https://expressjs.com/'>Express</a></li>
        <li><a href='https://www.npmjs.com/package/cors'>Cors</a></li>
        <li><a href='https://www.npmjs.com/package/dotenv'>Dotenv</a></li>
        <li><a href='https://mongoosejs.com/'>Mongoose</a></li>
        <li><a href='https://github.com/axios/axios'>Axios</a></li>
      </ul>
    </ul>
  </div>

  <hr/>

  <p align="center"> 🔥 Developed by Tiago Schulz Sansão  👋  <a href="https://www.linkedin.com/in/tiago-schulz-sans%C3%A3o-9283351b7/">Check my LinkedIn</p>

</main>
