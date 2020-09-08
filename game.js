import Pokemon from "./pokemon.js";
import Button from "./button.js";
import {random} from "./utils.js";
import {generateLog, addLogString} from "./logs.js";

const buttonsArray = [];
const buttonObjectsArray = [];

let player1;
let player2;
let pokemons;
let newGame;

export function initGame(text) {
    let oldButtons = document.querySelectorAll('.button');
    oldButtons.forEach(button => button.remove());
    let newGame = new Game(text);
}

class Game {
    constructor(text) {
        this.$controlBlock = document.querySelector('.control');
        this.text = text;

        this.player1;
        this.player2;

        this.hidePokemons();
        this.startGame(this.text);
    }

    getPokemons = async () => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
        const body = await response.json();
        return body;
    }

    startGame = async (text) => {
        pokemons = await this.getPokemons();
        // console.log(pokemons);
        player1 = new Pokemon ({
            ...pokemons[random(pokemons.length - 1)],
            selectors: 'player1',
        })
        player2 = new Pokemon ({
            ...pokemons[random(pokemons.length - 1)],
            selectors: 'player2',
        })

        let $btnStart = document.createElement('button');
        $btnStart.classList.add('button');
        $btnStart.id = 'button-start';
        $btnStart.innerText = text;
        this.$controlBlock.appendChild($btnStart);
        this.showButtons($btnStart);
    }

    showButtons = (button) => {
        let $pokeList = document.querySelectorAll('.pokemon');
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

            buttonObjectsArray.push(button0, button1, button2, button3);

            newRound(buttonObjectsArray, player1, player2);
        })
    }

    hidePokemons = () => {
        let $pokeList = document.querySelectorAll('.pokemon');
        $pokeList.forEach(pokemon => pokemon.classList.add('hidden'));
    }
}

function newRound(buttons, player1, player2) {
    buttons.forEach(button => button.buttonId.addEventListener('click', async function() {
        console.log(button.name);

        const attackResponse = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1.id}&attackId=${button.id}&player2id=${player2.id}`);
        const attack = await attackResponse.json();
        player1.changeHP(attack.kick.player1, function(count) {
            count && addLogString(generateLog(player1, player2, count));
        });
        player2.changeHP(attack.kick.player2, function(count) {
            count && addLogString(generateLog(player2, player1, count));
        });

        if (player1.hp.current <= 0) {
            console.log('You lose! Start another game?');
            addLogString('You lose! Start another game?');
            initGame('Start Another Game');
        } else if (player2.hp.current <= 0){
            console.log('You win!');
            player2 = new Pokemon ({
                ...pokemons[random(pokemons.length - 1)],
                selectors: 'player2',
            });
        }

        button.availableClicks();
        refreshListeners();
    }))
}

function refreshListeners() {
    buttonsArray.forEach(button => function() {
        button.removeEventListener('click', function() {});
    })
}

export default Game;
