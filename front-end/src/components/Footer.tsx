import "../styles/css/footer.css";

function Footer() {
  return (
    <footer id="footer">
      <p>Tiago Schulz Sansão &copy; 2021 - {new Date().getFullYear()}</p>
      <p>
        <a
          rel='noreferrer'
          target='_blank'
          href='https://github.com/TiagoSansao'
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}

export default Footer;