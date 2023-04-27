export async function uploadImg(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

  const url = process.env.REACT_APP_CLOUDINARY_URL;
  let result = await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => data.url);
  return result;
}
