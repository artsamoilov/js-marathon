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

export default Button;
