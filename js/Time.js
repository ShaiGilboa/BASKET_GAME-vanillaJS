class Time {
    constructor (timeInSeconds, timeInMinutes) {
        this.seconds = timeInSeconds;
        this.minutes = timeInMinutes;
        while(this.seconds > 60){
            this.minutes++;
            this.seconds -= 60;
        }
    }

    secondPassed () {
        this.seconds --;
        timeLeft.update(`Time Left: ${roundTime.minutes}:${roundTime.seconds}`)
        if (this.seconds <= 0) {
            if(this.minutes === 0)this.timesUp();
            this.minutes --;
            this.seconds = 59;
        }
    }

    timesUp () {
        endCase();
    }
}