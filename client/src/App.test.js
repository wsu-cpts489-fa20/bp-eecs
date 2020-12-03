import React from 'react';
import {render} from '@testing-library/react';
import App from './components/App';
import {MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from 'history';

test('renders app', () => {
    const {getAllByText} = render(<MemoryRouter><App/></MemoryRouter>);
    const appTitle = getAllByText(/EECS Course Scheduler/i);
    for (const htmlElement of appTitle) {
        expect(htmlElement).toBeInTheDocument()
    }
});

test('logged-out redirect works', () => {
    for (const path of ["/", "/eecs", "/does-not-exist"]) {
        const history = createMemoryHistory();
        history.push(path);
        render(<Router history={history}><App/></Router>);
        expect(history.location.pathname).toBe("/login");
    }
});
