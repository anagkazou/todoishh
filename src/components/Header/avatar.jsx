import { useOverlayContextValue } from "context/overlay-context";
import { useAuth } from "hooks";
export const Avatar = () => {
  // const currentUser = JSON.parse(localStorage.getItem("userData"));
  const { currentUser } = useAuth();
  const userDisplayName = currentUser?.displayName?.replace(" ", "+");

  const { setShowDialog, setDialogProps } = useOverlayContextValue();

  const userOptionsTrigger = (event, elementPosition) => {
    event.stopPropagation();
    setShowDialog("USER_OPTIONS");

    setDialogProps({ elementPosition });
  };
  return (
    <div className="avatar" onClick={(event) => userOptionsTrigger(event, event.currentTarget.getBoundingClientRect())}>
      {currentUser && (
        <img
          className="avatar__img"
          src={`https://ui-avatars.com/api/?name=${userDisplayName}&rounded=true&size=24&background=ffffff`}
          alt="displayName"
        />
      )}
    </div>
  );
};
