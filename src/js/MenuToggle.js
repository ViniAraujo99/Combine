const menuBtn = document.querySelector(".header__menu");
const menu = document.querySelector(".header__list");

//SE CLICAR NO MENU ELE ALTERAR AS CLASSES, FAZENDO AS ANIMAÇÕES
menuBtn.addEventListener("click", () => {
    openCloseMenu();
});

export function openCloseMenu() {
        menu.classList.toggle("header__list-active");
        menuBtn.classList.toggle("header__menu-active");
}
