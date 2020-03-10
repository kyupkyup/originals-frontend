import React, { useState } from "react";
import ImageUploader from "react-images-upload";

const ImageUploaderC = ({ pictures, setPictures }) => {
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };
  return (
    <ImageUploader
      withIcon={true}
      buttonText="Choose images"
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      withPreview={true}
      singleImage={true}
    />
  );
};

export default ImageUploaderC;
