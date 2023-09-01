//IMPORTS
import { openCloseMenu } from "./MenuToggle.js";
import { escolherDificuldade, reiniciar } from "./Jogo.js";
import { flipa } from "./VerificaCards.js";

//MENU TOGGLE
openCloseMenu();

//ESCOLHER DIFICULDADE E REINICIA
escolherDificuldade();
reiniciar();

//FLIPA CARDS
flipa();