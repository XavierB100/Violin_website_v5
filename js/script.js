document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".nav-toggle, .mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  function setMenu(open) {
    if (!menuButton || !navLinks) return;
    navLinks.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuButton && navLinks) {
    document.documentElement.classList.add("nav-ready");
    menuButton.addEventListener("click", function () {
      setMenu(!navLinks.classList.contains("active"));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("active")) {
        setMenu(false);
        menuButton.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-header")) setMenu(false);
    });
    document.addEventListener("focusin", function (event) {
      if (!event.target.closest(".site-header")) setMenu(false);
    });
    window.matchMedia("(max-width: 780px)").addEventListener("change", function () {
      setMenu(false);
    });
  }

  function scrollToSection(target) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const target = document.getElementById(anchor.hash.slice(1));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", anchor.hash);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      scrollToSection(target);
    });
  });

  const aboutFrame = document.querySelector(".photo-frame");
  const aboutCopy = document.querySelector(".about-copy");
  let aboutResizeFrame;

  function syncAboutImageHeight() {
    if (!aboutFrame || !aboutCopy) return;

    window.cancelAnimationFrame(aboutResizeFrame);
    aboutResizeFrame = window.requestAnimationFrame(function () {
      if (window.innerWidth <= 780) {
        aboutFrame.style.removeProperty("height");
        return;
      }
      const copyHeight = aboutCopy.getBoundingClientRect().height;
      const maxHeight = window.innerWidth >= 1061 ? 540 : 500;
      aboutFrame.style.height = Math.min(copyHeight, maxHeight) + "px";
    });
  }

  syncAboutImageHeight();
  window.addEventListener("resize", syncAboutImageHeight);
  window.addEventListener("load", syncAboutImageHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncAboutImageHeight);
  }

  // Keep an enquiry route within reach on long mobile pages, without covering
  // the original actions, contact details, footer or open navigation.
  const enquiryBar = document.querySelector(".mobile-enquiry");
  const heroActions = document.querySelector(".hero-actions");
  if (enquiryBar && heroActions && "IntersectionObserver" in window) {
    const contact = document.querySelector("#contact, #availability");
    const footer = document.querySelector("footer");
    const visible = function (element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 90;
    };
    const observer = new IntersectionObserver(function () {
      enquiryBar.hidden = heroActions.getBoundingClientRect().bottom > 90 || visible(contact) || visible(footer);
    }, { rootMargin: "-90px 0px 0px" });
    [heroActions, contact, footer].filter(Boolean).forEach(function (element) {
      observer.observe(element);
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.querySelector('[type="submit"]').disabled = false;
    let sending = false;
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (sending || !contactForm.reportValidity()) return;
      const status = document.getElementById("form-status");
      const submit = contactForm.querySelector('[type="submit"]');

      if (!window.emailjs) {
        status.textContent = "The form is unavailable. Your message has not been sent. Please use the email or WhatsApp contact details; your details are still here to copy.";
        return;
      }

      sending = true;
      submit.disabled = true;
      submit.textContent = "Sending…";
      contactForm.setAttribute("aria-busy", "true");
      status.textContent = "Sending your enquiry…";
      try {
        await window.emailjs.sendForm("service_2662886", "template_hem2gqe", "#contact-form");
        status.textContent = "Thank you — your enquiry has been sent. Dorothé will reply to discuss your event.";
        contactForm.dispatchEvent(new CustomEvent("enquiry:sent", { bubbles: true }));
        contactForm.reset();
      } catch {
        status.textContent = "Your enquiry could not be sent. Please email or WhatsApp Dorothé using the contact details. Your details are still here to copy or try again.";
      } finally {
        sending = false;
        submit.disabled = false;
        submit.textContent = "Send Enquiry";
        contactForm.removeAttribute("aria-busy");
      }
    });
  }

  window.scrollToCalendar = function () {
    const calendarSection = document.querySelector("#availability, .calendar-section");
    if (calendarSection) {
      scrollToSection(calendarSection);
    }
  };
});
