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
    menuButton.addEventListener("click", function () {
      setMenu(!navLinks.classList.contains("active"));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const aboutFrame = document.querySelector(".photo-frame");
  const aboutCopy = document.querySelector(".about-copy");
  let aboutResizeFrame;

  function syncAboutImageHeight() {
    if (!aboutFrame || !aboutCopy) return;

    window.cancelAnimationFrame(aboutResizeFrame);
    aboutResizeFrame = window.requestAnimationFrame(function () {
      const copyHeight = aboutCopy.getBoundingClientRect().height;
      const maxHeight = window.innerWidth >= 1061 ? 540 : window.innerWidth >= 781 ? 500 : 620;
      aboutFrame.style.height = Math.min(copyHeight, maxHeight) + "px";
    });
  }

  syncAboutImageHeight();
  window.addEventListener("resize", syncAboutImageHeight);
  window.addEventListener("load", syncAboutImageHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncAboutImageHeight);
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const status = document.getElementById("form-status");

      if (!window.emailjs) {
        const subject = encodeURIComponent("Violin booking enquiry");
        const body = encodeURIComponent(new FormData(contactForm).get("message") || "");
        window.location.href = "mailto:Dorothe@hotmail.co.uk?subject=" + subject + "&body=" + body;
        return;
      }

      if (status) {
        status.textContent = "Sending...";
        status.style.color = "var(--muted)";
      }

      emailjs.sendForm("service_2662886", "template_hem2gqe", "#contact-form")
        .then(function () {
          if (status) {
            status.textContent = "Message sent successfully.";
            status.style.color = "var(--gold-dark)";
          }
          contactForm.reset();
        })
        .catch(function () {
          if (status) {
            status.textContent = "The form could not send. Please email or WhatsApp Dorothé directly.";
            status.style.color = "#9a3412";
          }
        });
    });
  }

  window.scrollToCalendar = function () {
    const calendarSection = document.querySelector("#availability, .calendar-section");
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
});
