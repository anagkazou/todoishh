import featherIcon from "../../../../../assets/svg/feather-sprite.svg";

export const SetNewTaskImportant = ({ important, setImportant }) => {
  return (
    <div role="button" className="set-new-task__important" onClick={() => setImportant(!important)}>
      <div className="set-new-task__label">
        <svg
          width="19"
          height="19"
          fill={important ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <use href={`${featherIcon}#star`}></use>
        </svg>
      </div>
    </div>
  );
};
