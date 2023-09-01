import { escolherDificuldade, verificaSeGanhou, atualizaTempo } from "./Jogo.js";
import jogoController  from "./Jogo.js";

//CONST
const lista = document.querySelector(".game__cards");
const flip = document.querySelector(".flips");

let flips = { value: 0 } ;
let tabuleiroDesativado = false;
let cardUm, cardDois, cardUmBV;

export default flips;


export function flipa() {
    
    //ATUALIZA OS FLIPS
    flip.innerHTML = "Flips: " + flips.value;

    //ARRAY COM OS CARDS
    const filhos = lista.querySelectorAll("li");

    //PARA CADA CARD
    filhos.forEach(filho => filho.addEventListener('click', (e) => {
        let objClicado = e.target;

        //SE NÃO PERDEU O JOGO E O TABULEIRO NÃO ESTÁ DESATIVADO E O OBJETO CLICADO É DIFERENTE DO CARD UM (CASO JÁ TENHA CLICADO OU CASO SEJA VAZIO)
        if(!jogoController.perdeu  && !tabuleiroDesativado && objClicado.firstElementChild.firstElementChild !== cardUm) {
            if (jogoController.inicio == 0) { 
                escolherDificuldade(); 
                jogoController.inicio++;
            }
            else {
                //ACRESCENTA OS FLIPS E FLIPA O CARD (ADICIONANDO A CLASSE)
                flips.value++;
                flip.innerHTML = "Flips: " + flips.value;
                e.target.lastElementChild.classList.add("flip");

                //SE CARD UM ESTIVER VAZIO RETURN O CARD UM COMO O OBJETO CLICADO
                if (!cardUm) {
                    cardUmBV = e.target.lastElementChild;
                    return cardUm = e.target.firstElementChild.firstElementChild;
                }

                //SE CARD UM NÃO ESTIVER VAZIO, SALVA O CARD DOIS 
                cardDois = e.target.firstElementChild.firstElementChild;

                //PEGANDO OS ALTs DAS IMAGENS
                let cardUmImg = cardUm.alt;
                let cardDoisImg = cardDois.alt;

                //TRAVA TABULEIRO
                tabuleiroDesativado = true;

                //COMPARA CARDS
                combina(cardUmImg, cardDoisImg, e.target.lastElementChild, cardUmBV, filho);
            }
        }
    }));
}

//VERIFICA SE AS CARTAS COMBINAM
function combina(cardUmAlt, cardDoisAlt, objUm, objDois) {

    //VERIFICA SE GANHOU O JOGO
    verificaSeGanhou();

    //SE OS CARDS FOREM IGUAIS, LIMPA OS CARD E DESBLOQUEIA O TABULEIRO
    if(cardUmAlt === cardDoisAlt) {
        cardUm = cardDois = "";
        return tabuleiroDesativado = false;
    }

    //SE NÃO LIMPA OS CARDS, REMOVE O EVENTLISTENER COM A FUNÇÃO 'FLIPA' E REMOVE A CLASS QUE FLIPA OS CARDS E ATIVA O TABULEIRO NOVAMENTE
    setTimeout(() => {
        objUm.removeEventListener('click', flipa);
        objDois.removeEventListener('click', flipa);
        objUm.classList.remove("flip");
        objDois.classList.remove("flip");
        cardUm = cardDois = "";
        tabuleiroDesativado = false;
    }, 1000);
}