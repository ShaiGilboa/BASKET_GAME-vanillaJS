const PRIZE1 = "./images/avocado.png"
const PRIZE2 = "./images/pineapple.png"
const PRIZE3 = "./images/tomato.png"

class Prize extends Enemy {

    constructor (root, prizeSpot, prizeKind){
    super(root, prizeSpot)
    this.domElement.src = prizeKind
    this.domElement.style.width = '70px';
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