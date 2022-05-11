import { Link, useLocation } from "react-router-dom";
import "./main.scss";
import { ReactComponent as LogoSmall } from "assets/svg/logo-small.svg";
import { LoginSignupForm } from "./login-signup-form";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
export const AuthenticationPage = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <main className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__frame">
          <div className="auth-page__wrapper">
            <div className="auth-page__logo">
              <Link to="/">
                <LogoSmall />
              </Link>
            </div>
            <div className="auth-page__content">
              {pathname === "/signin" ? (
                <>
                  <LoginSignupForm />
                  <div className="separator">
                    <div className="middle_separator">OR</div>
                  </div>
                  <LoginForm />
                </>
              ) : (
                <SignupForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
