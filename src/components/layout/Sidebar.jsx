import styled from "styled-components";
import CurrentUser from "./NavbarComponents/CurrentUser";
import { MenuOutlined,AimOutlined } from '@ant-design/icons';


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Container isOpen={sidebarOpen}>
      <button className="SidebarButton">
        <AimOutlined/>
      </button>
      <div className="sidebarContent">
        <div className="userContent">
          <CurrentUser />
        </div>
        <h2>
          sajho
        </h2>

      </div>
    </Container>
  )
}

const Container = styled.div`
  color: gray;
  background: pink;
  position:sticky;
  padding-top:20px;
  .SidebarButton{
    position:absolute;
    top:48px;
    right:-0px;
    width:32px;
    height:32px;
    border-radius:50%;
    background:white;
    box-shadow:0 0 4px 
  }

  .sidebarContent{
  display:flex;
  justify-content:center;
  align-items:center;
  padding-bottom:24px;
  
    .userContent{
      display:flex;
      user{
        max-width:100%;
        height:auto;
      }
        cursor:pointer;
        transition:all 0.3s;
        transform:${({})}
    }
      h2{
        display:${({ isOpen }) => (!isOpen ? `none` : `block`)};
      } 
  }


`;

export default Sidebar