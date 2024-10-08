import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MyRoutes from './routes/Routes'; //modifique esto a Routes de routes
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';


const AppContent = () => {
  const { isLoggedIn, sidebarOpen, setSidebarOpen } = useAuth();

  return (
    <UserProvider>
      <div className="flex h-screen bg-white-100 transition-all duration-300">
        {isLoggedIn && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <Navbar />
          <div className="pt-16">
            <MyRoutes />
          </div>
        </div>
      </div>
    </UserProvider >
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
