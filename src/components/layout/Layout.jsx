import Content from "./Content"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import CurrentUser from "./NavbarComponents/CurrentUser"
import Information from "../views/Information"

const Layout = () => {
  return (
    <main>
        <Navbar/> 
        <Information/>
    </main>
  )
}

export default Layout