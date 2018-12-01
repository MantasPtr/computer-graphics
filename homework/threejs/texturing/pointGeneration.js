export default class SlicedConePointGenerator {
    constructor(height, diameter){ 
        this.height = height
        this.diameter = diameter
        this.radius = diameter/2
    }

    generateAllPointsCoordinates(pointCount) {
        const pointsCoordinates =[];
        for (let i = 0 ;i<pointCount;i++) {
            pointsCoordinates.push(this.generatePoints())
        }
        return pointsCoordinates;
    }

    generatePoints(){
        const genPoints = this.generatePointCoordinates()
        if (this.isInside(genPoints)) {
            return genPoints
        } else {
            return this.generatePoints()
        }

    }

    isInside([x,y,z]) {
        const {radius, height} = this
        return Math.pow(x,2) + Math.pow(z,2) <= Math.pow(radius,2)/(2*Math.pow(height,2)) * Math.pow(y-height,2)
    }

    generatePointCoordinates() {
        const {radius, height, diameter} = this
        const x = Math.random() * diameter - radius
        const y = Math.random() * height - height/2
        const z = Math.random() * diameter - radius
        return [x,y,z]
    }
}