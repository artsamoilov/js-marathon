import Pokemon from "./pokemon.js";
import showAvailableClicks from "./counter.js";
import {random} from "./utils.js";
import {generateLog, addLogString} from "./logs.js"

const $btnKick = document.getElementById('btn-kick');
const $btnSlap = document.getElementById('btn-slap');

const countKick = showAvailableClicks($btnKick, 13);
const countSlap = showAvailableClicks($btnSlap, 8);

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

function init() {
    console.log('Start game!');
    attackingButton($btnKick, 'Thunder Kick:', 40, 40);
    attackingButton($btnSlap, 'Charged Slap:', 0, 20);
    countKick();
    countSlap();
}

function attackingButton(button, text, player1RandomDmg, player2RandomDmg) {
    button.addEventListener('click', function() {
        console.log(text);
        player1.changeHP(random(player1RandomDmg), function(count) {
            count && addLogString(generateLog(player1, player2, count));
        });
        player2.changeHP(random(player2RandomDmg), function(count) {
            count && addLogString(generateLog(player2, player1, count));
        });

        if (button === $btnKick) {
            countKick();
        } else {
            countSlap();
        }

        if (player1.hp.current <= 0 || player2.hp.current <= 0) {
            $btnKick.disabled = true;
            $btnSlap.disabled = true;
        }
    })
}

init();
