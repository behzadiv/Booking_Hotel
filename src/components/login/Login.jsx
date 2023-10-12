const Login = () => {
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="email">Email : </label>
          <input type="text" name="email" id="email"/>
        </div>
        <div className="formControl">
          <label htmlFor="password">Password : </label>
          <input type="text" name="password" id="password"/>
        </div>
        <button className="btn btn--primary">login</button>
      </form>
    </div>
  );
};

export default Login;
