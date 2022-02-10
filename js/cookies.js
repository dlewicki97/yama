window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#212121",
      "text": "#fff"
    },
    "button": {
      "background": "#fff",
      "text": "#000"
    }
  },
  "type": "opt-out",
  "content": {
    "message": "Nasza strona internetowa korzysta z plików cookie. Dzięki temu możemy zapewnić naszym użytkownikom satysfakcjonujące wrażenia z przeglądania naszej witryny i jej prawidłowe funkcjonowanie.",
    "dismiss": "Rozumiem",
    "deny": "",
    "allow": "Rozumiem",
    "link": "Czytaj więcej...",
    "href": "uploads/settings/polityka-prywatnosci.pdf"
  }
})});
const mq = window.matchMedia( "(min-width: 767px)" );
// When the user scrolls the page, execute myFunction
if (mq.matches) {
} else {
window.onscroll = function() {myFunction()};
}


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;
console.log(window.pageYOffset);
  if (window.pageYOffset >= 60) {
    navbar.classList.remove("normal");
    navbar.classList.add("sticky");
    navbar.classList.add("nav__bordered");
  } else {
    navbar.classList.remove("sticky");
    navbar.classList.remove("nav__bordered");
    navbar.classList.add("normal");
  }
}