import featherIcons from "assets/svg/feather-sprite.svg";
export const FeatherIcons = ({ id, width, height, strokeWidth, stroke, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use href={`${featherIcons}#${id}`}></use>
    </svg>
  );
};
