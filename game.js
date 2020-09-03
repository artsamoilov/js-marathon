import Pokemon from "./pokemon.js";
import Button from "./button.js";
import {pokemons} from "./pokemons.js";
import {random} from "./utils.js";
import {generateLog, addLogString} from "./logs.js";

const buttonsArray = [];

let player1;
let player2;
let newGame;

export function initGame(text) {
    player1 = new Pokemon ({
        ...pokemons[random(pokemons.length - 1)],
        selectors: 'player1',
    });
    player2 = new Pokemon ({
        ...pokemons[random(pokemons.length - 1)],
        selectors: 'player2',
    });
    let oldButtons = document.querySelectorAll('.button');
    oldButtons.forEach(button => button.remove());
    newGame = new Game(text);
}

class Game {
    constructor(text) {
        this.$controlBlock = document.querySelector('.control');
        this.$pokemonsList = document.querySelectorAll('.pokemon');
        this.text = text;

        this.hidePokemons();
        this.startGame(this.text);
    }

    startGame = (text) => {
        let $btnStart = document.createElement('button');
        $btnStart.classList.add('button');
        $btnStart.id = 'button-start';
        $btnStart.innerText = text;
        this.$controlBlock.appendChild($btnStart);
        this.showButtons($btnStart);
    }

    showButtons = (button) => {
        let $pokeList = this.$pokemonsList;
        let $control = this.$controlBlock;
        button.addEventListener('click', function() {
            $pokeList.forEach(pokemon => pokemon.classList.remove('hidden'));
            button.remove();

            let i = 0;
            player1.attacks.forEach(item => {
                buttonsArray.push(item);
                const $btn = document.createElement('button');
                $btn.classList.add('button');
                $btn.id = `button${i}`;
                i++
                $btn.innerText = item.name;
                $control.appendChild($btn);
            });

            const button0 = new Button({
                id: '0',
                ...buttonsArray[0],
            });
            
            const button1 = new Button({
                id: '1',
                ...buttonsArray[1],
            });
            
            const button2 = new Button({
                id: '2',
                ...buttonsArray[2],
            });
            
            const button3 = new Button({
                id: '3',
                ...buttonsArray[3],
            });

            attack(button0, player1, player2);
            attack(button1, player1, player2);
            attack(button2, player1, player2);
            attack(button3, player1, player2);
        })
    }

    hidePokemons = () => {
        this.$pokemonsList.forEach(pokemon => pokemon.classList.add('hidden'));
    }
}

function attack(button, player1, player2) {
    button.buttonId.addEventListener('click', function() {
        console.log(button.name);
        player1.changeHP(random(player2.attacks[0].maxDamage, player2.attacks[0].minDamage), function(count) {
            count && addLogString(generateLog(player2, player1, count));
        });
        player2.changeHP(random(button.maxDamage, button.minDamage), function(count) {
            count && addLogString(generateLog(player2, player1, count));
        });

        button.availableClicks();

        if (player1.hp.current <= 0) {
            console.log('You lose! Start another game?');
            initGame('Start Another Game');
        } else if (player2.hp.current <= 0){
            console.log('You win!');
            player2 = new Pokemon ({
                ...pokemons[random(pokemons.length - 1)],
                selectors: 'player2',
            });
        }
    })
}

export default Game;
