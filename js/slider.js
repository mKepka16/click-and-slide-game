const slider = {
    arrows: document.querySelectorAll('.arrow'),
    sliderDOM: document.querySelector('.images'),
    isSliding: false,
    init() {
        this.arrows.forEach((arrow, index) => {
            arrow.addEventListener('click', () => {
                
                index == 0 ? this.slideLeft() : this.slideRight();
            });
        });
    },
    slideLeft() {
        if(this.isSliding) return;
        this.isSliding = true;

        if(image.imgNow == 1) {
            this.sliderDOM.scrollTo((image.imgsCount-1)*100, 0);
            image.imgNow = image.imgsCount;
        }

        image.imgNow--;

        let counter = 1;
        const handleInterval = setInterval(() => {
            if(counter > 100) {
                clearInterval(handleInterval);
                this.isSliding = false;
            }
            this.sliderDOM.scrollBy(-1, 0);
            counter++;
        }, 2);

        game.restart();
    },
    slideRight() {
        if(this.isSliding) return;
        this.isSliding = true;

        if(image.imgNow == image.imgsCount) {
            this.sliderDOM.scrollTo(0, 0);
            image.imgNow = 1;
        }

        image.imgNow++;

        let counter = 1;
        const handleInterval = setInterval(() => {
            if(counter > 100) {
                clearInterval(handleInterval);
                this.isSliding = false;
            }
            this.sliderDOM.scrollBy(1, 0);
            counter++;
        }, 2);

        game.restart();
    }
}
slider.init();