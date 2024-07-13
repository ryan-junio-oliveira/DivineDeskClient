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
import Dropdown from 'react-bootstrap/Dropdown';

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
        maxWidth="12rem"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none d-flex align-items-center" style={{ color: 'inherit' }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/logo.png`}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/members" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="user">Members</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/treasury" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="table">Treasury</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/hero404" target="_blank" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="d-flex align-items-center mb-2">
          <Dropdown>
            <Dropdown.Toggle className='bg-transparent border-0 shadow-none' variant="secondary" id="dropdown-basic">
              <img
                src="https://github.com/mdo.png"
                alt="User Avatar"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">My Profile</Dropdown.Item>
              <Dropdown.Item href="#">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </CDBSidebarFooter>

      </CDBSidebar>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/treasury" element={<Treasury />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/hero404" element={<Hero404 />} />
      </Routes>
    </div>
  );
};

//Conteudo do container vai ser referenciado aqui
const Dashboard: React.FC = () => <div></div>;
const Members: React.FC = () => <div></div>;
const Treasury: React.FC = () => <div></div>;
const Analytics: React.FC = () => <div></div>;
const Hero404: React.FC = () => <div></div>;

export default Sidebar;
