const settings = {
    DOT: 0.5,
    SPEED: 2,
}

const theme = {
    PRIMARY: '#7DCE9A',
    BACKGROUND: '#211020'
}

const getSize = size => {
    return `${size * settings.DOT}vmin`
}


class Player {
    constructor(bat) {
        this.bat = bat
    }

    moveUp(stop) {
        this.bat.moveUp(stop)
    }

    moveDown(stop) {
        this.bat.moveDown(stop)
    }
}

class Score {
    constructor(position) {
        this.el = document.createElement('code')
        this.el.style.position = 'absolute'
        this.el.style.color = theme.PRIMARY
        this.el.style.fontSize = '30px'
        this.el.style[position] = getSize(14)
        this.el.style.top = getSize(5)
        this.el.style.opacity = 0.4
        this.reset()
    }

    reset() {
        this.score = 0
        this.renderScore()
    }

    add() {
        this.score++
            this.renderScore()
    }

    renderScore() {
        this.el.innerText = this.score
    }
}

class Message {
    constructor() {
        this.el = document.createElement('code')
        this.el.style.position = 'absolute'
        this.el.style.color = theme.PRIMARY
        this.el.style.textAlign = 'center'
        this.el.style.fontSize = '18px'
        this.el.style.top = '40%'
        this.el.style.left = '50%'
        this.el.style.transform = 'translateY(-50%) translateX(-50%)'
        this.el.style.opacity = 0.8
        this.reset()
    }

    reset() {
        this.text = 'press ENTER to start'
        this.render()
        this.show()
    }

    hide() {
        this.el.style.display = 'none'
    }

    show() {
        this.el.style.display = 'block'
    }

    render() {
        this.el.innerText = this.text
    }
}

class Bat {
    constructor(position, stage) {
        this.stage = stage
        this.height = 40
        this.width = 5
        this.offset = 5
        this.moveUpTimeout = null
        this.moveDownTimeout = null

        this.el = document.createElement('div')
        this.el.style.position = 'absolute'
        this.el.style.height = getSize(this.height)
        this.el.style.width = getSize(this.width)
        this.el.style.background = theme.PRIMARY
        this.el.style[position] = getSize(this.offset)

        this.reset()
    }

    reset() {
        this.top = this.stage.height / 2 - this.height / 2
        clearTimeout(this.moveUpTimeout)
        clearTimeout(this.moveDownTimeout)
        this.updatePosition()
    }

    moveUp(stop) {
        if (stop || this.top <= 0) {
            clearTimeout(this.moveUpTimeout)
            return
        }
        this.top--
            this.updatePosition()
        this.moveUpTimeout = setTimeout(this.moveUp.bind(this), settings.SPEED)
    }

    moveDown(stop) {
        if (stop || this.top >= this.stage.height - this.height) {
            clearTimeout(this.moveDownTimeout)
            return
        }
        this.top++
            this.updatePosition()
        this.moveDownTimeout = setTimeout(this.moveDown.bind(this), settings.SPEED)
    }

    updatePosition() {
        this.el.style.transform = `translateY(${getSize(this.top)})`
    }
}

class Ball {
    constructor(app) {
        this.app = app
        this.stage = app.stage
        this.height = 4
        this.width = 4
        this.speed = 5

        this.moveTimeout = null

        this.el = document.createElement('div')
        this.el.style.position = 'absolute'
        this.el.style.height = getSize(this.height)
        this.el.style.width = getSize(this.width)
        this.el.style.background = theme.PRIMARY

        this.reset()
    }

    move() {
        if (this.top <= 0 || this.top >= this.stage.height - this.height) {
            this.vector[1] = -this.vector[1]
            beep()
        } else if (this.hasHitBat()) {
            this.calculateNewVector()
            this.direction = this.direction === 'left' ? 'right' : 'left'
            beep()
        } else if (this.left <= 0 || this.left >= this.stage.width - this.width) {
            const scorePosition = this.direction === 'left' ? 'right' : 'left'
            this.stage.scores[scorePosition].add()
            this.app.reset()
            return
        }
        this.left += this.vector[0]
        this.top += this.vector[1]
        this.updatePosition()
        this.moveTimeout = setTimeout(this.move.bind(this), this.speed)
    }

