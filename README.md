# webstar
development starter kit with webpack 3

## Getting started
### Preparations
1. This development stack uses [Node](https://nodejs.org), so make sure you have it installed.
2. Install [Webpack](https://webpack.js.org/) globally:
```bash
npm install -g webpack
```
### Setup
1. Clone the repository: `git clone https://git@github.com:Lin84/webstar.git ./PROJECT_NAME`

2. Install package dependencies with `npm install` under the root of your `PROJECT_NAME` folder.

3. **Configure the project**. Do not forget to change the respective keys in `package.json` according to your project’s info, and setup **a unique listening port** in `./webpack.config.js`.

## Workflow
### Development
To start your development process, run `npm run dev` in the terminal.

### Remove built targets
If you want to revert back to a fresh state without built files, run

```sh
npm clean
```

### Production build
To prepare production-ready files, run `npm run build` and grab built assets from `dist` folder.
