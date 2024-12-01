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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Avatar URL"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            {isSignIn ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isSignIn ? 'Register here' : 'Login here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
