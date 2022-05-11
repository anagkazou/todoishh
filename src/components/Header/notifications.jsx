import featherIcon from "../../assets/svg/feather-sprite.svg";
import { ReactComponent as NotificationIcon } from "assets/svg/notification.svg";
export const Notifications = () => {
  return (
    <div className="notification_button header-clickable">
      <NotificationIcon strokeWidth={.1} />
    </div>
  );
};
