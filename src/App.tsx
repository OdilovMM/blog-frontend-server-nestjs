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
import CreateTag from './features/tag/pages/CreateTag';
import UpdateUserRoles from './features/auth/pages/UpdateUserRoles';
import CreatePost from './features/post/pages/CreatePost';
import ApprovePosts from './features/post/pages/ApprovePosts';
import Search from './features/post/pages/Search';

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
          <Route path="search" element={<Search />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="users/role" element={<UpdateUserRoles />} />
            <Route path="approve" element={<ApprovePosts />} />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={['author', 'admin']} />}
          >
            <Route path="create-tag" element={<CreateTag />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['author']} />}>
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
