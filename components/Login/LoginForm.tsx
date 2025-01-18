import { loginCred } from "@/actions/auth";


const LoginForm = () => {
  
  return (
    <div>
      <form action={loginCred} className="login-form">
        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="input"
          />
        </div>
        <button type="submit" className="button">Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
