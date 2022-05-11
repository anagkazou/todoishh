import "./main.scss";
import "./light.scss";
import { HomeButton } from "./home";
import { HamburgerButton } from "./hamburger";
import { Avatar } from "./avatar";
import { Github } from "./github";
import { Notifications } from "./notifications";
import { QuickAddTask } from "./quick-add-task";
export const Header = (props) => {
  return (
    <div className="header">
      <div className="header__left">
        <HamburgerButton onClick={props.onClick} />
        <HomeButton />
      </div>
      <div className="header__right">
        <QuickAddTask />
        {/* //Todo: change component name from github to info */}
        <Github />
        <Notifications />
        <Avatar />
      </div>
    </div>
  );
};
