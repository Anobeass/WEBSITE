document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".scroll-fade-in");

  // إضافة ترتيب للأنيميشن
  animatedElements.forEach((element, index) => {
    element.style.setProperty('--animation-order', index);
  });

  function handleScrollAnimation() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop <= windowHeight * 0.8) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();
});
