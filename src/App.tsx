import { Routes, Route } from 'react-router-dom';
import MainLayout from './features/common/layouts/Main.layout';
import Post from './features/post/pages/Post';
import Auth from './features/auth/pages/Auth';
import { selectTheme } from './features/common/slice/themeSlice';
import { useAppSelector } from './app/hooks';

function App() {
  const { dark } = useAppSelector(selectTheme);
  return (
    <div className={`App ${dark ? 'dark' : ''}`}>
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
