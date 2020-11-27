const scoreboard = {
    scoreboardDOM: document.querySelector('.scoreboard'),
    sizeDOM: document.querySelector('.scoreboard span'),
    listDOM: document.querySelector('.scoreboard ol'),
    cookieObj: {
        3: [],
        4: [],
        5: [],
        6: []
    },

    updateCookies() { 
        document.cookie = `scoreboard=${JSON.stringify(this.cookieObj)}; expires=Thu, 18 Dec 2025 12:00:00 UTC`
    },

    initCookies() {
        if(document.cookie == "")
            this.updateCookies();
        else
            this.cookieObj = JSON.parse(document.cookie.split("=")[1]);
    },

    setScore(nick, time, stringTime, size) {
        const playerScore = {
            nick,
            time,
            stringTime,
        }
        this.cookieObj[size].push(playerScore)
        this.cookieObj[size].sort((a, b) => a.time - b.time);
        this.cookieObj[size] = this.cookieObj[size].slice(0, 10);
        this.updateCookies();
    },

    display() {
        const {size} = board;
        this.sizeDOM.textContent = `${size}x${size}`;
        const list = this.cookieObj[size];
        this.listDOM.innerHTML = "";

        for(let i=0; i<(list.length < 10 ? list.length : 10); i++) {
            const li = document.createElement('li');
            li.innerHTML = `
                <b>${list[i].nick}</b> - <p>${list[i].stringTime}</p>
            `;
            this.listDOM.appendChild(li);
        }
    },
    show() {
        this.scoreboardDOM.style.display = "flex";
    },
    hide() {
        this.scoreboardDOM.style.display = "none";
    }
}