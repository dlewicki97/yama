const animposition = []; //element position in document
const animoffset = []; //height of element
const animcheck = []; //checks if animation is to be done
const animdone = []; //checks if animation is done
const animcounter = []; //animation progress value
var element; // list of elements to be animated
var rad = Math.PI / 180; // radian value for calculations
var qanim_a = 0; // iteration value to get all elements data and check its position with scroll position
var qanim_b = 0; // iteration value used in timer to pull conditions on all elements during tick
var clock = 0; // one and only timer needed ;)
var ms = 10; // timer interval value
var min_speed = 0.4; //minimum speed of animation
var mul_speed = 1.4; //animation speed multiplier

function qanim() {
  //get all elements to be animated
  element = document.querySelectorAll(
    ".qa_fade, .qa_fade-right, .qa_fade-left, .qa_fade-down, .qa_fade-up"
  );
  //get all needed data
  for (qanim_a; qanim_a < element.length; qanim_a++) {
    animposition[qanim_a] =
      element[qanim_a].getBoundingClientRect().top + window.scrollY - 600;
    animoffset[qanim_a] =
      animposition[qanim_a] + (element[qanim_a].offsetHeight + 300);
    animcheck[qanim_a] = false;
    animdone[qanim_a] = false;
    animcounter[qanim_a] = 0;
  }
  qanim_a = 0;
  //everything runs on single interval so its less performance hungry :D
  clock = setInterval(function () {
    for (qanim_b; qanim_b < element.length; qanim_b++) {
      if (animcheck[qanim_b] == true && animdone[qanim_b] == false) {
        if (animcounter[qanim_b] >= 100) {
          //making sure it ends where it should ends
          element[qanim_b].style.opacity = 100 + "%";
          if (element[qanim_b].classList.contains("qa_fade-right") == true) {
            element[qanim_b].style.right = 0 + "%";
          } else if (
            element[qanim_b].classList.contains("qa_fade-left") == true
          ) {
            element[qanim_b].style.left = 0 + "%";
          } else if (
            element[qanim_b].classList.contains("qa_fade-down") == true
          ) {
            element[qanim_b].style.top = 0 + "%";
          } else if (
            element[qanim_b].classList.contains("qa_fade-up") == true
          ) {
            element[qanim_b].style.bottom = 0 + "%";
          }
          animdone[qanim_b] = true;
        } else {
          animcounter[qanim_b] =
            animcounter[qanim_b] +
            (Math.cos(animcounter[qanim_b] * rad) * mul_speed + min_speed); // oh yeah... that makes animation smooth baby ;p
          element[qanim_b].style.opacity = animcounter[qanim_b] + "%";
          if (element[qanim_b].classList.contains("qa_fade-right") == true) {
            element[qanim_b].style.right = -100 + animcounter[qanim_b] + "%";
          } else if (
            element[qanim_b].classList.contains("qa_fade-left") == true
          ) {
            element[qanim_b].style.left = -100 + animcounter[qanim_b] + "%";
          } else if (
            element[qanim_b].classList.contains("qa_fade-down") == true
          ) {
            element[qanim_b].style.top = -100 + animcounter[qanim_b] + "%";
          } else if (
            element[qanim_b].classList.contains("qa_fade-up") == true
          ) {
            element[qanim_b].style.bottom = -100 + animcounter[qanim_b] + "%";
          }
        }
      }
    }
    qanim_b = 0;
  }, ms);
}
window.onscroll = function () {
  for (qanim_a; qanim_a < element.length; qanim_a++) {
    if (
      window.scrollY >= animposition[qanim_a] &&
      window.scrollY <= animoffset[qanim_a] &&
      animcheck[qanim_a] == false
    ) {
      animcheck[qanim_a] = true;
    } // checks if you scrolled to element position
  }
  qanim_a = 0;
};
