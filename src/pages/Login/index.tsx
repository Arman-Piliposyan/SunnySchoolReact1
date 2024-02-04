import React, { useEffect } from 'react';

export const Login = () => {
  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  return <div>Login</div>;
};
