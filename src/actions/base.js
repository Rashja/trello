import { toast } from "react-toastify";

export const SHOW_TOASTIFY = "SHOW_TOASTIFY";

/*--------------------------- toastify ---------------------- */
export const showToastify = (text, mode) => {
  if (mode === "success") {
    toast.success(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toastify",
    });
  }
  if (mode === "error") {
    toast.error(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toastify",
    });
  }
  if (mode === "warning") {
    toast.warn(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toastify",
    });
  }
  if (mode === "info") {
    toast.info(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toastify",
    });
  }
  return {
    type: SHOW_TOASTIFY,
  };
};
