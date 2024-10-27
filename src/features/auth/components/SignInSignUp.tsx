import React, { useState } from 'react';

interface AuthPageProps {
  onSignIn: (email: string, password: string) => void;
  onSignUp: (
    name: string,
    email: string,
    password: string,
    avatar: string
  ) => void;
}

const SignInSignUp = ({ onSignIn, onSignUp }: AuthPageProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignIn) {
      onSignIn(email, password);
    } else {
      onSignUp(name, email, password, avatar);
    }
  };

  return (
    <div>
      <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {!isSignIn && (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              autoComplete="sample@gmail.com"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isSignIn && (
          <div>
            <label htmlFor="name">Avatar:</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        )}
        <button type="submit">{isSignIn ? 'Login' : 'Register'}</button>
      </form>
      <p>{isSignIn ? "Don't have an account?" : 'Already have an account?'}</p>
      <button type="button" onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? 'Register here' : 'Login here'}
      </button>
    </div>
  );
};

export default SignInSignUp;
