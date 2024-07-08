import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

export const DesktopView = () => {
  return (
    <main className="md:flex md:gap-4 pl-[15px] pt-[39px]">
      <section className="md:w-[350px]">
        <Sidebar />
      </section>
      <section className="md:flex-1 p-3">
        <Outlet />
      </section>
    </main>
  );
};
