import React from 'react';

const Header = ({ balance }) => (
  <div className="container-fluid my-5">
    <div className="row">
      <img
        src="https://i.dlpng.com/static/png/6984389_thumb.png"
        className="img-fluid mx-auto d-block" alt="Responsive"
        height="auto"
        width="250"
      />
    </div>
    <div className="text-center my-2">
      <h3 className="text-muted">
        DAY WALLET
      </h3>
      <p className="h5"> Balance: {balance} DAY's</p>
    </div>
  </div>
);

export default Header;