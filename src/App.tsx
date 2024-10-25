import { Routes, Route } from 'react-router-dom';
import MainLayout from './features/common/layouts/Main.layout';
import Post from './features/post/pages/Post';
import Auth from './features/auth/pages/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Post />} />
          <Route path="auth" element={<Auth />} caseSensitive={false} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
