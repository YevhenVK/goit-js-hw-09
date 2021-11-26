const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyColor: document.querySelector('.body-color'),
};

let intervalId = null;

class CreateColors {
    
    constructor({ refs, color }) {
        const { startBtn, stopBtn, bodyColor } = refs;
        this.color = color;
        
        this.startBtn = startBtn;
        this.stopBtn = stopBtn;
        this.bodyColor = bodyColor;
    }

    start() {
        if (this.stopBtn.disabled) {
            this.stopBtn.disabled = false;
        }
        this.startBtn.disabled = true;
        this.bodyColor.style.backgroundColor = this.color();

        this.intervalId = setInterval(() => {
            this.bodyColor.style.backgroundColor = this.color();
        }, 2000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        if (this.stopBtn.disabled = true) {
            this.bodyColor.style.backgroundColor = null; // очищаем фон
        }
    }
};

const createColors = new CreateColors({
    refs,
    color: getRandomHexColor
});

refs.startBtn.addEventListener('click', createColors.start.bind(createColors));
refs.stopBtn.addEventListener('click', createColors.stop.bind(createColors));

//Для генерации случайного цвета используй функцию getRandomHexColor.
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

