let slideTemplate = `<div class="slide">
<div class="numbertext">{num} / {length}</div>
<img src="{src}">
</div>`;
const lightboxTriggers = document.querySelectorAll(
  ":is(img, div)[data-lightbox]"
);
lightboxTriggers.forEach((trigger) =>
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    let triggerEl = event.path.find(
      (el) => el.dataset?.lightbox.constructor === String
    );
    console.log(triggerEl);
    openModal();
    const slide = document.querySelector("#w3schoolsModal .slide");
    slide.querySelector("img").src =
      triggerEl.dataset.src ??
      triggerEl.src ??
      triggerEl.dataset.bg ??
      style.backgroundImage.slice(4, -1).replace(/"/g, "") ??
      "";

    document.querySelector("#w3schoolsModal #caption").innerHTML =
      triggerEl.title ?? triggerEl.alt ?? "";
  })
);

function openModal() {
  document.getElementById("w3schoolsModal").style.display = "block";
}

function closeModal() {
  document.getElementById("w3schoolsModal").style.display = "none";
}

var w3slideIndex = 1;

function plusSlides(n) {
  showSlides((w3slideIndex += n));
}

function currentSlide(n) {
  showSlides((w3slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    w3slideIndex = 1;
  }
  if (n < 1) {
    w3slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[w3slideIndex - 1].style.display = "block";
  dots[w3slideIndex - 1].className += " active";
  captionText.innerHTML = dots[w3slideIndex - 1].alt;
}
