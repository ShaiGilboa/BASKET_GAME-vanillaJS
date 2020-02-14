class Prize extends Enemy {

    constructor (root, prizeSpot){
    super(root, prizeSpot)
    this.domElement.src = "./images/avocado.png"
    this.domElement.style.width = '75px';
    this.prize = true;
    this.collect = false;
    }

    collected() {
        // this.domElement.style.display = 'none';
        this.speed = 0;
        this.collect = true;
        this.domElement.src = "./images/100.png"
        this.domElement.classList.add('collected')
        setTimeout(() => {
            this.speed = 100
        }, 500);
    }
}