import { useState } from "react";
import featherIcon from "../../../../assets/svg/feather-sprite.svg";
import { Label } from "./label";
export const Labels = () => {
  //   const {projects} = useProjects()
  const [showlabels, setShowlabels] = useState(true);
  return (
    <div className="custom-project-group__wrapper">
      <div className="custom-project-group__title-group" onClick={() => setShowlabels(!showlabels)}>
        <div className="custom-project-group__icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <use href={`${featherIcon}#tag`}></use>
          </svg>
        </div>

        <div className="custom-project-group__name">labels</div>
      </div>
      {showlabels && (
        <div className="custom-labels">
          {/* {labels.map((label) => <Label key ={project.id} name={project.name}/>)} */}
          <Label key="1" name="Label 1" />
        </div>
      )}
    </div>
  );
};
