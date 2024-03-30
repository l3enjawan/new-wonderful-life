function navigateTopage(to) {
  document.getElementById("button-onclick").onclick = function () {
    window.location.href = to;
  };
}

// Sun index
let sun = document.getElementById("sun");
let tetitlebg = document.getElementById("titlebg");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  sun.style.top = value * 1.05 + "px";
  tetitlebg.style.marginRight = value * 5 + "px";
});

window.onscroll = function () {
  myFunction();
};

// Navbar section
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

var audio = document.getElementById("myaudio");
audio.volume = 0.4;
