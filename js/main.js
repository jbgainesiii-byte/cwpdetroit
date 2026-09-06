// Cleaning With Purpose: progressively enhanced navigation and walkthrough requests.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.hidden = false;
    function closeMenu(returnFocus) {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      if (returnFocus) toggle.focus();
    }
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileNav.classList.contains("is-open")) closeMenu(true);
    });
    document.addEventListener("click", function (event) {
      if (!mobileNav.contains(event.target) && !toggle.contains(event.target)) closeMenu(false);
    });
    var desktop = window.matchMedia("(min-width: 1100px)");
    function onBreakpoint(event) { if (event.matches) closeMenu(false); }
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
  }

  // Each set of room details or FAQs behaves independently.
  document.querySelectorAll(".faq").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open || !item.parentElement) return;
      item.parentElement.querySelectorAll(":scope > .faq").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  var form = document.getElementById("walkthrough-form");
  if (!form || form.hidden) return;
  var plan = document.getElementById("f-plan");
  document.querySelectorAll("[data-plan]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (plan) plan.value = link.getAttribute("data-plan");
    });
  });

  var phone = document.getElementById("f-phone");
  function validatePhone() {
    if (!phone) return;
    var value = phone.value.trim();
    var digits = value.replace(/\D/g, "");
    var valid = !value || (/^[+()\d\s.-]+$/.test(value) && digits.length >= 7 && digits.length <= 15);
    phone.setCustomValidity(valid ? "" : "Please enter a phone number we can call, including the area code.");
  }
  if (phone) phone.addEventListener("input", validatePhone);

  var uploads = Array.prototype.slice.call(form.querySelectorAll('input[type="file"]'));
  var photoError = document.getElementById("photo-error");
  function validatePhotos() {
    var firstInvalid = null;
    uploads.forEach(function (input) {
      var file = input.files && input.files[0];
      var error = "";
      if (file && file.size > 2000000) error = "Please choose a photo smaller than 2 MB, or remove it and send your request without photos.";
      if (file) {
        var allowedType = /^image\/(jpeg|png|webp|heic|heif|avif)$/i.test(file.type);
        var allowedName = /\.(jpe?g|png|webp|heic|heif|avif)$/i.test(file.name || "");
        if ((!file.type && !allowedName) || (file.type && !allowedType) || (file.name && !allowedName)) {
          error = "Please choose a JPG, PNG, WebP, HEIC, HEIF, or AVIF image file.";
        }
      }
      input.setCustomValidity(error);
      if (error && !firstInvalid) firstInvalid = input;
    });
    if (photoError) {
      photoError.textContent = firstInvalid ? firstInvalid.validationMessage : "";
      photoError.hidden = !firstInvalid;
    }
    if (firstInvalid) {
      var details = firstInvalid.closest("details");
      if (details) details.open = true;
    }
    return !firstInvalid;
  }
  uploads.forEach(function (input) { input.addEventListener("change", validatePhotos); });
  // Reveal an invalid file field before native validation tries to focus it.
  form.addEventListener("invalid", function (event) {
    var details = event.target.closest("details");
    if (details) details.open = true;
  }, true);

  // Native HTML submission remains available if these browser APIs are absent.
  if (!window.fetch || !window.FormData || !window.AbortController) return;
  var submit = form.querySelector('button[type="submit"]');
  var errorBox = document.getElementById("form-error");
  var status = document.getElementById("form-status");
  var sending = false;
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (sending) return;
    validatePhone();
    if (!validatePhotos() || !form.reportValidity()) return;
    errorBox.hidden = true;
    errorBox.textContent = "";
    sending = true;
    submit.disabled = true;
    var originalLabel = submit.textContent;
    submit.textContent = "Sending your request…";
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your request. Please keep this page open.";
    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 25000);
    var accepted = false;
    try {
      var response = await fetch(form.getAttribute("action"), {
        method: "POST",
        body: new FormData(form),
        signal: controller.signal
      });
      if (!response.ok) throw new Error("HTTP_" + response.status);
      accepted = true;
      status.textContent = "Request received. Opening your confirmation…";
      window.location.assign(form.getAttribute("action"));
    } catch (error) {
      accepted = false;
      status.textContent = "";
      errorBox.textContent = /^HTTP_/.test(error.message)
        ? "Your request could not be sent. Your details are still here. Please try again or call Danielle at 313-451-2221."
        : "We could not confirm that your request arrived. Your details are still here. Please call 313-451-2221 to check before sending it again.";
      errorBox.hidden = false;
      errorBox.scrollIntoView({ block: "center", behavior: "auto" });
    } finally {
      window.clearTimeout(timeout);
      if (!accepted) {
        sending = false;
        submit.disabled = false;
        submit.textContent = originalLabel;
        form.removeAttribute("aria-busy");
      }
    }
  });
})();
