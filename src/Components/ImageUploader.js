import React from "react";
import ImageUploader from "react-images-upload";

const App = ({ pictures, setPictures }) => {
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };
  return (
    <ImageUploader
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      singleImage={true}
      withPreview={true}
    />
  );
};

export default App;
