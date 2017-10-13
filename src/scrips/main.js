/**
 * main styles:
 */
import css from './../styles/main.scss';

/**
 * React Component:
 */
import configureStore from './redux/store/configureStore';
import { render, renderFactory } from './ultilities/render';
import Headline from './components/_common/Headline';
import PlusOne from './components/plus-one/PlusOne';

const app = (config) => {
    const store = configureStore(config);

    render(Headline, document.querySelector('#root'));
    renderFactory(PlusOne, document.querySelectorAll('.plus-one'), {}, store);
};

app(window.config);
