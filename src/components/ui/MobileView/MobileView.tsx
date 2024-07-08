import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

export const MobileView = () => {
  return (
    <>
      <main className="p-6">
        <Sidebar />
      </main>
      <Outlet />
    </>
  );
};
