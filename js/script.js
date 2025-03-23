document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function updateActiveLink() {
    let activeSection = null;

    sections.forEach(section => {
      if (!section.id) return; // تجاهل الأقسام التي لا تحتوي على id

      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop <= window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
        activeSection = section;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (activeSection && link.getAttribute("href") === `#${activeSection.id}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // استدعاء أولي عند تحميل الصفحة
});
