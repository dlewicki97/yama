const slideIndex = [];
const sliders = [];
const slide_l = [];
const speed = 8000; //time between auto slides in ms
const press = 1000; //pause for slider button press
var is_ready = true;
var qs_touchstart;
var qs_touchend;
var qs_swipe_l;
var number_of_sliders;
var timer;
var y;
var sliderclass;

function set_swipe_l() {
  return window.screen.width * 0.4;
}

function qs_get_swipe(evt) {
  qs_touchend = evt.changedTouches[0].pageX;
  var id = parseInt(this.id.substring(7), 10) - 1;
  if (Math.abs(qs_touchstart - qs_touchend) >= qs_swipe_l) {
    qs_touchstart > qs_touchend ? plusSlides(id) : minusSlides(id);
  }
}

//creates delay for automatic slideshow
function make_timer() {
  timer = setTimeout(function () {
    for (y = 0; y < number_of_sliders; y++) {
      plusSlides(y);
    }
  }, speed);
}

//reapply delay
function reset_timer() {
  is_ready = false;
  clearTimeout(timer);
  timer = setTimeout(function () {
    is_ready = true;
  }, press);
  make_timer();
}

//creates clickable dots
function make_dots(n, box, id) {
  var i;
  for (i = 0; i < n; i++) {
    box.innerHTML +=
      '<span class="dot" onclick="currentSlide(' +
      (i + 1) +
      "," +
      id +
      ')"></span>';
  }
}

//next slide
function plusSlides(id) {
  if (is_ready == true) {
    sliderclass = sliders[id].classList[0];
    if (sliderclass == "fader") {
      S_Fader((slideIndex[id] += 1), id);
    } else if (sliderclass == "mover") {
      S_Carousel((slideIndex[id] += 1), id);
    } else if (sliderclass == "rotate") {
      S_Rotate((slideIndex[id] += 1), id);
    } else if (sliderclass == "scaler") {
      S_Scaler((slideIndex[id] += 1), id);
    }
    reset_timer();
  }
}
//previous slide
function minusSlides(id) {
  if (is_ready == true) {
    sliderclass = sliders[id].classList[0];
    if (sliderclass == "fader") {
      S_Fader((slideIndex[id] -= 1), id);
    } else if (sliderclass == "mover") {
      S_Carousel((slideIndex[id] -= 1), id);
    } else if (sliderclass == "rotate") {
      S_Rotate((slideIndex[id] -= 1), id);
    } else if (sliderclass == "scaler") {
      S_Scaler((slideIndex[id] -= 1), id);
    }
    reset_timer();
  }
}
//choose slide
function currentSlide(n, id) {
  sliderclass = sliders[id].classList[0];
  if (sliderclass == "fader") {
    S_Fader((slideIndex[id] = n), id);
  } else if (sliderclass == "mover") {
    S_Carousel((slideIndex[id] = n), id);
  } else if (sliderclass == "rotate") {
    S_Rotate((slideIndex[id] = n), id);
  } else if (sliderclass == "scaler") {
    S_Scaler((slideIndex[id] = n), id);
  }
  reset_timer();
}
//make onclick event for previous button
function side_prev(box, id) {
  box.onclick = function () {
    minusSlides(id);
  };
}
//make onclick event for next button
function side_next(box, id) {
  box.onclick = function () {
    plusSlides(id);
  };
}

//initialize sliders on page load
function quavosh_slider(qs) {
  number_of_sliders = qs;
  qs_swipe_l = set_swipe_l();
  for (y = 0; y < number_of_sliders; y++) {
    sliders[y] = document.getElementById("slider-" + (y + 1));
    sliders[y].addEventListener("touchstart", function () {
      qs_touchstart = event.changedTouches[0].pageX;
    }, {passive: true});
    sliders[y].addEventListener("touchend", qs_get_swipe, {passive: true});
    slide_l[y] = sliders[y].querySelectorAll(".Slides").length;
    slideIndex[y] = 1;
    make_dots(slide_l[y], sliders[y].querySelector(".dot_box"), y);
    side_prev(sliders[y].querySelector(".prev"), y);
    side_next(sliders[y].querySelector(".next"), y);
  }
  setTimeout(function () {
    for (y = 0; y < number_of_sliders; y++) {
      currentSlide(1, y);
    }
    make_timer();
  }, 200);
}

