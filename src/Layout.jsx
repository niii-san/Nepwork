import { Outlet } from "react-router";
import { NavBar, Footer } from "./components";

function Layout() {
    return (<>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>);
}

export default Layout;
