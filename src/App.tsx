import { Routes, Route } from 'react-router-dom';
import MainLayout from './features/common/layouts/Main.layout';
import Post from './features/post/pages/Post';
import Auth from './features/auth/pages/Auth';
import { selectTheme } from './features/common/slice/themeSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { authApi } from './features/auth/api/authApi';
import CreateCategory from './features/category/pages/CreateCategory';
import ProtectedRoute from './features/Protected/ProtectedRoute';
import UnAuthorized from './features/common/pages/UnAuthorized';

function App() {
  const { dark } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authApi.endpoints.me.initiate());
  }, [dispatch]);

  return (
    <div className={`App ${dark ? 'dark' : ''}`}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Post />} />
          <Route path="auth" element={<Auth />} caseSensitive={false} />
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route element={<ProtectedRoute allowedRoles={['author']} />}>
            <Route path="create-category" element={<CreateCategory />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
