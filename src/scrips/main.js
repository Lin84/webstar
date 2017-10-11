import css from './../styles/main.scss';
import { render } from './ultilities/render';
import Headline from './components/_common/Headline';

const app = (config) => {
    // const store = configureStore(config);
    render(Headline, document.querySelector('#root'));
};

app(window.config);
