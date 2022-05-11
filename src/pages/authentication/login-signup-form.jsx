import GoogleLogo from "assets/svg/google.svg";
import { useLocation } from "react-router-dom";
import { useAuth } from "hooks";
export const LoginSignupForm = () => {
  const location = useLocation();
  const { pathname } = location;
  const title = pathname === "/signin" ? "Log in" : "Sign up";

  const { signinGoogle } = useAuth();

  return (
    <div className=" auth-form">
      <h1>{title}</h1>

      <button className="google-auth auth-button" onClick={(e) => signinGoogle(e)}>
        <img src={GoogleLogo} alt="" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};
