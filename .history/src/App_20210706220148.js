import './styles/app.css';
import SearchConditions from './components/searchConditions.js';
import SearchIcon from './icons/search.svg';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResetCount: 0};
    this.resetSearch = this.resetSearch.bind(this);
  }
  
  resetSearch() {
    this.setState({searchResetCount: Math.random()});
  }
  generateQuery() {
    const queryConditions = document.getElementsByClassName('query-condition');
    let sqlResult = 'SELECT * FROM session<br />';
    for (let i = 0; i < queryConditions.length; i++) {
      let filterField = queryConditions[i].getElementsByClassName('filter-field')[0].value;
      let filterOperator = queryConditions[i].getElementsByClassName('filter-operator')[0].value;
      let singleInput;
      if (filterOperator !== 'between') {
        singleInput = queryConditions[i].getElementsByClassName('query-input')[0].value;
      }

      if (i === 0) {
        sqlResult = sqlResult + 'WHERE ' + filterField;
      } else {
        sqlResult = sqlResult + 'AND ' + filterField;
      }

      if (filterOperator === 'equalTo') {
        sqlResult = sqlResult + ' = \'' + singleInput + '\'';
      } else if (filterOperator === 'greaterThan') {
        sqlResult = sqlResult + ' > \'' + singleInput + '\'';
      } else if (filterOperator === 'lessThan') {
        sqlResult = sqlResult + ' < \'' + singleInput + '\'';
      } else if (filterOperator === 'contains') {
        sqlResult = sqlResult + ' LIKE \'%' + singleInput + '%\'';
      } else if (filterOperator === 'startsWith') {
        sqlResult = sqlResult + ' LIKE \'' + singleInput + '%\''
      } else if (filterOperator === 'inList') {
        let listItems = singleInput.split(',');
        sqlResult = sqlResult + ' IN (';
        for (let x = 0; x < listItems.length )
      } else if (filterOperator === 'between') {
        sqlResult = sqlResult + ' BETWEEN \'' + queryConditions[i].getElementsByClassName('int-floor')[0].value + '\' AND \'' + queryConditions[i].getElementsByClassName('int-ceiling')[0].value;
      }
      
      if (i !== (queryConditions.length - 1)) {
        sqlResult = sqlResult + '<br />';
      } else {
        sqlResult = sqlResult + ';';
      }
    }
    document.getElementById('sqlResult').innerHTML = sqlResult;
  }
  render() {
    return (
      <div className="session-search-module">
        <h2>Search for Sessions</h2>
        <SearchConditions key={this.state.searchResetCount} />
        <hr />
        <div className='button-container'>
          <button className='qp-button search-button' onClick={this.generateQuery}><img alt='' src={SearchIcon} /><span>Search</span></button>
          <button className='qp-button reset-button' onClick={this.resetSearch}>Reset</button>
        </div>
        <p id='sqlResult' className='sql-result'></p>
      </div>
    );
  } 
}

export default App; 
