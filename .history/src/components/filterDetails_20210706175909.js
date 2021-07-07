import React from 'react';

class FilterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterField: 'userEmail'};
        this.updateFilterField = this.updateFilterField.bind(this);
    }
    
    updateFilterField(e) {
        this.setState({filterField: e.target.value});
    }

    render() {
        let isInt = this.state.filterField === 'screen_width'
        || this.state.filterField === 'screen_height'
        || this.state.filterField === 'visits' 
        || this.state.filterField === 'page_response';
        return(
            <form className={isInt ? 'intFilterForm' : 'stringFilterForm'}>
                <select className='filter-field' name='filterField' onChange={this.updateFilterField}>
                    <option value='user_email'>User Email</option>
                    <option value='screen_width'>Screen Width</option>
                    <option value='screen_height'>Screen Height</option>
                    <option value='visits'>Number of Visits</option>
                    <option value='user_first_name'>First Name</option>
                    <option value='user_last_name'>Last Name</option>
                    <option value='page_response'>Page Response Time (ms)</option>
                    <option value='domain'>Domain</option>
                    <option value='path'>Page Path</option>
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
                <select className='filter-operator' name='filterOperator' onChange={this.updateFilterOperator}>
                    <option value='equalTo'>equal to</option>
                    <option value='between'>between</option>
                    <option value='greaterThan'>greater than</option>
                    <option value='lessThan'>less than</option>
                    <option value='inList'>in list</option>
                </select>
                <IntegerInputs operatorValue={this.state.filterOperator} />
            </div>
        );
    }
};

const IntegerInputs = (props) => {
    if (props.filterOperator === 'between') {
        return (
            <div>
            <input className='int-floor' type='number' name='intFloor' placeholder='0'></input>
            <span className='staticText'>and</span>
            <input className='int-ceiling' type='number' name='intCeiling' placeholder='0'></input>
        </div> 
        );
    } else if (props.filterOperator === 'between') {
    // {isBetween ? (
    //     <div>
    //         <input className='int-floor' type='number' name='intFloor' placeholder='0'></input>
    //         <span className='staticText'>and</span>
    //         <input className='int-ceiling' type='number' name='intCeiling' placeholder='0'></input>
    //     </div>        
    // ) : (
    //     <input className='query-input' type='number' name='intSingle' placeholder='0'></input>
    // )}
}

const StringConditions = (props) => {
    let optionPlaceholder;
    if (props.filterField === 'user_email') {
        optionPlaceholder = 'example@email.com';
    } else if (props.filterField === 'user_first_name') {
        optionPlaceholder = 'First Name';
    } else if (props.filterField === 'user_last_name') {
        optionPlaceholder = 'Last Name';
    } else if (props.filterField === 'domain') {
        optionPlaceholder = 'Domain';
    } else if (props.filterField === 'path') {
        optionPlaceholder = 'Page Path';
    }

    // checkFor
    return (
        <div>
            <select className='filter-operator' name='filterOperator'>
                <option value='equalTo'>equals</option>
                <option value='contains'>contains</option>
                <option value='startsWith'>starts with</option>
                <option value='inList'>in list</option>
            </select>
            <input className='query-input' type='text' name='stringSingle' placeholder={optionPlaceholder ? optionPlaceholder : 'Search sessions.'}></input>
        </div>
    );
};

export default FilterDetails;