import React from 'react';
import FilterDetails from './filterDetails';
import closeXIcon from '../icons/close-x.svg';

let queryKeyNum = 1;

const initialQueryBox = [
    {id: 'queryBox-' + queryKeyNum.toString()}
];

function SearchConditions() {
    const [queryBoxes, updateQueryBoxes] = React.useState(initialQueryBox);

    function addQueryBox() {
        queryKeyNum += 1;
        const addQueryBox = queryBoxes.concat({ id: 'queryBox-' + queryKeyNum.toString() });
        updateQueryBoxes(addQueryBox);
    };

    function removeQueryBox(targetCondition) {
        if (queryBoxes.length > 1) {
            const removeQueryBox = queryBoxes.filter((key) => key.id !== targetCondition);
            updateQueryBoxes(removeQueryBox);
        } else {
            queryKeyNum += 1;
            const clearQueryBox = [
                {id: 'queryBox-' + queryKeyNum.toString()}
            ];
            updateQueryBoxes(clearQueryBox);
        }
    }
    
    function changeSearchConditionContainerHeight()

    return(
        <ul className='search-conditions'>
            {queryBoxes.map((key) => (
                <li className='query-condition' key={key.id} id={key.id}>
                    <button className='remove-filter' boxid={key.id} onClick={() => removeQueryBox(key.id)}><img alt='' src={closeXIcon} /></button>
                    <FilterDetails />
                </li>
            ))}
            <button className='qp-button and-button' onClick={addQueryBox}>And</button>
        </ul>
    );
};

export default SearchConditions;