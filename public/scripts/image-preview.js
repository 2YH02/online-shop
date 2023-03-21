const imagePickerElement = document.querySelector(
  "#image-upload-control input"
);
const imagepreviewElement = document.querySelector("#image-upload-control img");

function updateImagePreview() {
  const files = imagePickerElement.files;

  if (!files || files.length === 0) {
    imagepreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagepreviewElement.src = URL.createObjectURL(pickedFile);
  imagepreviewElement.style.display = "block";
}

imagePickerElement.addEventListener("change", updateImagePreview);
