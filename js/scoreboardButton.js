const scoreboardButton = {
    DOM: document.querySelector('.scoreboard-button'),
    init() {
        this.DOM.addEventListener('click', this.showScoreBoard);
    },
    showScoreBoard() {
        scoreboard.display();
        game.restart();
        scoreboard.show();
    },
    show() {
        this.DOM.style.display = "block";
    },
    hide() {
        this.DOM.style.display = "none";
    }
}