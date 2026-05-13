import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function MainLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;