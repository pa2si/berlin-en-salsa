/**
 * Style calculation utilities for events
 */
export const getEventStyle = (type?: string): string => {
  // Use an in-between radius (softer than md/lg, less pill-like than full).
  const borderRadiusClass = "rounded-xl";

  // Base style depending on event type
  let baseStyle = "";
  switch (type) {
    case "dance-show":
      baseStyle = `bg-bes-purple hover:bg-bes-purple/90`;
      break;
    case "dance-area":
    case "workshop":
      baseStyle = `bg-bes-red hover:bg-bes-red/90`;
      break;
    case "talk":
      baseStyle = `bg-bes-red hover:bg-bes-red/90`;
      break;
    case "main":
      baseStyle = `bg-bes-red hover:bg-bes-red/90`;
      break;
    default:
      baseStyle = `bg-transparent`;
      break;
  }

  return `${baseStyle} ${borderRadiusClass}`;
};
