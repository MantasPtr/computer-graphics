const KeyboardController = class KeyboardController{

    constructor({min,max,step,incButton, decButton}) {
        this.value = min ? min : 0;
        this.min = min;
        this.max = max;
        this.step = step;
        this.incButton = incButton;
        this.decButton = decButton;
    }

    inc(){
        this.value = this.max ? Math.min(this.value + this.step, this.max) : this.value + this.step
    }

    dec(){
        this.value = this.min ? Math.max(this.value - this.step, this.min) : this.value - this.step
    }

    handlePress(key){
        switch(key) {
            case this.incButton:
                this.inc();
                break;
            case this.decButton:
                this.dec()
                break;
        }
    }

    setCallback(propertyFunction) {
        
    }
}