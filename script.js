document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DARK MODE TOGGLE ---
  const themeBtn = document.getElementById("theme-btn");
  themeBtn.addEventListener("click", () => {
    const body = document.body;
    const icon = themeBtn.querySelector("i");

    if (body.getAttribute("data-theme") === "dark") {
      body.removeAttribute("data-theme");
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  // Check saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  // --- 2. MOBILE MENU ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Hamburger animation
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = navMenu.classList.contains("active")
      ? "rotate(45deg) translate(5px, 6px)"
      : "none";
    spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
    spans[2].style.transform = navMenu.classList.contains("active")
      ? "rotate(-45deg) translate(5px, -6px)"
      : "none";
  });

  // --- 3. COUNTER ANIMATION ---
  const counters = document.querySelectorAll(".counter");
  const startCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/,/g, "");
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(startCounters, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  };

  // --- 4. SCROLL REVEAL ---
  const revealElements = document.querySelectorAll(".reveal");
  let countersStarted = false;

  const revealOnScroll = () => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("active");

        // Start counters if this is the stats section
        if (el.classList.contains("stat-card") && !countersStarted) {
          startCounters();
          countersStarted = true;
        }
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once

  // --- 5. FAQ ACCORDION ---
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      const icon = item.querySelector("i");
      icon.classList.toggle("fa-plus");
      icon.classList.toggle("fa-minus");
    });
  });

  // --- 6. SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        navMenu.classList.remove("active"); // Close mobile menu
        window.scrollTo({
          top: target.offsetTop - 90,
          behavior: "smooth",
        });
      }
    });
  });
});
