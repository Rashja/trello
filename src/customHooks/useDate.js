function useDate() {
  /*------------------------ call new date ------------------- */
  var today = new Date();
  /*-------------------- create day month year --------------- */
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  /*---------------------------------------------------------- */
  return {
    today,
  };
}

export default useDate;
