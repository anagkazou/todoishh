import featherIcon from "assets/svg/feather-sprite.svg";
const colours = [
  {
    name: "Berry Red",
    hex: "#b8255f",
  },
  {
    name: "Red",
    hex: "#db4035",
  },
  {
    name: "Orange",
    hex: "#ff9933",
  },
  {
    name: "Yellow",
    hex: "#fad000",
  },
  {
    name: "Olive Green",
    hex: "#afb83b",
  },
  {
    name: "Lime Green",
    hex: "#7ecc49",
  },
  {
    name: "Green",
    hex: "#299438",
  },
  {
    name: "Mint Green",
    hex: "#6accbc",
  },
  {
    name: "Teal",
    hex: "#158fad",
  },
  {
    name: "Sky Blue",
    hex: "#14aaf5",
  },
  {
    name: "Light Blue",
    hex: "#96c3eb",
  },
  {
    name: "Blue",
    hex: "#4073ff",
  },
  {
    name: "Grape",
    hex: "#884dff",
  },
  {
    name: "Violet",
    hex: "#af38eb",
  },
  {
    name: "Lavender",
    hex: "#eb96eb",
  },
  {
    name: "Magenta",
    hex: "#e05194",
  },
  {
    name: "Salmon",
    hex: "#ff8d85",
  },
  {
    name: "Charcoal",
    hex: "#808080",
  },
  {
    name: "Grey",
    hex: "#b8b8b8",
  },
  {
    name: "Taupe",
    hex: "#ccac93",
  },
];
export const SetProjectColourDropdown = ({ setProjectColour }) => {
  return (
    <div className="add-project__set-selected-color">
      <div className="add-project__set-selected-color--option">
        <ul>
          {colours &&
            colours.map((colour) => (
              <li key={colour.name} className="add-project__colour-dropdown--option" onClick={() => setProjectColour(colour)}>
                <div className="add-project__colour-dropdown--option-color">
                  <svg className="" width="14" height="14" fill={`${colour.hex}`}>
                    <use href={`${featherIcon}#circle`}></use>
                  </svg>
                </div>

                <p className="add-project__colour-dropdown--option-name">{colour.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
