const image = {
    imgNow: 1,
    imgsCount: 4, 
    img: new Image(),
    setSrc(cb) { 
        this.img.addEventListener('load', cb);
        this.img.src = `./${this.imgNow == this.imgsCount ? 1 : this.imgNow}.jpg`;
    },
    getPart(size=3, x=0, y=0) {
        const a = 600/size;
        const [left, top] = [a*x, a*y];

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', a);
        canvas.setAttribute('height', a);
        canvas.setAttribute('data-x', x+1);
        canvas.setAttribute('data-y', y+1);

        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            this.img,
            left, top,
            a, a,
            0, 0, //always
            a, a
        );
  
        return canvas;
    },
    clean() {
        this.img = new Image();
    }
}