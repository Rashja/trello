import { useDispatch, useSelector } from "react-redux";
import {
  todoSelector,
  statusesSelector,
  fetchedSelector,
} from "../reducer/selectors";

const useRedux = () => {
  /*------------------------- use dispatch ------------------ */
  const dispatch = useDispatch();
  const todos = useSelector(todoSelector);
  const statuses = useSelector(statusesSelector);
  const fetched = useSelector(fetchedSelector);
  /*--------------------------------------------------------- */
  return {
    dispatch,
    todos,
    statuses,
    fetched,
  };
};

export default useRedux;
