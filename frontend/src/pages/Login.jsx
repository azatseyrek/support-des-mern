import {useState} from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {login} from '../redux/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.auth);

  const {user, isError, isSuccess, isLoading, message} = userState;

  const {email, password} = formData;

  const onChange = (e) => {
    // setFormData({...formData, [e.target.id]: e.target.value});
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '' || email === '') {
      toast.warning('Please fill in all fields');
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="E-mail"
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            ></input>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
