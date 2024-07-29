// src/componentes/navBar/NavBar.jsx
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './NavBar.css';

export default function NavBar() {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <>
            <nav>
                <div className="container-navigation-menu-items" style={{ justifyContent: "start" }}>
                    <Link to="/">
                        <img src='https://i.imgur.com/LuUY9Oy.png' alt="TeanCherry" width={180} />
                    </Link>
                </div>
                <div className="container-navigation-menu-items" style={{ justifyContent: "end" }}>
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/projetos" className="navi-link-container">Projetos</NavLink>
                            <NavLink to="/usuarios" className="navi-link-container">Usuários</NavLink> {}
                            <button onClick={handleLogout} className="navi-link-container2">Sair</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="navi-link-container">Login</NavLink>
                            <NavLink to="/register" className="navi-link-container">Cadastro</NavLink>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
}
