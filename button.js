import {random} from "./utils.js";
import {generateLog, addLogString} from "./logs.js";

const buttonsList = document.querySelectorAll('.button');

class Button {
    constructor({name, maxClicks, text, player1Dmg, player2Dmg}) {
        this.buttonId = document.getElementById(`btn-${name}`);
        this.maxClicks = maxClicks;
        this.text = text;
        this.player1Dmg = player1Dmg;
        this.player2Dmg = player2Dmg;
        this.availableClicks = this.showAvailableClicks();

        this.availableClicks();
    }

    showAvailableClicks = () => {
        let buttonText = this.buttonId.innerText;
        return function () {
            console.log(this.maxClicks);
            this.buttonId.innerText = `${buttonText} [${this.maxClicks}]`;
            this.maxClicks--;
            if (this.maxClicks < 0) {
                this.buttonId.disabled = true;
            }
        }
    }
}

export function attackingButton(button, player1, player2) {
    button.buttonId.addEventListener('click', function() {
        console.log(button.text);
        player1.changeHP(random(button.player1Dmg), function(count) {
            count && addLogString(generateLog(player1, player2, count));
        });
        player2.changeHP(random(button.player2Dmg), function(count) {
            count && addLogString(generateLog(player2, player1, count));
        });

        button.availableClicks();

        if (player1.hp.current <= 0 || player2.hp.current <= 0) {
            buttonsList.forEach(btn => btn.disabled = true);
        }
    })
}

export default Button;
