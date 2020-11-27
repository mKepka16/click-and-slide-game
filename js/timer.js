const timer = {
    DOM: document.querySelector('.timer'),
    hourDOM: document.querySelector('.hours'),
    minDOM: document.querySelector('.mins'),
    secDOM: document.querySelector('.sec'),
    msDOM: document.querySelector('.msec'),
    handleInterval: null,
    timerContent: [0, 0, 0],
    show() { 
        this.DOM.style.display = 'flex';
    },
    start() {
        const startMS = new Date().getTime();

        this.handleInterval = setInterval(() => {
            const MSNow = new Date().getTime();
            const ms = Math.floor((MSNow-startMS));
            const sec = Math.floor(ms/1000);
            const min = Math.floor(sec/60);
            const hour = Math.floor(min/60);

            const realMin = min-(hour*60);
            const realSec = sec-(min*60);
            const realMS = ms-(sec*1000);

            this.timerContent = [hour, realMin, realSec, realMS];
            const timerFormatedContent = this.getFormatedTime(this.timerContent);

            this.hourDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[0][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[0][1]}.gif" alt="">`;

            this.minDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[1][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[1][1]}.gif" alt="">`;

            this.secDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[2][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[2][1]}.gif" alt="">`;

            this.msDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[3][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[3][1]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[3][2]}.gif" alt="">`;
        }, 10);
    },
    getFormatedTime([hour, realMin, realSec, realMS]) {
        return [this.format(hour), this.format(realMin), this.format(realSec), this.formatMS(realMS)]
    },
    format: num => num<10 ? `0${num}` : num.toString(),
    formatMS: num => {
        if(num < 10) return `00${num}`;
        if(num < 100) return `0${num}`;
        return num.toString();
    },
    hide() {
        clearInterval(this.handleInterval);
        this.DOM.style.display = 'none';     
        this.hourDOM.innerHTML = 
            `<img src="./timer/c0.gif" alt="">
            <img src="./timer/c0.gif" alt="">`;

        this.minDOM.innerHTML = 
            `<img src="./timer/c0.gif" alt="">
            <img src="./timer/c0.gif" alt="">`;

        this.secDOM.innerHTML = 
            `<img src="./timer/c0.gif" alt="">
            <img src="./timer/c0.gif" alt="">`;

        this.msDOM.innerHTML = 
            `<img src="./timer/c0.gif" alt="">
            <img src="./timer/c0.gif" alt="">
            <img src="./timer/c0.gif" alt="">`;
    }
}