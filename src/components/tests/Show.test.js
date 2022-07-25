import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import Episode from './../Episode';

const testData = {
    name: "some test",
    summary: "some summary",
    seasons: [
        {id: 1,
        name: "season 1",
        episodes: []},
        {id: 2,
            name: "season 2",
            episodes: []}
    ]
}

test('renders without errors', () => { 
    render(<Show show={testData} selectedSeason={"none"}/>)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason={"none"}/>);
    const loading = screen.queryByTestId("loading-container");
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testData} selectedSeason={"none"}/>); 
    const seasons = screen.queryAllByTestId("season-option");
    expect(seasons).toHaveLength(2)

});

test('handleSelect is called when an season is selected', () => { 
    const mockFetch = jest.fn();

    render(<Show show={testData} selectedSeason={"none"} handleSelect={mockFetch}/>);

    const myButton = screen.getByLabelText("Select A Season");
    userEvent.selectOptions(myButton, ['1']);
    
    expect(mockFetch).toHaveBeenCalledTimes(1);

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={testData} selectedSeason={"none"}/>);
    let component = screen.queryByTestId("episodes-container");
    expect(component).not.toBeInTheDocument();

    rerender(<Show show={testData} selectedSeason={1}/>)
    component = screen.queryByTestId("episodes-container");
    expect(component).toBeInTheDocument();
});
