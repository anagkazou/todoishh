import featherIcon from "assets/svg/feather-sprite.svg";
import { useOverlayContextValue } from "context/overlay-context";
import { useProjects } from "hooks";
import { useState } from "react";
import { CustomProject } from "./custom-project";
export const CustomProjects = () => {
  const { projects } = useProjects();
  const [showProjects, setShowProjects] = useState(true);
  const { showDialog, setShowDialog, dialogProps, setDialogProps } = useOverlayContextValue();

  return (
    <div className="custom-project-group__wrapper">
      <div className="custom-project-group__title-group" onClick={() => setShowProjects(!showProjects)}>
        <div className="custom-project-group__icon" style={{ transform: `rotate(${showProjects ? 0 : -90}deg)` }}>
          <svg width="24" height="24" fill="none" stroke="#777777" strokeWidth="1px">
            <use href={`${featherIcon}#chevron-down`}></use>
          </svg>
        </div>

        <div className="custom-project-group__name">Projects</div>

        <button
          className="custom-project-group__add-project"
          onClick={(event) => {
            event.stopPropagation();
            setShowDialog("ADD_PROJECT");
          }}
        >
          <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <use xlinkHref={`${featherIcon}#plus`}></use>
          </svg>
        </button>
      </div>
      {showProjects && (
        <div className="custom-projects" style={{ height: `${showProjects ? "100%" : "0%"}` }}>
          {projects.map((project) => (
            <CustomProject key={project.projectId} project={project} />
          ))}
          <div className="add-project__container"></div>
        </div>
      )}
    </div>
  );
};
