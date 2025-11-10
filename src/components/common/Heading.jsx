import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Heading = ({ title, highlight, subtitle, showUser = false }) => {
  const { user } = useContext(AuthContext);
  // console.log(showUser);
  return (
    <div>
      <h2 className="text-4xl font-extrabold text-gray-800 md:text-5xl text-center mb-2">
        {title} <span className="text-primary">{highlight}</span>
      </h2>
      <p className="text-center text-gray-600 mb-10 text-lg">
        {subtitle}{' '}
        {showUser && (
          <strong className="text-primary">**{user.displayName}**</strong>
        )}
      </p>
    </div>
  );
};

export default Heading;
