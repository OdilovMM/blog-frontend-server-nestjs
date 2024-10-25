import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <section className="container">
          <Outlet />
        </section>
        <aside className="sidebar">
          <Sidebar />
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
