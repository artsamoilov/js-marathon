import Pokemon from "./pokemon.js";
import Button from "./button.js";
import {attackingButton} from "./button.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 200,
    type: 'electric',
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 195,
    type: 'fire',
    selectors: 'enemy',
});

const button1 = new Button({
    name: 'one',
    maxClicks: 13,
    text: 'Thunder Kick:',
    player1Dmg: 40,
    player2Dmg: 40,
});

const button2 = new Button({
    name: 'two',
    maxClicks: 8,
    text: 'Charged Slap:',
    player1Dmg: 0,
    player2Dmg: 20,
});

const button3 = new Button({
    name: 'three',
    maxClicks: 5,
    text: 'Static Field:',
    player1Dmg: 20,
    player2Dmg: 60,
});

const button4 = new Button({
    name: 'four',
    maxClicks: 3,
    text: 'Dynamic Punch:',
    player1Dmg: 0,
    player2Dmg: 80,
});

function init() {
    console.log('Start game!');
    attackingButton(button1, player1, player2);
    attackingButton(button2, player1, player2);
    attackingButton(button3, player1, player2);
    attackingButton(button4, player1, player2);
}

init();
