import "../styles/css/header.css";
import Logo from "../assets/icon.png"

function Header() {
  return (
    <main id="lHeader">
      <header id="header">
        <a href="/">
          <img src={Logo} alt="Logo" />
          <div id="headings">
            <h1>TOR IP LIST</h1>
            <h2>Manage your own ip list</h2>
          </div>
        </a>
        <nav id="nav">
          <a href="#main">
            <i className="fas fa-home">&nbsp;</i>
            Home
          </a>
          <a href="https://github.com/TiagoSansao/tor-ip-list/blob/master/README.md" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-book"></i>&nbsp;
            Docs
          </a>
        </nav>
      </header>
    </main>
  )
}

export default Header;

