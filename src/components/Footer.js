import React from 'react';

function Footer() {
  let year = new Date().getFullYear();

  if (year !== 2023) {
    year = `2023 - ${year}`;
  }

  return (
    <footer className="footer">
      <p className="footer__credits">© {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;