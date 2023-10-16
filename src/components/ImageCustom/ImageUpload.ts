import { POST } from "@/app/app/file/route";
import { useState } from "react";

const ImageUploads = ({ image }) => {
  const [rest, setResult] = useState();
  const formData = new FormData();
  formData.append("file", image);
  formData.append("uploadss", "uploads");
  formData.append("cloud_name", "db6qhze3s");
  fetch("https://api.cloudinary.com/v1_1/db6qhze3s/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => setResult(result))
    .catch((eror) => console.log(eror));
  console.log(rest);
  return rest;
};
export const ImageFileUploads = {
  ImageUploads,
};
