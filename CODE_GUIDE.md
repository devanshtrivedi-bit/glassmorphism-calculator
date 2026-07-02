# 📚 Detailed Code Guide & Explanation

Welcome to the Code Guide! This file explains exactly how this Glassmorphism Calculator was built and how the logic works behind the scenes. 

---

## 🎨 1. The Design (HTML & CSS)

- **HTML (The Structure):** We created a grid of buttons. Every button has a special `data-value` or `data-action` attribute. For example, `<button data-value="7">7</button>`. This makes it easy for JavaScript to know exactly what was pressed without relying on the visible text.
- **CSS (The Glass Look):** We used `backdrop-filter: blur(35px)` to make the calculator container act like frosted glass. We also created two huge, animated glowing circles (`::before` and `::after`) inside the calculator to give it that "Liquid Aurora" shine.

---

## 🧠 2. How the Calculator Logic Works (JavaScript)

The most important part of this project is the JavaScript (`script.js`). Here is a step-by-step explanation of how addition, multiplication, and number entry actually work.

### A. How do numbers get on the screen?
When you click a button (like `7`), here is the exact sequence of events:

1. **Catching the Click:** At the bottom of `script.js`, we have this code:
   ```javascript
   document.querySelectorAll('button[data-value]').forEach(button => {
       button.addEventListener('click', () => {
           calculator.appendValue(button.dataset.value);
       });
   });
   ```
   This code tells the browser: *"Find every button that has a `data-value`. If it gets clicked, take that value (like '7') and send it to the `appendValue` function."*

2. **Storing the Number:** Inside the `ScientificCalculator` class, the `appendValue(val)` function takes that '7' and adds it to a string called `this.expression`. 
   If you press `7` and then `5`, `this.expression` becomes the text string `"75"`.

3. **Updating the Display:** Finally, it calls `this.updateDisplay()`, which simply takes whatever text is in `this.expression` and prints it onto the physical calculator screen so you can see it.

### B. How do Addition, Multiplication, and other operations work?
If you want to do `75 + 25`, you press the `+` button, then `2`, then `5`.

Because we are using the **`math.js`** library, we do not have to write complex logic to remember which number is which. Instead, we just keep adding text to our `this.expression` string!

1. When you press `+`, it adds `+` to the string: `"75+"`
2. When you press `25`, it adds `25` to the string: `"75+25"`

The calculator screen literally just shows the text string equation you are building.

### C. How is the final answer calculated?
When you press the `=` (Equals) button, it triggers the `calculate()` function.

```javascript
calculate() {
    // 1. We pass our text string ("75+25") into math.evaluate()
    const result = math.evaluate(this.expression);
    
    // 2. The screen updates to show the result (100)
    this.displayValue = result.toString();
}
```

**Why use `math.evaluate()`?**
If a user types a very complex equation like `5 + 10 * 2`, standard JavaScript might get confused if we try to program it manually (it might add 5+10 first, then multiply by 2). 

But `math.evaluate("5+10*2")` is incredibly smart. It automatically knows the rules of math (**BODMAS / PEMDAS**). It knows it must multiply `10 * 2` first (20), and then add `5` to get `25`. It also automatically handles things like `sin(30)`, square roots, and percentages flawlessly!

---

### 🔊 3. How the "Tick" Sound Works
Normally, websites download an `.mp3` file to play a sound. We didn't do that. 

Instead, we used the browser's native **Web Audio API**:
```javascript
oscillator.type = 'sine'; 
oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
```
This code tells your computer's sound card to generate a high-pitched beep (`800 Hz`) and immediately drop it to a low pitch (`100 Hz`) in just 50 milliseconds (`0.05` seconds). This creates a highly realistic, satisfying mechanical "tick" sound completely through math and code, without ever downloading an audio file!
