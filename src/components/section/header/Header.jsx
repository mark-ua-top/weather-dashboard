import './header.css'
import logo from '../../../img/Logo-header.png';
import user from '../../../img/user-zaglushka.png';

export const Header = () => {
    return (
        <>
            <div className="container header">
                <img className="Header-logo" src={logo} alt="Logo" />
                <ul className="Header-list">
                    <li><button className="Header-page-button">Who we are</button></li>
                    <li><button className="Header-page-button">Contacts</button></li>
                    <li><button className="Header-page-button">Menu</button></li>
                </ul>
                <button className="Header-sign-up-button">Sign Up</button>
                <img className="Header-user-image" src={user} alt="user-image" />
            </div>
        </>
    );
};
