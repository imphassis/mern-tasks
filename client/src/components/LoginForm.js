import React from 'react';
import PropTypes from 'prop-types';

export default function LoginForm(props) {
  const { handleSubmit, handleChange, handleDisabled } = props;

  return (
    <form className="w-25 login-form " onSubmit={ (e) => handleSubmit(e) }>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email address
          <input
            onChange={ (e) => handleChange(e) }
            name="email"
            data-testid="email-input"
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">
          Password
          <input
            onChange={ (e) => handleChange(e) }
            name="password"
            data-testid="password-input"
            type="password"
            className="form-control"
            id="inputPassword"
          />
        </label>
      </div>
      <button disabled={ handleDisabled() } type="submit" className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDisabled: PropTypes.func.isRequired,
};
