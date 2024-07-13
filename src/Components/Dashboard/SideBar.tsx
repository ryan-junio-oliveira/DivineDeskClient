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
            <NavLink to="/dashboard" title='Página inicial' className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin" title='Área administrativa' className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="lock">Adiministrador</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/members" title='Membros' className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="user">Membros</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/treasury" title='Tesouraria' className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="table">Tesouraria</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/storage" title='Almoxarifado' className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="archive">Almoxarifado</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/events" title='Eventos' target="_blank" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="exclamation-circle">Eventos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/bible-school" title='Escola biblica Dominical' target="_blank" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="graduation-cap">EBD</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/musics" title='Músicas e Hinos' target="_blank" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="music">Músicas e Hinos</CDBSidebarMenuItem>
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
              <Dropdown.Item href="#">Meu Perfil</Dropdown.Item>
              <Dropdown.Item href="#">Configurações</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </CDBSidebarFooter>

      </CDBSidebar>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/members" element={<Members />} />
        <Route path="/treasury" element={<Treasury />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/hero404" element={<Hero404 />} />
      </Routes>
    </div>
  );
};

//Conteudo do container vai ser referenciado aqui
const Dashboard: React.FC = () => <div></div>;
const Admin: React.FC = () => <div></div>;
const Members: React.FC = () => <div></div>;
const Treasury: React.FC = () => <div></div>;
const Storage: React.FC = () => <div></div>;
const Hero404: React.FC = () => <div></div>;

export default Sidebar;
