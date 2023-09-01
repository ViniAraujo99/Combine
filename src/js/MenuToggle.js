const menuBtn = document.querySelector(".header__menu");
const menu = document.querySelector(".header__list");

//SE CLICAR NO MENU ELE ALTERAR AS CLASSES, FAZENDO AS ANIMAÇÕES
export function openCloseMenu() {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("header__list-active");
        menuBtn.classList.toggle("header__menu-active");
})};
