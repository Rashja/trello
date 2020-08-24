import baseReducer from "./baseReducer";
import * as todosActions from "../actions/todos";

/**
 * @param todos --> object[]
 * @param fetched --> boolean --> for api calls just once
 * @param status -->{status:boolean}[] -->for creating cards
 */
/*------------------------ initial states ------------------- */
export const initialState = {
  todos: [],
  fetched: false,
  statuses: [{ status: "open" }, { status: "todo" }],
};

const todo = baseReducer(initialState, {
  /*---------------- get todo items from api ---------------- */
  [todosActions.GET_TODOS](state, action) {
    return { ...state, fetched: true, todos: action.payload };
  },
  /*------------------------ add new item ------------------- */
  [todosActions.ADD_NEW_ITEM](state, action) {
    return { ...state, todos: [action.payload, ...state.todos] };
  },
  /*------------------------- save item --------------------- */
  [todosActions.SAVE_ITEM](state, action) {
    const editedTodos = [...action.payload];
    return {
      ...state,
      todos: editedTodos,
    };
  },
  /*----------------------- delete board ------------------- */
  [todosActions.DELETE_BOARD](state, action) {
    return {
      ...state,
      statuses: state.statuses.filter((s) => s.status !== action.payload),
      todos: state.todos.filter((td) => td.status !== action.payload),
    };
  },
  /*---------------------- add new board ------------------- */
  [todosActions.ADD_NEW_BOARD](state, action) {
    return {
      ...state,
      statuses: [...state.statuses, action.payload],
    };
  },
  /*-------------------- change item status ---------------- */
  [todosActions.CHANGE_ITEM_STATUS](state, action) {
    return {
      ...state,
      todos: state.todos.map((td) => {
        if (td.id === action.payload.item.id) {
          td.status = action.payload.status;
          return td;
        }
        return td;
      }),
    };
  },
});

export default todo;
