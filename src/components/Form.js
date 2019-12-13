import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
    state = {
        searchTerm: ''
    }

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    render() {
        const { searchTerm } = this.state;
        const isValid = /^\w+,(\s{1})?[a-zA-Z]{2}$/.test(searchTerm);
        return (
            <div className='top'>
                <img className='logo' src={require('./index.png')} alt='logo'/>
                <h2 className='title'>Weather App</h2>
                <form onSubmit={this.props.loadWeather}>
                    <input 
                        type='text' 
                        name='location' 
                        placeholder='Toronto, CA'
                        value={searchTerm} 
                        onChange={this.handleChange}
                    />
                    <button disabled={!isValid}>Search</button>
                </form>
                {!isValid && searchTerm.length > 0? (
                    <span className='errors'>City must be followed by Country Code (e.g. Toronto, CA)</span> ):
                    (null)
                }
            </div>            
        );
    }
}

export default Form;