// Web Audio API for a crisp, modern button click sound
let audioCtx;

function playClickSound() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05); 
}

class ScientificCalculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.clear();
    }

    clear() {
        this.expression = '';
        this.displayValue = '0';
        this.evaluated = false;
        this.updateDisplay();
    }

    delete() {
        if (this.evaluated) {
            this.clear();
            return;
        }
        if (this.expression.length > 0) {
            this.expression = this.expression.slice(0, -1);
            this.displayValue = this.expression || '0';
            this.updateDisplay();
        }
    }

    appendValue(val) {
        if (this.evaluated) {
            this.expression = '';
            this.evaluated = false;
        }
        if (this.displayValue === '0' && val !== '.' && !isNaN(val)) {
            this.expression = val;
        } else {
            this.expression += val;
        }
        this.displayValue = this.expression;
        this.updateDisplay();
    }

    negate() {
        if (this.evaluated) this.evaluated = false;
        if (this.expression) {
            if (this.expression.startsWith('-(') && this.expression.endsWith(')')) {
                this.expression = this.expression.slice(2, -1);
            } else {
                this.expression = `-(${this.expression})`;
            }
            this.displayValue = this.expression;
            this.updateDisplay();
        }
    }

    calculate() {
        if (!this.expression) return;
        
        try {
            const result = math.evaluate(this.expression);
            const formattedResult = math.format(result, { precision: 12 });
            
            this.previousElement.innerText = this.formatDisplay(this.expression) + ' =';
            this.displayValue = formattedResult.toString();
            this.expression = this.displayValue; 
            this.evaluated = true;
            
        } catch (error) {
            this.previousElement.innerText = this.formatDisplay(this.expression) + ' =';
            this.displayValue = 'Error';
            this.expression = '';
            this.evaluated = true;
        }
        
        this.currentElement.innerText = this.displayValue;
    }

    formatDisplay(expr) {
        return expr
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/sqrt\(/g, '√(')
            .replace(/pi/g, 'π')
            .replace(/log10\(/g, 'log(');
    }

    updateDisplay() {
        this.currentElement.innerText = this.formatDisplay(this.displayValue);
        
        if (!this.evaluated) {
            this.previousElement.innerText = '';
        }
    }
}

const calculator = new ScientificCalculator(
    document.getElementById('previous-operand'),
    document.getElementById('current-operand')
);

function handleInteraction() {
    if(navigator.vibrate) navigator.vibrate(20);
    playClickSound();
}

document.querySelectorAll('button[data-value]').forEach(button => {
    button.addEventListener('click', () => {
        handleInteraction();
        calculator.appendValue(button.dataset.value);
    });
});

document.querySelectorAll('button[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        handleInteraction();
        const action = button.dataset.action;
        if (action === 'clear') calculator.clear();
        if (action === 'delete') calculator.delete();
        if (action === 'calculate') calculator.calculate();
        if (action === 'negate') calculator.negate();
    });
});

// Keyboard support
document.addEventListener('keydown', e => {
    const validKeys = '0123456789.+-*/^%()!';
    let handled = false;
    
    if (validKeys.includes(e.key)) {
        calculator.appendValue(e.key);
        handled = true;
    }
    else if (e.key === 'p') { calculator.appendValue('pi'); handled = true; }
    else if (e.key === 'e') { calculator.appendValue('e'); handled = true; }
    else if (e.key === 's') { calculator.appendValue('sin('); handled = true; }
    else if (e.key === 'c') { calculator.appendValue('cos('); handled = true; }
    else if (e.key === 't') { calculator.appendValue('tan('); handled = true; }
    
    else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.calculate();
        handled = true;
    }
    else if (e.key === 'Backspace') {
        calculator.delete();
        handled = true;
    }
    else if (e.key === 'Escape') {
        calculator.clear();
        handled = true;
    }

    if (handled) {
        playClickSound();
    }
});
