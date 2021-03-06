import React from 'react';

class FilterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterField: 'user_email'};
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
        let isList = this.state.filterOperator === 'inList';

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
                {isBetween ? (
                    <div>
                        <input className='int-floor' type='number' name='intFloor' placeholder='0'></input>
                        <span className='staticText'>and</span>
                        <input className='int-ceiling' type='number' name='intCeiling' placeholder='0'></input>
                    </div>        
                ) : (
                    <input className='query-input' type={isList ? 'text' : 'number'} name='intSingle' placeholder={isList ? 'Comma,Seperated,Values' : '0'}></input>
                )}
            </div>
        );
    }
};

class StringConditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterOperator: 'equalTo'};
        this.updateFilterOperator = this.updateFilterOperator.bind(this);
    }

    updateFilterOperator(event) {
        this.setState({filterOperator: event.target.value});
    }

    render() {
        let isList = this.state.filterOperator === 'inList';
        let optionPlaceholder;
        if (this.props.filterField === 'user_email') {
            optionPlaceholder = 'example@email.com';
        } else if (this.props.filterField === 'user_first_name') {
            optionPlaceholder = 'First Name';
        } else if (this.props.filterField === 'user_last_name') {
            optionPlaceholder = 'Last Name';
        } else if (this.props.filterField === 'domain') {
            optionPlaceholder = 'Domain';
        } else if (this.props.filterField === 'path') {
            optionPlaceholder = 'Page Path';
        } else {
            optionPlaceholder = 'Search Value';
        }

        // checkFor
        return (
            <div>
                <select className='filter-operator' name='filterOperator' onChange={this.updateFilterOperator}>
                    <option value='equalTo'>equals</option>
                    <option value='contains'>contains</option>
                    <option value='startsWith'>starts with</option>
                    <option value='inList'>in list</option>
                </select>
                <input className='query-input' type='text' name='stringSingle' placeholder={isList ? 'Comma,Seperated,Values' : optionPlaceholder}></input>
            </div>
        );
    } 
};

export default FilterDetails;