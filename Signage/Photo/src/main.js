const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const video = document.querySelector("video");

const width = 960;
const height = 720;
const constraints = (window.constraints = {
  audio: false,
  video: true,
});

function handleSuccess(stream) {
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === "ConstraintNotSatisfiedError") {
    let v = constraints.video;
    console.log(
      `The resolution ${v.width.exact}x${
        v.height.exact
      } px is not supported by your device.`
    );
  } else if (error.name === "PermissionDeniedError") {
    console.log(
      "Permissions have not been granted to use your camera and " +
        "microphone, you need to allow the page access to your devices in " +
        "order for the demo to work."
    );
  }
  console.log(`getUserMedia error: ${error.name}`, error);
}

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    handleError(e);
  }
}

const takepicture = async () => {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    await context.drawImage(video, 0, 0, width, height);
    const data = await canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
    await savePhoto(data);
  } else {
    clearphoto();
  }
};

const savePhoto = async base64URL => {
  $.ajax({
    url: "http://localhost:8888/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ img: base64URL }),
    success: data => {
      console.log("succes", data);
    },
    error: data => {
      console.log("Error: " + data);
    },
  });
};

init();

document.querySelector("#takePicture").addEventListener("click", e => {
  takepicture();
  e.preventDefault();
});
