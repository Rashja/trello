import React, { useEffect } from "react";
import UseFetch from "../customHooks/useFetch";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoApp from "../components/todo-app/TodoApp";
import useRedux from "../customHooks/useRedux";
import { getTodos } from "../actions/todos";
import useDate from "../customHooks/useDate";
import { ToastContainer } from "react-toastify";
import Loading from "../components/loader/Loader";

function App() {
  /*--------------------------- useRedux ------------------------*/
  const { dispatch, fetched } = useRedux();
  /*---------------------------- useDate ------------------------*/
  const { today } = useDate();
  /*-------------------------- fetch api -------------------------*/
  const { response, error, isLoading } = UseFetch(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  /*-------------------------- side effect ------------------------*/
  useEffect(() => {
    //with fetched we prevent the extra api calls
    if (!fetched) {
      if (response !== null) {
        //customized data
        const todos = response.map((item) => {
          item.created = today;
          item.status = "todo";
          delete item.completed;
          return item;
        });
        dispatch(getTodos(todos));
      }
    }
  }, [response, fetched]);
  /*------------------------------------------------------------*/
  return (
    <>
      {isLoading && <Loading />}
      <DndProvider backend={HTML5Backend}>
        <ToastContainer closeButton={false} style={{ fontSize: "19px" }} />
        <TodoApp />
      </DndProvider>
    </>
  );
}

export default App;
