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

/**
 * @param {object} config
 */
const app = config => {
    const store = configureStore(config);

    // Demo render react component once:
    render(Headline, document.querySelector('#headline'), { label: 'Hello' });

    // Demo render react component more times:
    renderFactory(Link, document.querySelectorAll('.link'));

     // Demo render react component connected to the Redux store:
    renderFactory(PlusOne, document.querySelectorAll('.plus-one'), {}, store);

     // Demo testing react component with jest and enzyme:
    renderFactory(Button, document.querySelectorAll('.button'), {
        class: 'btn btn-primary',
        label: 'Submit',
        handleClick: () => { console.log('Click') }
    });
};

app(window.config);
