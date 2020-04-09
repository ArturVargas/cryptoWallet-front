import React from 'react';
import Identicon from 'react-identicons';

const Avatar = ({ account }) => (
  <Identicon string={account} size={35}/>
);

export default Avatar;