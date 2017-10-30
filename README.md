# webstar
Development devstack with webpack 3 and Jest

## Getting started
### Preparations
1. This development stack uses [Node](https://nodejs.org), so make sure you have it installed.
2. Install [Webpack](https://webpack.js.org/) globally:

```bash
npm install -g webpack
```
### Setup
1. To clone the repository run in terminal:

```sh
git clone https://git@github.com:Lin84/webstar.git ./PROJECT_NAME
```

2. Under the root of your `PROJECT_NAME` folder install package dependencies by running in terminal:

 ```sh
npm install
```

3. **Configure the project**. Do not forget to change the respective keys in `package.json` according to your project’s info, and setup **a unique listening port** in `./webpack.config.js`.

## Workflow
### Development
To start your development process, in the terminal run:

```sh
npm run dev
```

### Remove built targets
If you want to revert back to a fresh state without built files, in the terminal run:

```sh
npm run clean
```

### Production build
To prepare production-ready files, grab built assets from `dist` folder after running in the terminal:

```sh
npm run build
```
## Testing with Jest
### Run basic test
in the terminal run:

```sh
npm run test
```
### Run test in watch mode
in the terminal run:

```sh
npm run test-w
```
### Run test in coverage mode
in the terminal run:

```sh
npm run test-c
```
### Run test in watch mode and coverage mode
in the terminal run:

```sh
npm run test-w-c
```
