const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const decimal = !Number.isInteger(target);
    const duration = 1200;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      counter.textContent = decimal ? value.toFixed(1) : Math.round(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.7 });

document.querySelectorAll(".counter").forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
      faq.querySelector("i").textContent = "+";
    });
    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      button.querySelector("i").textContent = "−";
    }
  });
});

const modal = document.querySelector("#contact-modal");
const form = document.querySelector("#contact-form");
const success = document.querySelector(".form-success");

document.querySelectorAll(".js-open-modal").forEach((button) => {
  button.addEventListener("click", () => modal.showModal());
});

document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.hidden = true;
  success.hidden = false;
  setTimeout(() => {
    modal.close();
    form.reset();
    form.hidden = false;
    success.hidden = true;
  }, 2400);
});
