# mz-mastermind-vanilla

A simplified MasterMind game written in Vanilla JavaScript.

## Usage

- Download the repository, redirect in your browser to the `index.html` absolute file path.
- Or `$ npx serve` or any of such kind.

## Development

- [x] MVC like pattern (for simplicity)
- [x] Small _Templating_ (to avoid reinventing a framework)
- [x] Mostly Functional Programming (faster to implement, maintain)
- [x] Slightly ES6 (it is modern days)
- [x] SCSS (using [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass))

## Cheating

- Enter `game.state.code.values` in DevTools Console. (prints the hidden code)
- Enter `game.playerSettings.shuffleScores = false` in DevTools Console. (disable score randomizing)
- Enter `game.end(true)` in DevTools Console. (win)
- Enter `game.end(false)` in DevTools Console. (lose)
