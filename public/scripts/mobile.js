const mobileMeneBtnElement = document.getElementById("mobile-menu-btn");
const mobileMenuElement = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  mobileMenuElement.classList.toggle("open");
}

mobileMeneBtnElement.addEventListener("click", toggleMobileMenu);
