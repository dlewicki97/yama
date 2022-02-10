(function () {
  let carousel = document.querySelector(".custom-carousel");

  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let move = false;

  let mouseDownHandler = (e) => {
    move = true;
    carousel.style.cursor = "grabbing";
    carousel.style.userSelect = "none";
    pos = {
      left: carousel.scrollLeft,
      top: carousel.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
    carousel.addEventListener("mousemove", mouseMoveHandler);
    carousel.addEventListener("mouseup", mouseUpHandler);
  };
  let mouseMoveHandler = (e) => {
    if (!move) return;
    const dx = e.clientX - pos.x;
    let scroll = pos.left - dx;

    carousel.scrollLeft = scroll;
  };
  let mouseUpHandler = (e) => {
    carousel.style.cursor = "grab";
    carousel.style.removeProperty("user-select");
    move = false;
  };

  carousel.addEventListener("mousedown", mouseDownHandler);
})();
