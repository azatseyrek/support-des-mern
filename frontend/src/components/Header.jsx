import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {logout, reset} from '../redux/auth/authSlice';
import {toast} from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  get user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  const message = 'Logut successful';

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success(message, {
      hideProgressBar: true,
    });
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                <span>Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