    reset() {
        this.left = this.stage.width / 2 - this.width / 2
        this.top = this.stage.height / 2 - this.height / 2
        this.vector = [1, 0]
        this.direction = 'right'
        clearTimeout(this.moveTimeout)
        this.updatePosition()
    }

    hasHitBat() {
        const bat = this.stage.bats[this.direction]
        if (this.direction === 'left' && this.left > bat.width + bat.offset) {
            return false
        }
        if (this.direction === 'right' && this.left < this.stage.width - bat.width - bat.offset) {
            return false
        }
        if (this.top <= bat.top - this.height || this.top >= bat.top + bat.height + this.height) {
            return false
        }
        return true
    }

    calculateNewVector() {
        const direction = this.direction === 'right' ? -1 : 1
        const bat = this.stage.bats[this.direction]
        const hitValue = (this.top - bat.top + this.height / 2) / bat.height
        const angle = 0.2 * Math.PI + 0.6 * Math.PI * hitValue
        this.vector[0] = Math.sin(angle) * direction
        this.vector[1] = -Math.cos(angle)
    }

    updatePosition() {
        this.el.style.transform = `translateX(${getSize(this.left)}) translateY(${getSize(this.top)})`
    }
}

class Stage {
    constructor(app) {
        this.height = 200
        this.width = 200
        this.bats = {}
        this.scores = {}
        this.message = null

        this.el = document.createElement('div')
        this.el.style.position = 'relative'
        this.el.style.height = getSize(this.height)
        this.el.style.width = getSize(this.width)
        this.el.style.background = theme.BACKGROUND
        app.el.appendChild(this.el)
    }

    addBat(position, bat) {
        this.bats[position] = bat
        this.el.appendChild(bat.el)
    }

    addScore(position, score) {
        this.scores[position] = score
        this.el.appendChild(score.el)
    }

    addBall(ball) {
        this.el.appendChild(ball.el)
    }

    addMessage(message) {
        this.el.appendChild(message.el)
    }
}

class App {
    constructor(selector) {
        this.el = document.querySelector(selector)
        this.players = {}
        this.playing = false
    }

    setupStage() {
        this.stage = new Stage(this)
        this.createPlayer('left')
        this.createPlayer('right')
        this.ball = new Ball(this)
        this.stage.addBall(this.ball)
        this.message = new Message()
        this.stage.addMessage(this.message)
        this.initListeners()
    }

    createPlayer(position) {
        const bat = new Bat(position, this.stage)
        const score = new Score(position)
        this.stage.addBat(position, bat)
        this.stage.addScore(position, score)
        this.players[position] = new Player(bat, score)
    }

    reset() {
        this.playing = false
        this.ball.reset()
        this.message.reset()
        Object.keys(this.stage.bats).forEach(key => {
            this.stage.bats[key].reset()
        })
    }

    play() {
        this.playing = true
        this.message.hide()
        this.ball.move()
    }

    initListeners() {
        window.addEventListener('keydown', this.handleInput.bind(this))
        window.addEventListener('keyup', this.handleInput.bind(this))
    }

    handleInput(event) {
        // Ignore auto-repeated keydown events
        if (event.repeat) {
            return
        }
        if (!this.playing) {
            if (event.key === 'Enter') {
                this.play()
            }
            return
        }
        const stop = event.type === 'keyup'
        switch (event.key) {
            case 'ArrowUp':
                this.players.right.moveUp(stop);
                break
            case 'ArrowDown':
                this.players.right.moveDown(stop);
                break
            case 'w':
                this.players.left.moveUp(stop);
                break
            case 's':
                this.players.left.moveDown(stop);
                break
        }
    }
}

const app = new App('#app')
app.setupStage()