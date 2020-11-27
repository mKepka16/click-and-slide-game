const game = {
    start() {
        scoreboard.initCookies();
        button.init();
        scoreboardButton.init();
    },
    checkForFinish() {
        let won = true;

        for(let x=1;x<=board.size; x++) {
            for(let y=1;y<=board.size; y++) {
                if(x == board.size && y == board.size)
                    continue;

                if(board.logicBoard[y][x][0] != x || board.logicBoard[y][x][1] != y) {
                    won = false;
                }
            }
        }

        if(won) setTimeout(this.finish, 100);
    },
    finish() {
        clearInterval(timer.handleInterval);
        const timerFormatedContent = timer.getFormatedTime(timer.timerContent);
        console.log(timerFormatedContent);
        console.log(timer.timerContent);
        
        timer.hourDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[0][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[0][1]}.gif" alt="">`;

        timer.minDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[1][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[1][1]}.gif" alt="">`;

        timer.secDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[2][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[2][1]}.gif" alt="">`;

        timer.msDOM.innerHTML = 
            `
            <img src="./timer/c${timerFormatedContent[3][0]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[3][1]}.gif" alt="">
            <img src="./timer/c${timerFormatedContent[3][2]}.gif" alt="">`;

        setTimeout(() => {
            alert(`Brawo! Udało ci się ułożyć układankę ${board.size}x${board.size} w czasie ${timer.timerContent[0]}h ${timer.timerContent[1]}min ${timer.timerContent[2]}s i ${timer.timerContent[3]}ms`);
            const nick = window.prompt("Podaj swój nick");
            scoreboard.setScore(nick, timer.timerContent[0]*3600000 + timer.timerContent[1]*60000 + timer.timerContent[2]*1000 + timer.timerContent[3]*10, `${timerFormatedContent[0]}:${timerFormatedContent[1]}:${timerFormatedContent[2]}.${timerFormatedContent[3]}`, board.size);

            scoreboardButton.showScoreBoard();
        }, 50)
    },
    restart() {
        scoreboardButton.hide();
        scoreboard.hide();
        board.clean();
        image.clean();
        timer.hide();
        if(board.interval) clearInterval(board.interval);
    }
}

const gameLoop = (() => {
    game.start();
})();