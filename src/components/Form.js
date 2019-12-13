import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
    state = {
        searchTerm: ''
    };

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value});
    };

    render() {
        const { searchTerm } = this.state;
        // Validate input with regex
        // Word followed by comma and two letters for country code
        const isValid = /^\w+,(\s{1})?[a-zA-Z]{2}$/.test(searchTerm);
        return (
            <div className='top'>
                {/*Header*/}
                <img className='logo' src={require('./index.png')} alt='logo'/>
                <h2 className='title'>Weather App</h2>
                <form className='weatherForm' onSubmit={this.props.loadWeather}>
                    <input 
                        className='cityInput'
                        type='text' 
                        name='location' 
                        placeholder='Toronto, CA'
                        value={searchTerm} 
                        onChange={this.handleChange}
                    />
                    <button className='submitButton' disabled={!isValid}>Search</button>
                </form>
                {/*Error if regex does not match*/}
                {!isValid && searchTerm.length > 0? (
                    <span className='errors'>City must be followed by Country Code (e.g. Toronto, CA)</span> ):
                    (null)
                }
            </div>            
        );
    };
};

export default Form;