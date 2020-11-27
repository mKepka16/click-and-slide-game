const button = {
    DOM: document.querySelectorAll('.buttons button'),
    init() {
        this.DOM.forEach((button, index) => {
            button.addEventListener('click', () => {
                game.restart();
                board.init(index+3);
                scoreboardButton.show();
                timer.show();
                
            });
        })
    },
    remove() {
        this.DOM.forEach(button => {
            button.parentNode.removeChild(button);
        })
    },
    initDOM() {
        const buttonBox = document.querySelector('.buttons');

        for(let i=3; i<=6; i++) {
            const buttonDOM = document.createElement('button');
            buttonDOM.textContent = `${i} x ${i}`;
            buttonBox.appendChild(buttonDOM);
        }

        this.DOM = [...buttonBox.children];
    }
}