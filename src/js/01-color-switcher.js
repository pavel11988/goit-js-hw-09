
const button_start = document.querySelector("button[data-start]")
const button_stop  = document.querySelector("button[data-stop]")

// button_start.addEventListener('click',

const changeColor = {
    timerId: null,
    isActive: false,


    start(){
        if (this.isActive)  {
            button_stop.classList.add("disabled");
            return;
        }

        this.isActive = true;
        button_start.classList.add("disabled");
        button_stop.classList.remove("disabled");

        timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        
    },

    stop(){
        if (this.isActive)  {
            button_stop.classList.add("disabled");
            button_start.classList.remove("disabled");
        }
        this.isActive = false;
        clearInterval(timerId);
    }
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

button_start.addEventListener('click', () => {
    changeColor.start();
})

button_stop.addEventListener('click', () => {
    changeColor.stop();
})