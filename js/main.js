/* BOSS Associates interactions */
(function () {
  "use strict";

  // Sticky header condense
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close when a link is tapped
    document.querySelectorAll(".nav__links a, .nav__cta a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
    // Close on escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // FAQ: allow only one open at a time (progressive; details still work without JS)
  var faqItems = document.querySelectorAll("details.faq__item");
  faqItems.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        faqItems.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });

  // Contact form -> compose a mailto (no backend needed for GitHub Pages)
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();
      var to = form.getAttribute("data-to") || "malika@bossassociate.com";
      var subject = "Website inquiry" + (service ? ": " + service : "");
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Service of interest: " + service + "\n\n" +
        message + "\n";
      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      var status = document.getElementById("formStatus");
      if (status) {
        status.textContent = "Opening your email app to send this message...";
        status.style.color = "var(--gold-deep)";
      }
    });
  }

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* Services dropdown (accessible toggle) */
(function () {
  var drop = document.querySelector(".has-dropdown");
  if (!drop) return;
  var btn = drop.querySelector(".nav__drop");
  var isMobile = function () { return window.matchMedia("(max-width: 940px)").matches; };
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = drop.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.addEventListener("click", function (e) {
    if (!drop.contains(e.target)) { drop.classList.remove("open"); if (btn) btn.setAttribute("aria-expanded","false"); }
  });
})();
