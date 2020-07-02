# command-line-triangle-game
A program to play Don't Make A Triangle

Using the minimax algorithm and a few more weaker ones, this program plays Don't Make A Triangle, explained nicely at https://mathforlove.com/wp-content/uploads/2018/09/HinduPuzzle13.pdf.

## NPM scripts

From the project directory, you can run the following commands:

### `npm run build`
Builds the code in the `src/` directory using the TypeScript compiler and Babel. Equivalent to `npm run build:types && npm run build:js`.

### `npm run start`
Runs the code from the `build/` directory. Equivalent to `node build/`.

### `npm run test`
Tests the code in the `build/` directory using Jest. Equivalent to `jest`.

### `npm run type-check`
Type check all .ts files without compiling them.

#### `npm run type-check:watch`
Type check all .ts files **on save** without compiling them.

### `npm run build:types`
Builds only the type declarations.

### `npm run build:js`
Build all the .ts files in `src/`
