import React, { Component } from 'react';
import Form from './components/Form';
import WeatherCard from './components/WeatherCard';
import WeatherMain from './components/WeatherMain';
import { Card } from 'semantic-ui-react';

const Api_Key = 'cdc9ae4340800eb75ceef0c4cc84bd8e';

const initialState = {
    cityInfo: {},
    today: {},
    results: [],
    searchTerm: 'Toronto, CA',
    error: '',
    avgPressure: 0
};

class App extends Component {
    state = initialState;

    componentDidMount() {
        this.getWeather();
    };

    getWeather = async (e) => {
        let loc;
        let city, country;

        if (e) {
            loc = e.target.elements.location.value;
            e.preventDefault();
        };


        if (loc && loc.indexOf(',') > -1) {
            [city, country] = loc.split(',')
        } else {
            [city, country] = this.state.searchTerm.split(',');
        };
        let resultTemp = [];

        if (city && country) {
            const api_call = await fetch( 
                `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${Api_Key}&units=metric`
            );
            const response = await api_call.json();
            
            let pressureSum = 0;
            for (let item in response.list) {
                pressureSum += response.list[item].main.pressure;
            };

            this.setState({avgPressure: pressureSum / response.list.length});

            for (let i = 0; i < response.list.length; i += 8) {
                if (i === 0) {
                    this.setState({today: response.list[i]});
                    this.setState({cityInfo: response.city});
                } else {
                    resultTemp.push(response.list[i])
                };
            };
            this.setState({results: resultTemp});
        } else {
            this.setState({error: 'Please enter the proper format for the search'})
        };
    };

    render() {
        const { results, today, cityInfo, avgPressure } = this.state;
        const days = results.map((day) => {
            return (
                <WeatherCard info={day} key={day.dt}/>
            );
        });

        return (
            <div>
                <Form loadWeather={this.getWeather}/>
                <WeatherMain 
                    today={today} 
                    cityInfo={cityInfo} 
                    avgPressure={avgPressure}
                />
                <Card.Group centered>
                    {days}
                </Card.Group>
            </div>
        );
    };
};

export default App;