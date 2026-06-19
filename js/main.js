// Cleaning With Purpose — public site
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu after choosing a destination
    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Keep only one item open at a time, scoped to each accordion group
  // (so the FAQ and the room-by-room services list don't close each other)
  var accordions = Array.prototype.slice.call(document.querySelectorAll(".faq"));
  accordions.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open || !item.parentElement) return;
      var siblings = item.parentElement.querySelectorAll(":scope > .faq");
      Array.prototype.forEach.call(siblings, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
