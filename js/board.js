const board = {
    DOM: document.querySelector('.board'),
    logicBoard: [],
    size: null,
    lastMixMove: [2, 2],
    mixed: null,
    interval: null,
    init(size) {
        this.size = size;

        // DOM
        this.DOM.style.width = `${(600 + 10*size) - 5}px`;

        image.setSrc(() => {
            for(let y=0; y<size; y++) {
                for(let x=0; x<size; x++) {
                    if(x == size-1 && y == size-1) break;

                    const part = image.getPart(size, x, y);
                    part.style.top = `${(y*((600/size) + 10))}px`;
                    part.style.left = `${(x*((600/size) + 10))}px`;
                    this.DOM.appendChild(part);
                }
            }

            this.startMixing(size * 20);
        });

        // logic board
        for(let y=0; y<=size+1; y++) {
            const row = [];

            for(let x=0; x<=size+1; x++) {
                if(y == 0 || y == size+1 || x == 0 || x == size+1)
                    row.push(1);
                else if(x == size && y == size) 
                    row.push([null, null]);
                else
                    row.push([x, y]);
            }

            this.logicBoard.push(row);
        }
    },
    move(part) {
        const { realXY: [x, y], XY: [xVal, yVal]} = this.getRealXY(part);
        const direction = this.canMove(x, y);
        
        if(!direction) return;

        // DOM
        const oldLeft = part.style.left.slice(0, part.style.left.length-2);
        const oldTop = part.style.top.slice(0, part.style.top.length-2);

        const newLeft = parseFloat(oldLeft) + ((600/this.size + 10) * direction[0]);
        const newTop = parseFloat(oldTop) + ((600/this.size + 10) * direction[1]);

        part.style.left = `${newLeft}px`;
        part.style.top = `${newTop}px`;

        // Logic board
        this.logicBoard[y+direction[1]][x+direction[0]] = [xVal, yVal];
        this.logicBoard[y][x] = [null, null];
        

    },
    getRealXY(part) {
        const x = part.getAttribute('data-x');
        const y = part.getAttribute('data-y');
        const realXY = []

        this.logicBoard.forEach((row, yIndex) => {
            row.forEach((cell, xIndex) => {
                if(cell[0] == x && cell[1] == y) {
                    realXY.push(xIndex);
                    realXY.push(yIndex);
                    return;
                } 
            })
        });

        return {
            realXY,
            XY: [x, y]
        }
    },
    canMove(x, y) {
        const { logicBoard } = this;

        //left
        if(logicBoard[y][x-1] != 1 &&  logicBoard[y][x-1].filter(el => el == null).length == 2) return [-1, 0];
        //right
        else if(logicBoard[y][x+1] != 1 &&  logicBoard[y][x+1].filter(el => el == null).length == 2) return [1, 0];
        //up
        else if(logicBoard[y-1][x] != 1 &&  logicBoard[y-1][x].filter(el => el == null).length == 2) return [0, -1];
        //down
        else if(logicBoard[y+1][x] != 1 &&  logicBoard[y+1][x].filter(el => el == null).length == 2) return [0, 1];

        else return null;
    },
    startMixing(times) {
        this.interval = setInterval(() => {
            if(times <= 0) {
                this.addClickEvents();
                clearInterval(this.interval);
                timer.start();
            }
            else {
                let success = false;

                while(!success) {
                    success = this.mix();
                }

                times--;
            }
        }, 20)

    },
    mix() {
        const randDir = [
            Math.floor(Math.random() * 3 - 1),
            Math.floor(Math.random() * 3 - 1)
        ]

        if(randDir[0] == randDir[1] || randDir[0] == -randDir[1])
            return false;

        if(randDir[0] == -this.lastMixMove[0] && randDir[1] == -this.lastMixMove[1])
            return false;
        
        const nullCords = [];
        
        this.logicBoard.forEach((row, y) => {
            row.forEach((cell, x) => {
                if(cell != 1 && cell[0] == null && cell[1] == null) {
                    nullCords.push(x);
                    nullCords.push(y);
                }
            })
        })

        if (this.logicBoard[randDir[1]+nullCords[1]][randDir[0]+nullCords[0]] == 1)
            return false;
        else {
            const DOM_XY = this.logicBoard[ randDir[1]+nullCords[1] ][ randDir[0]+nullCords[0] ];
            const field = document.querySelector(`[data-x="${DOM_XY[0]}"][data-y="${DOM_XY[1]}"]`);         

            this.move(field);
            this.lastMixMove = randDir;
            return true;
        }
    },
    addClickEvents() {
        [...this.DOM.children].forEach(part => {
            part.addEventListener('click', () => {
                this.move(part);
                game.checkForFinish();
            });
        });
    },
    clean() {
        this.logicBoard = [];
        this.size = null;
        this.lastMixMove = [2, 2];
        this.DOM.parentNode.removeChild(this.DOM);

        const newBoard = document.createElement('div');
        newBoard.classList.add('board');

        this.DOM = newBoard;

        document.querySelector('.container').appendChild(this.DOM);
        
    }
}