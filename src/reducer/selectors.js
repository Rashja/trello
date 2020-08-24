import { createSelector } from "reselect";

/*----------------------------- fetched --------------------------- */
const selectFetched = ({ todo: { fetched } }) => fetched;

export const fetchedSelector = createSelector(
  selectFetched,
  (allFetched) => allFetched
);
/*----------------------------- todos --------------------------- */
const selectTodos = ({ todo: { todos } }) => todos;

export const todoSelector = createSelector(selectTodos, (allTodos) => allTodos);
/*----------------------------- status --------------------------- */
const selectStatuses = ({ todo: { statuses } }) => statuses;

export const statusesSelector = createSelector(
  selectStatuses,
  (allStatuses) => allStatuses
);
