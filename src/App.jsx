
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MyRoutes from './routes/routes';
import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import styled from 'styled-components';

const App = () => {

  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'; // Esto asume que has guardado 'true' o 'false' en localStorage
  const userType = localStorage.getItem('userType');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <BrowserRouter>
        {/*<Container className={sidebarOpen ? "sidebarState active" : ""}>
          {isLoggedIn && (<>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </>)}*/}
          <Navbar isLoggedIn={isLoggedIn} userType={userType} />
          <MyRoutes isLoggedIn={isLoggedIn} userType={userType} />
        {/*</Container>*/}
      </BrowserRouter>
    </>
  );
};
const Container = styled.div`
  display:grid;
  grid-template-columns:70px auto;
  background:white;
  {/*el & representa "sidebarState"*/}
  &.active{
    grid-template-columns:200px auto
  }
`;
export default App;
