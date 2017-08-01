## Website Performance Optimization portfolio project

### Installation

Run the following commands in the terminal:

`git clone https://github.com/joseph-wagner/frontend-nanodegree-mobile-portfolio.git`

`cd frontend-nanodegree-mobile-portfolio`

Open up `index.html` in the browser.

### Grunt Instructions

To perform the linting and minifying operations through Grunt, run the following commands in the root directory:

`npm install`

`grunt lint`

### Optimizations to index.html

-Compressed images

-Inlined the CSS

-Minified JS

-Made JS loading async

-Moved `<script>` to end of HTML

-Removed unnecessary HTML/CSS

### Optimizations to main.js

-Moved layout trigger `document.body.scrollTop` outside of loop

-Refactored `determineDx` to `determineWidth` to simply return the new width

-Moved `newWidth` outside the loop in `changePizzaSlices`

-Changed background pizzas from 200 to a dynamic amount depending on viewport size

-Changed `querySelector` and `querySelectorAll` tags to `getElementByID` and `getElementsByClass`

-Moved some variable declarations outside loops

### Original Udacity Project
[Github source for Udacity Project](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)