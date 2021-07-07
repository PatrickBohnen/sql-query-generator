import React from 'react';

class FilterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterField: 'userEmail'};
        this.updateFilterField = this.updateFilterField.bind(this);
    }
    
    updateFilterField(event) {
        this.setState({filterField: event.target.value});
    }

    render() {
        let isInt = this.state.filterField === 'screenWidth'
        || this.state.filterField === 'screenHeight'
        || this.state.filterField === 'numberOfVisits' 
        || this.state.filterField === 'pageResponseTime';
        return(
            <form className={isInt ? 'intFilterForm' : 'stringFilterForm'}>
                <select className='filter-field' name='filterField' onChange={this.updateFilterField}>
                    <option value='userEmail'>User Email</option>
                    <option value='screenWidth'>Screen Width</option>
                    <option value='screenHeight'>Screen Height</option>
                    <option value='numberOfVisits'>Number of Visits</option>
                    <option value='firstName'>First Name</option>
                    <option value='lastName'>Last Name</option>
                    <option value='pageResponseTime'>Page Response Time (ms)</option>
                    <option value='domain'>Domain</option>
                    <option value='pagePath'>Page Path</option>
                </select>
                {isInt ? <IntegerConditions filterField={this.state.filterField} /> : <StringConditions filterField={this.state.filterField} />}
            </form>
        );
    }
};

class IntegerConditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterOperator: 'equalTo'};
        this.updateFilterOperator = this.updateFilterOperator.bind(this);
    }
    
    updateFilterOperator(event) {
        this.setState({filterOperator: event.target.value});
    }
    render() {
        let isBetween = this.state.filterOperator === 'between';
        return(
            <div className={isBetween ? 'is-between' : ''}>
                <span className='staticText'>is</span>
                <select name='filterOperator' onChange={this.updateFilterOperator}>
                    <option value='equalTo'>equal to</option>
                    <option value='between'>between</option>
                    <option value='greaterThan'>greater than</option>
                    <option value='lessThan'>less than</option>
                    <option value='inList'>in list</option>
                </select>
                {isBetween ? (
                    <div>
                        <input type='number' name='intFloor' placeholder='0'></input>
                        <span className='staticText'>and</span>
                        <input type='number' name='intCeiling' placeholder='0'></input>
                    </div>        
                ) : (
                    <input type='number' name='intSingle' placeholder='0'></input>
                )}
            </div>
        );
    }
};

const StringConditions = (props) => {
    let optionPlaceholder;
    if (props.filterField === 'userEmail') {
        optionPlaceholder = 'example@email.com';
    } else if (props.filterField === 'firstName') {
        optionPlaceholder = 'First Name';
    } else if (props.filterField === 'lastName') {
        optionPlaceholder = 'Last Name';
    } else if (props.filterField === 'domain') {
        optionPlaceholder = 'Domain';
    } else if (props.filterField === 'pagePath') {
        optionPlaceholder = 'Page Path';
    }
    return (
        <div>
            <select name='filterOperator'>
                <option value='equalTo'>equals</option>
                <option value='contains'>contains</option>
                <option value='startsWith'>starts with</option>
                <option value='inList'>in list</option>
            </select>
            <input type='text' name='stringSingle' placeholder={optionPlaceholder ? optionPlaceholder : 'Search sessions.'}></input>
        </div>
    );
};

export default FilterDetails;