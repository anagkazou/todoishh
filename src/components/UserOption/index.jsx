import featherIcon from "assets/svg/feather-sprite.svg";
import { useThemeContextValue } from "context";
import { useAuth } from "hooks";
import "./styles/light.scss";
import "./styles/main.scss";

export const UserOptions = ({ closeOverlay, xPosition, yPosition }) => {
  const { currentUser, signout } = useAuth();
  const { displayName, email } = currentUser || {};
  const formatedDisplayName = displayName?.replace(" ", "+") || null;
  const { isLight, setIsLight } = useThemeContextValue();

  const themeToggleHandler = (event) => {
    setIsLight(!isLight);
    event.stopPropagation();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    signout();
  };

  return (
    <div className="option__overlay" onClick={(e) => closeOverlay(e)}>
      <div
        className="user-options"
        style={{ top: `${yPosition + 40}px`, right: `${window.innerWidth > 900 ? 42 : 12}px` }}
        onClick={(event) => event.stopPropagation()}
      >
        <ul className="user-options__list">
          <li className="user-options__item">
            <div className="user-info">
              <img
                src={`https://ui-avatars.com/api/?name=${formatedDisplayName}&rounded=true&size=36&background=ffffff`}
                alt="avatar"
                className="user-info__img"
              />

              <div className="user-info__content">
                <p className="user-info__name">
                  <strong>{displayName}</strong>
                </p>
                <p className="user-info__email">{email}</p>
              </div>
            </div>
          </li>
          <li className="user-options__item" onClick={(event) => themeToggleHandler(event)}>
            <svg className="user-options__icon" width="17" height="17" stroke="currentColor" fill="none" strokeWidth="1px">
              <use href={`${featherIcon}#${isLight ? "moon" : "sun"}`}></use>
            </svg>

            <div className="user-options__item--content">{`${isLight ? "Dark" : "Light"}`} Mode</div>
          </li>
          <li className="user-options__item" onClick={(e) => handleLogout(e)}>
            <svg className="user-options__icon" width="17" height="17" stroke="currentColor" fill="none" strokeWidth="1px">
              <use href={`${featherIcon}#log-out`}></use>
            </svg>

            <div className="user-options__item--content">Log Out</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
