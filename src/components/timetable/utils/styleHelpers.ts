/**
 * Style calculation utilities for events
 */
export const getEventStyle = (type?: string, hasShow?: boolean): string => {
  // Add a special class for events with dance shows
  const showClass = hasShow ? "border-2 border-bes-purple" : "";

  // Always use rounded corners for all events
  const borderRadiusClass = "rounded-full";

  // Base style depending on event type
  let baseStyle = "";
  switch (type) {
    case "dance-show":
      baseStyle = `bg-bes-purple hover:bg-bes-purple/90 ${showClass}`;
      break;
    case "workshop":
      baseStyle = `bg-bes-red hover:bg-bes-red/90 ${showClass}`;
      break;
    case "talk":
      baseStyle = `bg-bes-red hover:bg-bes-red/90 ${showClass}`;
      break;
    case "main":
      baseStyle = `bg-bes-red hover:bg-bes-red/90 ${showClass}`;
      break;
    default:
      baseStyle = `bg-transparent ${showClass}`;
      break;
  }

  return `${baseStyle} ${borderRadiusClass}`;
};
