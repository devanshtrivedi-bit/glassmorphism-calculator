# 📚 Code Guide & Explanation

Welcome to the Code Guide! This file is meant to help you (or anyone exploring your repository) understand exactly how this Glassmorphism Calculator was built.

We used three main languages:
1. **HTML (The Skeleton)** - Defines the buttons, layout, and structure.
2. **CSS (The Paint & Style)** - Makes it look like frosted glass and adds premium animations.
3. **JavaScript (The Brain)** - Does the actual math calculations and plays the sound.

Here is a simple breakdown of how each file works behind the scenes.

---

## 1. HTML (`index.html`)
This file builds the basic structure of the webpage.

- **`<head>` section:** 
  - We import our font (`Outfit`) from Google Fonts.
  - We link our CSS file (`<link rel="stylesheet" href="style.css">`).
  - We import `math.js` via a CDN (Content Delivery Network). This is a powerful open-source library that does the heavy math lifting for us so we don't have to manually write logic for sine, cosine, or order of operations (BODMAS).
  
- **`<div class="background">`:**
  - This holds the three floating colorful circles (`shape-1`, `shape-2`, `shape-3`) that sit *behind* the calculator.
  
- **`<div class="calculator">`:**
  - The main container for our calculator. Inside, it has two parts:
    1. **Display:** Shows the previous operand (history) and the current operand (what you are typing right now).
    2. **Buttons:** A grid of buttons. Notice how we use `data-value="7"` or `data-action="clear"`. These are custom HTML attributes (`data-*`). They make it very easy for JavaScript to know *which* button was pressed without relying on the visible text.

---

## 2. CSS (`style.css`)
This file is responsible for the ultra-premium Cyberpunk Glassmorphism look.

- **Glassmorphism Effect:**
  - To make the calculator look like a thick piece of frosted glass, we use these two key lines of CSS on `.calculator`:
    ```css
    background: linear-gradient(...); /* A very faint, semi-transparent white/gray background */
    backdrop-filter: blur(35px) saturate(200%); /* The magic blur effect */
    ```
    This blurs whatever elements are placed *behind* the calculator (the floating shapes).

- **The Liquid Aurora Lights (`.calculator::before` and `::after`):**
  - Instead of standard solid colors, we used CSS "pseudo-elements" (`::before` and `::after`) to create two huge radial gradients (circular colors) *inside* the calculator glass. 
  - We then applied an animation (`@keyframes`) that slowly rotates and translates these colors, making it look like liquid aurora light is trapped inside the glass.

- **3D Depth (Shadows):**
  - We use `box-shadow` creatively. An `inset` shadow makes the screen look recessed (pushed inwards), while a regular heavy `box-shadow` on the main container makes the calculator look like it's floating above the background.

---

## 3. JavaScript (`script.js`)
This is where the magic happens. It handles logic, clicks, and sounds.

- **Web Audio API (`playClickSound` function):**
  - Instead of downloading and playing an `.mp3` file (which can be slow to load), we generate a sound wave from scratch using the browser's built-in synthesizer (`AudioContext`). It creates a high-frequency sine wave that drops rapidly to zero in just 50 milliseconds, creating a highly satisfying mechanical "tick" sound.

- **The `ScientificCalculator` Class:**
  - A `class` in Object-Oriented Programming is like a blueprint. It holds our data (current number, previous number) and our functions.
  - `appendValue()`: Adds a number to the screen string.
  - `delete()`: Removes the last typed character.
  - `clear()`: Resets everything to 0.
  - `calculate()`: This is the most important function. It takes the text string (e.g., `sin(30) + 5`) and passes it directly into `math.evaluate()`. The `math.js` library safely processes the equation and returns the correct answer instantly.

- **Event Listeners:**
  - `document.querySelectorAll('button').forEach(...)`: This grabs every single button on the page and tells it to listen for a `'click'`. When clicked, it plays the tick sound and sends the button's `data-value` to the calculator class.
  - `document.addEventListener('keydown', ...)`: This listens to your physical keyboard. If you press a number, `+`, `-`, or even `Enter`, it matches that key to a calculator function so you don't even have to use your mouse!

---
*Created as a premium portfolio project. Happy Coding!* 🚀
