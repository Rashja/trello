/*----------------------- get todo --------------------- */
export const GET_TODOS = "GET_TODOS";

export const getTodos = (items) => ({
  type: GET_TODOS,
  payload: items,
});
/*----------------- chanage item status ---------------- */
export const CHANGE_ITEM_STATUS = "CHANGE_ITEM_STATUS";

export const changeItemStatus = (item, status) => ({
  type: CHANGE_ITEM_STATUS,
  payload: {
    item,
    status,
  },
});
/*---------------------- add new item ------------------ */
export const ADD_NEW_ITEM = "ADD_NEW_ITEM";

export const addNewItem = (item) => ({
  type: ADD_NEW_ITEM,
  payload: item,
});
/*---------------------- save item --------------------- */
export const SAVE_ITEM = "SAVE_ITEM";

export const saveItem = (item) => ({
  type: SAVE_ITEM,
  payload: item,
});
/*-------------------- add new board ------------------- */
export const ADD_NEW_BOARD = "ADD_NEW_BOARD";

export const addNewBoard = (status) => ({
  type: ADD_NEW_BOARD,
  payload: status,
});
/*--------------------- delete board ------------------- */
export const DELETE_BOARD = "DELETE_BOARD";

export const deleteBoard = (status) => ({
  type: DELETE_BOARD,
  payload: status,
});
