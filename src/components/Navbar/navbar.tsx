import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { LOGOUT } from 'graphql/mutations';
import logout_icon from 'assets/icons/logout.svg';
import list from 'assets/icons/list.svg';
import calendar from 'assets/icons/calendar.svg';
import eye from 'assets/icons/eye.svg';
import './navbar.sass';

const Navbar: React.FC = () => {
  const [render, setRender] = useState<boolean>(false);
  const router = useHistory();

  const token: string | null = sessionStorage.getItem('token');
  const [logout] = useMutation(LOGOUT);

  const onClick: Function = (to: string) => {
    switch (to) {
      case 'login': {
        logout({});
        setTimeout(() => {
          sessionStorage.removeItem('token');
          router.push('/');
        }, 1);
        break;
      }
      default: {
        router.push(`/${to}`);
        break;
      }
    }
  };

  // If navbar is expanded, the paragraph will be rendered
  const onMouseOver = () => setTimeout(() => setRender(true), 201);
  // If navbar is hidden, the paragraph will be unrendered
  const onMouseLeave = () => setTimeout(() => setRender(false), 202);

  const RenderIcon = () => {
    return token ? (
      <>
        <div className="navbar-icons">
          <div className="menu">
            <div className="icon" onClick={() => onClick('calendarSurgeries')}>
              <img src={calendar} alt="home" />
              {render && <p>Inicio</p>}
            </div>
            <div className="icon" onClick={() => onClick('surgeriesList')}>
              <img src={list} alt="list" />
              {render && <p>Cirugias pendientes</p>}
            </div>
          </div>
          <div className="logout" onClick={() => onClick('login')}>
            <img className="icon" src={logout_icon} alt="logout" />
            {render && <p>Cerrar sesión</p>}
          </div>
        </div>
      </>
    ) : (
      <></>
    );
  };

  return (
    <div className="navbar" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <img className="logo" src={eye} alt="Logo" />
      <div className="log">
        <RenderIcon />
      </div>
    </div>
  );
};

export default Navbar;
