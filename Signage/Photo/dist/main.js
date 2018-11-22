"use strict";

const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const width = 960;
const height = 720;
const constraints = window.constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  const video = document.querySelector("video");
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === "ConstraintNotSatisfiedError") {
    let v = constraints.video;
    console.log(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === "PermissionDeniedError") {
    console.log("Permissions have not been granted to use your camera and " + "microphone, you need to allow the page access to your devices in " + "order for the demo to work.");
  }

  console.log(`getUserMedia error: ${error.name}`, error);
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

const takepicture = () => {
  const context = canvas.getContext("2d");

  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  } else {
    clearphoto();
  }
};

document.querySelector("#showVideo").addEventListener("click", e => {
  init(e);
});
document.querySelector("#takePicture").addEventListener("click", e => {
  takepicture();
  e.preventDefault();
});