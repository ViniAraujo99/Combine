import { flipa } from "./VerificaCards.js";
import flips from "./VerificaCards.js";

//VARIÁVEIS DE APOIO
let intervalo;
let ultimaDificuldadeEscolhida;
let jogoController = { perdeu : false, inicio : 0 } ;
export default jogoController;

//CONST
const facil = document.querySelector(".facil");
const medio = document.querySelector(".medio");
const dificil = document.querySelector(".dificil");
const tempo = document.querySelector(".tempo span");
const btnReinicia = document.querySelectorAll(".reiniciar");
const modal = document.querySelector(".modal");

//MENU
const menu = document.querySelector(".header__list");
const menuBtn = document.querySelector(".header__menu");

//GAME LIST
const lista = document.querySelector(".game__cards");


//ESCOLHE A DIFICULDADE
export function escolherDificuldade() {
  
    jogoController.perdeu = false;

    if (jogoController.inicio == 0) {
        criaCards("facil");
        atualizaTempo(60);
        jogoController.inicio++;
    }

    facil.addEventListener('click', () => {
        fecharMenu();
        ajustarJogoConformeDificuldade('facil');
    });

    medio.addEventListener('click', () => {
        fecharMenu();
        ajustarJogoConformeDificuldade('medio')
    });

    dificil.addEventListener('click', () => {
        fecharMenu()
        ajustarJogoConformeDificuldade('dificil')
    });
}

//AJUSTA O TEMPO E O TABULEIRO CONFORME A DIFICULDADE ESCOLHIDA
function ajustarJogoConformeDificuldade(_dificuldade) {

    jogoController.perdeu = false;
    flips.value = 0;
    ultimaDificuldadeEscolhida = _dificuldade;

    if (_dificuldade ==  'facil') {
        atualizaTempo(60);
        criaCards(_dificuldade);
        flipa();
    }
    else {
        atualizaTempo(30);
        criaCards(_dificuldade);
        flipa();
    }
}

//AJUSTA O TEMPO A CADA SEGUNDO
export function atualizaTempo(temp) {
    clearInterval(intervalo);
    
    //A CADA 1s ATUALIZA O InnerHTML
    intervalo = setInterval(() => {
        if (temp < 0 ) clearInterval(intervalo);
        else {
                tempo.innerHTML = temp + 's';
                temp--;
                
                verificaSePerdeu(temp);  
            }       
        }, 1000
    );
}

//CRIA A QUANTIDADE DE CARDS CONFORME A DIFICULDADE
function criaCards(_dificuldade) {

    limparTabuleiro();
    
    let arr = ["maca", "banana", "melancia", "morango", "abacaxi", "abacate", "uva"];
    let arraySort = 0;
    arraySort = arraySortido(arr, _dificuldade);
    
    //LOOPA PELO ARRAY ACRESCENTANDO A FRUTA NO ITEM DA LISTA
    for(let i = 0; i < arraySort.length; i++) {
        const li = document.createElement("li");
        const divFrontView = document.createElement("div");
        const img = document.createElement("img");
        const divBackView = document.createElement("div");

        lista.appendChild(li);
        li.appendChild(divFrontView);
        li.appendChild(divBackView);
        divFrontView.appendChild(img);

        li.classList.add("card");
        divFrontView.classList.add("card__front-view");
        divBackView.classList.add("card__back-view");

        img.src = `./src/img/${arraySort[i]}.png`;
        img.alt = `${arraySort[i]}`;
        divBackView.innerHTML = "?";
    }
}

//ALEATORIEDADE DO ARRAY/ JOGO
function arraySortido(array, _dificuldade) {
    let novoArray, arrayCombinado;

    if (_dificuldade ==  'facil' || _dificuldade ==  'medio') {
        novoArray       = array.sort(()     => Math.floor(Math.random() > .5 ? 1 : -1)).slice(0,4);
    }
    else {
        novoArray       = array.sort(()     => Math.floor(Math.random() > .5 ? 1 : -1));
    }
   
    return arrayCombinado = novoArray.concat(novoArray).sort(() => Math.random() > .5 ? 1 : -1);
}

//EXCLUI OS FILHOS DA LISTA PARA RECRIAR DEPOIS
function limparTabuleiro() {
    let filho = lista.lastElementChild;

    while(filho) {
        lista.removeChild(filho);
        filho = lista.lastElementChild;
    }
}

//VERIFICA SE PERDEU O JOGO
function verificaSePerdeu(tempo) {
    if (tempo < 0 /*&& lista.childElementCount > 0*/) { 
        if(lista.children.length != lista.querySelectorAll(".flip").length) {
            perdeu();
        }
    }

    return false;
}

//PERDE O JOGO 
function perdeu() {
    window.scrollTo({ top: modal.offsetTop, behavior: 'smooth' } );
    setTimeout(() => {
        modal.firstElementChild.innerHTML = "Puxa, você perdeu, mais sorte na próxima :/"
        modal.classList.add("modal-perdeu");
    }, 500);
    jogoController.perdeu = true;
}

//VERIFICA SE PERDEU O JOGO
export function verificaSeGanhou() {
    if (!verificaSePerdeu(tempo)) { 
        if(lista.children.length == lista.querySelectorAll(".flip").length) {
            ganhou();
        }
    };
}

//GANHA O JOGO 
function ganhou() {
    clearInterval(intervalo);
    modal.firstElementChild.innerHTML = "Parabéns, você venceu :D"
    modal.classList.add("modal-ganhou");
}

//FECHA O MENU
function fecharMenu() {
    menu.classList.remove("header__list-active");
    menuBtn.classList.toggle("header__menu-active");
};


//REINICIA O JOGO
export function reiniciar() {
    if(ultimaDificuldadeEscolhida === undefined) ultimaDificuldadeEscolhida = 'facil';
    btnReinicia.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove("modal-ganhou");
            modal.classList.remove("modal-perdeu");
            ajustarJogoConformeDificuldade(ultimaDificuldadeEscolhida);
        });
    });
}