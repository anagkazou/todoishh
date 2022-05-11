import "./main.scss";
import { useEffect } from "react";
import { ReactComponent as Logo } from "assets/svg/logo.svg";
import { ReactComponent as LogoMobile } from "assets/svg/logo-mobile.svg";
import { Link } from "react-router-dom";
import illustration from "assets/svg/landing-illustration.webp";
import { useAuth } from "hooks";
export const LandingPage = () => {
  const { currentUser } = useAuth();
  const storedUser = localStorage.getItem("userData");

  return (
    <main className="landing-page">
      <header className="intro__header">
        <nav className="intro__nav">
          <div className="intro__nav--group">
            <div className="nav-logo">
              <Logo className="logo__desktop" />
              <LogoMobile className="logo__mobile" />
            </div>
            <div className="intro__nav--group__wrapper">
              {/* <div className="nav-logo__mobile">
                  <LogoMobile />
                </div> */}
              <Link className="intro__nav--item intro__nav--link" to="/">
                Features
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
                Templates
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
                For Teams
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
                Resources
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
                Pricing
              </Link>
            </div>
          </div>
          <div className="intro__nav--group">
            <div className="intro__nav--group__wrapper">
              <Link className="intro__nav--item intro__nav--link" to="/signin">
                Log in
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
          {/* <div className="intro__nav--group">
            <ul>
              <li >Log in </li>
              <li >                <Link className="intro__nav--item intro__nav--link" to="/">Features</Link>
</li>
            </ul>
          </div> */}
        </nav>
      </header>

      <section className="section__intro">
        <div className="intro__hero">
          <h1 className="hero-text">Organize it all with todoish</h1>
          <Link to="/signin" className="intro__hero--cta">
            Get Started
          </Link>
        </div>
        <img src={illustration} className="intro__hero--illustration-1" alt="" width={1256} />
      </section>
    </main>
  );
};
