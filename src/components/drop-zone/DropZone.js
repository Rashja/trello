import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

/*------------------------ converter -------------------- */
async function converter(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}
/*------------------------ get base64 -------------------- */
function getBase64(props, file) {
  return converter(file).then((value) => {
    props.getFile(value);
    return value;
  });
}

function Dropzone(props) {
  /*-------------------------- state ---------------------- */
  const [files, setFiles] = useState(props.arrayOfUploadedImg || []);
  /*------------------------- drop zone ------------------- */
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg, image/jpg",
    onDrop: (acceptedFiles) => {
      const modifyFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          data: getBase64(props, file),
        })
      );
      setFiles(files.concat(modifyFiles));
    },
  });
  /*------------------------ side effect ------------------- */
  useEffect(() => {
    if (files.length > 0) {
      if (props.justOne) {
        setFiles([]);
      }
      const img = document.getElementById("imageProfile");
      img.src = files[0].preview;
    }
  }, [files]);
  /*------------------------------------------------------- */
  return (
    <>
      <div {...getRootProps()}>
        <input
          {...getInputProps()}
          style={{ display: "none" }}
          id="inputFile"
          type="file"
        />
      </div>
      <label htmlFor="inputFile">
        <img
          id="imageProfile"
          src={props.updatePic ? props.updatePic : props.defaultPhoto}
          style={{ width: "100px", height: "100px" }}
          alt="Image preview..."
        />
      </label>
    </>
  );
}

export default Dropzone;
