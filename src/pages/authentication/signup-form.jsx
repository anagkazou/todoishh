import { ReactComponent as EyeOpen } from "assets/svg/eye-off.svg";
import { ReactComponent as EyeClosed } from "assets/svg/eye-on.svg";
import { FeatherIcons } from "assets/svg/feather-icons";
import featherIcon from "assets/svg/feather-sprite.svg";
import { Spinner } from "components/Spinner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "_firebase";
import { LoginSignupForm } from "./login-signup-form";

export const SignupForm = () => {
  const [inStepTwo, setInStepTwo] = useState(false);
  const [inStepOne, setInStepOne] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "", name: "" });
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [nameHasError, setNameHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [globalErrorMessage, setGlobalErrorMessage] = useState("");

  const { signupWithEmail } = useAuth();

  const onChangeHandler = (event) => {
    event.preventDefault();
    setEmailIsValid(true);
    if (event.target.name == "password") {
      setPasswordHasError(false);
    } else {
      setNameHasError(false);
    }
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const verifyEmail = async (event) => {
    event?.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(formState.email)) {
      setEmailIsValid(true);
      setLoading(true);
      const userRef = query(collection(db, "user"), where("email", "==", formState.email));
      const userSnap = await getDocs(userRef);
      if (userSnap.metadata.fromCache) {
        setEmailIsValid(false);
        setLoading(false);
        setErrorMessage("Temporary error, try again later");
        setGlobalErrorMessage("Temporary error, try again later");
        return;
      }
      if (!userSnap.empty) {
        setEmailIsValid(false);
        setErrorMessage("Your email is already registered with us");
        setGlobalErrorMessage("Your email is already registered with us");
        setLoading(false);
      } else {
        setLoading(false);
        setInStepOne(false);
        setInStepTwo(true);
      }
    } else {
      setEmailIsValid(false);
      setErrorMessage("Your email isn't valid");
      setGlobalErrorMessage("Your email isn't valid");
    }
  };

  const signUpWithEmailAddress = async (event) => {
    event.preventDefault();
    verifyEmail();

    if (!formState.name.length) {
      setNameHasError(true);
    }
    if (formState.password.length < 8) {
      setPasswordHasError(true);
      return;
    }

    signupWithEmail(formState);
  };

  const backlinkHandler = (event) => {
    event.preventDefault();
    setInStepTwo(false);
    setInStepOne(true);
  };

  return (
    <div className={`signup ${inStepTwo ? "in_step_two" : ""}${inStepOne ? "in_step_one" : ""}`}>
      <div className="signup__wrapper">
        <div className="step_one">
          <LoginSignupForm />

          <div className="separator">
            <div className="middle_separator">OR</div>
          </div>
          <form className="signup-form">
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>
              {!emailIsValid && (
                <div className="error-message">
                  <FeatherIcons
                    id="alert-circle"
                    width={20}
                    height={20}
                    fill="#db4c3f"
                    stroke={"#fff"}
                    strokeWidth={2}
                    currentColor={"#fff"}
                  />
                  {errorMessage}
                </div>
              )}
              <input
                type="email"
                value={formState.email}
                name="email"
                id="email"
                autoComplete="off"
                className={!emailIsValid ? "has-error" : ""}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>

            <button className="auth-button submit-button" disabled={loading ? true : false} onClick={(event) => verifyEmail(event)}>
              Sign up with Email
              {loading && <Spinner light />}
            </button>

            <hr />

            <p>
              Already sign up? <Link to="/signin">Go to login</Link>
            </p>
          </form>
        </div>

        <div className="step_two">
          <a className="backlink" onClick={(event) => backlinkHandler(event)}>
            <svg className="" width="16" height="16" stroke="#000" fill="none">
              <use href={`${featherIcon}#chevron-left`}></use>
            </svg>
            <span className="backlink__text">{formState.email}</span>
          </a>
          <h1>Almost there</h1>
          <form className="signup-form">
            <div className="field">
              <label htmlFor="name" className="label">
                Your name
              </label>
              {nameHasError && (
                <div className="error-message">
                  <FeatherIcons
                    id="alert-circle"
                    width={20}
                    height={20}
                    fill="#db4c3f"
                    stroke={"#fff"}
                    strokeWidth={2}
                    currentColor={"#fff"}
                  />
                  Full name can't be empty
                </div>
              )}
              <input
                value={formState.name}
                autoComplete="off"
                type="name"
                name="name"
                id="name"
                className={`${nameHasError ? "has-error" : ""}`}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              {passwordHasError && (
                <div className="error-message">
                  <FeatherIcons
                    id="alert-circle"
                    width={20}
                    height={20}
                    fill="#db4c3f"
                    stroke={"#fff"}
                    strokeWidth={2}
                    currentColor={"#fff"}
                  />
                  Password must be at least 8 characters long{" "}
                </div>
              )}
              <div className="toggle_password">
                <input
                  className={` form_field_control ${passwordHasError ? "has-error" : ""}`}
                  value={formState.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(event) => onChangeHandler(event)}
                />
                <span className="toggle" role="checkbox" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </span>
              </div>
            </div>
            <div className="hint-text">Your password must be at least 8 characters long. Avoid common words or patterns.</div>
            <button className="auth-button submit-button" disabled={false} onClick={(event) => signUpWithEmailAddress(event)}>
              Sign up now
              {loading && <Spinner light />}
            </button>

            <hr />

            <p>
              Already sign up? <Link to="/signin">Go to login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
