"use strict";

$(function() {
  const canvas = document.getElementById("canvas");
  const photo = document.getElementById("photo");
  const video = document.querySelector("video");
  const width = 960;
  const height = 720;
  const constraints = (window.constraints = {
    audio: false,
    video: true,
  });
  const stamp1_image = new Image();
  stamp1_image.crossOrigin = "anonymous";
  stamp1_image.src = "assets/kanban.png";
  const stamp1 = {
    image: stamp1_image,
    x: 50,
    y: 50,
    w: 315,
    h: 200,
  };
  $(".content").append(
    ` <img src="${stamp1_image.src}" class="stamp" id="stamp1" />`
  );
  $(`#stamp1`).css({
    display: "none",
    height: stamp1.h,
    width: stamp1.w,
    "margin-top": stamp1.y,
    "margin-left": stamp1.x,
  });

  const handleSuccess = stream => {
    $(`#stamp1`).css({
      display: "",
    });
    video.srcObject = stream;
  };

  const handleError = error => {
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
  };

  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      handleError(e);
    }
  };

  const takepicture = async () => {
    const context = canvas.getContext("2d");

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      context.drawImage(stamp1.image, stamp1.x, stamp1.y, stamp1.w, stamp1.h);
      const data = canvas.toDataURL("image/png");
      savePhoto(data);
      $(".stamp").css({
        display: "none",
      });
      photo.setAttribute("src", data);
      setTimeout(() => {
        $(".stamp").css({
          display: "",
        });
        photo.setAttribute("src", "");
      }, 3000);
    } else {
      clearphoto();
    }
  };

  const savePhoto = async base64URL => {
    $.ajax({
      url: "http://localhost:8888/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        img: base64URL,
      }),
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
});
