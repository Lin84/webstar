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
import Link from './components/_common/Link';
import Button from './components/_common/Button';

const app = config => {
    const store = configureStore(config);

    render(Headline, document.querySelector('#headline'), { text: 'hello' });
    renderFactory(Link, document.querySelectorAll('.link'));
    renderFactory(PlusOne, document.querySelectorAll('.plus-one'), {}, store);
    renderFactory(Button, document.querySelectorAll('.button'), {
        class: 'btn btn-primary',
        label: 'Submit'
    });
};

app(window.config);
