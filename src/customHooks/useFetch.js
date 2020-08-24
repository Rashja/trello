import { useState, useEffect } from "react";
import useRedux from "../customHooks/useRedux";
import { showToastify } from "../actions/base";

/**
 *
 * @param {string} url
 * @param {object} options
 */

const UseFetch = (url, options) => {
  /*----------------------- use redux ------------------- */
  const { fetched, dispatch } = useRedux();
  /*------------------------ states --------------------- */
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  /*--------------------- side effects ------------------ */
  useEffect(() => {
    const getFetch = async () => {
      //start loading
      setLoading(true);
      try {
        const res = await fetch(`${url}`, options);
        //success if we get status code 200
        if (res.status === 200) {
          const json = await res.json();
          setResponse(json);
          //end loading
          setLoading(false);
        } else {
          //end loading
          setLoading(false);
          dispatch(
            showToastify(
              `something went wrong,Code Error${res.status}`,
              "error"
            )
          );
        }
      } catch (err) {
        // end loading if we catch an error
        setLoading(false);
        setError(err);
        dispatch(showToastify("something went wrong", "error"));
      }
    };
    // checked internet connection
    if (navigator.onLine) {
      //with fetched we prevent the extra api calls
      if (!fetched) {
        //start api proccess
        getFetch();
      }
    } else {
      dispatch(showToastify("Reconnect Your Net and Try Again", "error"));
    }
  }, []);
  /*----------------------------------------------------- */
  return {
    response,
    error,
    isLoading,
  };
};

export default UseFetch;
