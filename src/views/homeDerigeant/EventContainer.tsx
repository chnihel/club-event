import { useOutletContext } from "react-router-dom";
import AddEvent from "./addEvent";

const EventContainer = () => {
  const { searchTerm } = useOutletContext<{ searchTerm: string }>();

  return <AddEvent searchValue={searchTerm} />;
};

export default EventContainer;