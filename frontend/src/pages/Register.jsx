import React from 'react';
import {FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {name, email, password, password2} = formData;

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
    console.log(formData);
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
