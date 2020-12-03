import React from 'react';
import {render} from '@testing-library/react';
import App from './components/App';
import {HashRouter} from "react-router-dom";

test('renders app', () => {
    const {getAllByText} = render(<HashRouter><App/></HashRouter>);
    const appTitle = getAllByText(/EECS Course Scheduler/i);
    for (const htmlElement of appTitle) {
        expect(htmlElement).toBeInTheDocument()
    }
});
