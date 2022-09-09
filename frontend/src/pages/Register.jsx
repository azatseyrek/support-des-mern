import React from 'react';
import {useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../redux/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.auth);

  const {user, isError, isSuccess, isLoading, message} = userState;

  const {name, email, password, password2} = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect if registered
    if (isSuccess || user) {
      toast.success(message);
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  const onChange = (e) => {
    // setFormData({...formData, [e.target.id]: e.target.value});
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '') {
      toast.warning('Please fill in all fields');
    }
    if (password !== password2 && password !== '' && password2 !== '') {
      toast.error('Passwords do not match');
    }
    // console.log(formData);
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
            ></input>
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
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

export default Register;