function S_Carousel(n, id) {
  var i;
  var dots = sliders[id].querySelector(".dot_box").querySelectorAll(".dot");
  if (n > slide_l[id]) {
    slideIndex[id] = 1;
  }
  if (n < 1) {
    slideIndex[id] = slide_l[id];
  }
  for (i = 0; i < slide_l[0]; i++) {
    sliders[id].querySelectorAll(".Slides")[i].style.opacity = "0%";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  var before = (slide_l[id] + slideIndex[id] - 2) % slide_l[id];
  var current = (slide_l[id] + slideIndex[id] - 1) % slide_l[id];
  var after = (slide_l[id] + slideIndex[id]) % slide_l[id];
  sliders[id].querySelectorAll(".Slides")[before].style.opacity = "100%";
  sliders[id].querySelectorAll(".Slides")[current].style.opacity = "100%";
  sliders[id].querySelectorAll(".Slides")[after].style.opacity = "100%";
  sliders[id].querySelectorAll(".Slides")[before].style.left = "-100%";
  sliders[id].querySelectorAll(".Slides")[current].style.left = "0%";
  sliders[id].querySelectorAll(".Slides")[after].style.left = "100%";
  sliders[id].querySelectorAll(".Slides")[before].style.zIndex = "-1";
  sliders[id].querySelectorAll(".Slides")[current].style.zIndex = "1";
  sliders[id].querySelectorAll(".Slides")[after].style.zIndex = "-1";
  dots[current].className += " active";
}

function S_Fader(n, id) {
  var i;
  var dots = sliders[id].querySelector(".dot_box").querySelectorAll(".dot");
  if (n > slide_l[id]) {
    slideIndex[id] = 1;
  }
  if (n < 1) {
    slideIndex[id] = slide_l[id];
  }
  for (i = 0; i < slide_l[id]; i++) {
    sliders[id].querySelectorAll(".Slides")[i].style.opacity = "0%";
    sliders[id].querySelectorAll(".Slides")[i].style.zIndex = "-1";
    sliders[id].querySelectorAll(".Slides")[i].style.position = "absolute";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  var current = (slide_l[id] + slideIndex[id] - 1) % slide_l[id];
  sliders[id].querySelectorAll(".Slides")[current].style.opacity = "100%";
  sliders[id].querySelectorAll(".Slides")[current].style.zIndex = "1";
  sliders[id].querySelectorAll(".Slides")[current].style.position = "relative";
  dots[current].className += " active";
}

function S_Rotate(n, id) {
  var i;
  var dots = sliders[id].querySelector(".dot_box").querySelectorAll(".dot");
  if (n > slide_l[id]) {
    slideIndex[id] = 1;
  }
  if (n < 1) {
    slideIndex[id] = slide_l[id];
  }
  for (i = 0; i < slide_l[id]; i++) {
    sliders[id].querySelectorAll(".Slides")[i].style.opacity = "0%";
    sliders[id].querySelectorAll(".Slides")[i].style.transform = "rotate(0deg)";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  var current = (slide_l[id] + slideIndex[id] - 1) % slide_l[id];
  sliders[id].querySelectorAll(".Slides")[current].style.opacity = "100%";
  sliders[id].querySelectorAll(".Slides")[current].style.transform =
    "rotate(360deg)";
  dots[current].className += " active";
}

function S_Scaler(n, id) {
  var i;
  var dots = sliders[id].querySelector(".dot_box").querySelectorAll(".dot");
  if (n > slide_l[id]) {
    slideIndex[id] = 1;
  }
  if (n < 1) {
    slideIndex[id] = slide_l[id];
  }
  for (i = 0; i < slide_l[id]; i++) {
    sliders[id].querySelectorAll(".Slides")[i].style.opacity = "0%";
    sliders[id].querySelectorAll(".Slides")[i].style.transform = "scale(0.0)";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  var current = (slide_l[id] + slideIndex[id] - 1) % slide_l[id];
  sliders[id].querySelectorAll(".Slides")[current].style.opacity = "100%";
  sliders[id].querySelectorAll(".Slides")[current].style.transform =
    "scale(1.0)";
  dots[current].className += " active";
}
