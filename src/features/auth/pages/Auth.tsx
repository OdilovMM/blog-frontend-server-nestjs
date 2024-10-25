import React from 'react';
import SignInSignUp from '../components/SignInSignUp';

const handleSignIn = async (email: string, password: string) => {};

const handleSignUp = async (
  name: string,
  email: string,
  password: string,
  avatar: string
) => {};

const Auth = () => {
  return (
    <div className="auth">
      <SignInSignUp onSignIn={handleSignIn} onSignUp={handleSignUp} />
    </div>
  );
};

export default Auth;
