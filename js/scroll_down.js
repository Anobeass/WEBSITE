document.addEventListener("DOMContentLoaded", function () {
  const scrollDownButton = document.querySelector(".Auto-Layout-Vertical li a");
  const sections = Array.from(document.querySelectorAll("section"));

  let currentSectionIndex = 0;

  scrollDownButton.addEventListener("click", function (e) {
    e.preventDefault();

    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
    }
  });
});
