import { ReactComponent as LogoDark } from "assets/svg/logo-mobile-dark.svg";
import { ReactComponent as Logo } from "assets/svg/logo-mobile.svg";
import { Spinner } from "components/Spinner";
import { useThemeContextValue } from "context";
import "./main.scss";
export const LoadingPage = () => {
  const { isLight } = useThemeContextValue();

  return (
    <div className={`loading-screen ${isLight ? "loading-screen__light" : "loading-screen__dark"}`}>
      {isLight ? <Logo className="logo__loading" /> : <LogoDark className="logo__loading" />}
      {isLight ? <Spinner /> : <Spinner light />}
    </div>
  );
};
