import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Routes, Route } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar
        breakpoint={1200}
        textColor="#fff"
        backgroundColor=""
        className="sidebar-fixed bg-nav"
        toggled={false}
        minWidth="5rem"
        maxWidth="15rem"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/tables" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/hero404" target="_blank" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <div style={{ padding: '20px 5px' }}>User</div>
        </CDBSidebarFooter>
      </CDBSidebar>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/hero404" element={<Hero404 />} />
      </Routes>
    </div>
  );
};

//Conteudo do container vai ser referenciado aqui
const Dashboard: React.FC = () => <div></div>;
const Tables: React.FC = () => <div></div>;
const Profile: React.FC = () => <div></div>;
const Analytics: React.FC = () => <div></div>;
const Hero404: React.FC = () => <div></div>;

export default Sidebar;
