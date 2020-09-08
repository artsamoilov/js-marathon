class Button {
    constructor({id, maxCount, name, minDamage, maxDamage}) {
        this.id = id;
        this.buttonId = document.getElementById(`button${id - 1}`);
        this.maxCount = maxCount;
        this.name = name;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.availableClicks = this.showAvailableClicks();

        this.availableClicks();
    }

    showAvailableClicks = () => {
        let buttonText = this.buttonId.innerText;
        return function () {
            console.log(this.maxCount);
            this.buttonId.innerText = `${buttonText} [${this.maxCount}]`;
            this.maxCount--;
            if (this.maxCount < 0) {
                this.buttonId.disabled = true;
            }
        }
    }
}

export default Button;
