import React from 'react';

export const Loader = ({ className = '' }): JSX.Element => (
  <div className={`custom-loader ${className}`}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
