class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImage = document.getElementById(`img-${name}`);
        this.selector = name;
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectors, attacks = [], img}) {
        super(selectors)
        this.elName.innerText = name;
        this.elImage.src = img;

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert('Бедный ' + this.name + ' проиграл бой!');
        }

        this.renderHP();

        cb && cb(count);
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const {elHP, hp: {current, total}} = this;
        elHP.innerText = current + ' / ' + total;
    }

    renderProgressbarHP = () => {
        const {hp: {current, total}, elProgressbar} = this;
        elProgressbar.style.width = (current / total) * 100 + '%';
        if (current / total <= 0.6 && current / total > 0.2) {
            elProgressbar.classList.add('low');
        } else if (current / total <= 0.2) {
            elProgressbar.classList.replace('low', 'critical');
        } else {
            elProgressbar.classList.remove('low', 'critical');
        }
    }
}

export default Pokemon;
