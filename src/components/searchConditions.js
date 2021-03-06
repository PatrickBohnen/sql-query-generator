import React from 'react';
import FilterDetails from './filterDetails';
import closeXIcon from '../icons/close-x.svg';

let queryKeyNum = 1;
let searchContainerRandId = 'search-condition' + Math.random();

const initialQueryBox = [
    {id: 'queryBox-' + queryKeyNum.toString()}
];

function SearchConditions() {
    const [queryBoxes, updateQueryBoxes] = React.useState(initialQueryBox);

    function addQueryBox() {
        queryKeyNum += 1;
        const addQueryBox = queryBoxes.concat({ id: 'queryBox-' + queryKeyNum.toString() });
        updateQueryBoxes(addQueryBox);
        changeSearchContainerHeight(1);
    };

    function removeQueryBox(targetCondition) {
        if (queryBoxes.length > 1) {
            const removeQueryBox = queryBoxes.filter((key) => key.id !== targetCondition);
            updateQueryBoxes(removeQueryBox);
            changeSearchContainerHeight(-1);
        } else {
            queryKeyNum += 1;
            const clearQueryBox = [
                {id: 'queryBox-' + queryKeyNum.toString()}
            ];
            updateQueryBoxes(clearQueryBox);
            changeSearchContainerHeight(0);
        }
        
    }
    
    //Sets inline height on the search container to create transitions 
    function changeSearchContainerHeight(modifier) {
        const searchContainer = document.getElementsByClassName(searchContainerRandId)[0];
        let numOfConditions = queryBoxes.length;
        let containerHeight = ((numOfConditions + modifier) * 80) + 102;
        
        if (searchContainer) {
            searchContainer.style.height = containerHeight + 'px';
        }
    }

    return(
        <ul className={searchContainerRandId}>
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