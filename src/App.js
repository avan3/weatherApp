import React, { Component } from 'react';
import Form from './components/Form';
import WeatherCard from './components/WeatherCard';
import WeatherMain from './components/WeatherMain';
import { Grid, Card } from 'semantic-ui-react';

const Api_Key = 'cdc9ae4340800eb75ceef0c4cc84bd8e';

class App extends Component {
    state = {
        cityInfo: {},
        today: {},
        results: [],
        searchTerm: 'Toronto, CA',
        error: ''
    }
    
    componentDidMount() {
        this.getWeather();
    }

    getWeather = async (e) => {
        let loc;
        if (e) {
            loc = e.target.elements.location.value;
            this.setState({searchTerm: loc});
            e.preventDefault();
        } else {
            loc = this.state.searchTerm;
        }
        let city, country;
        let resultTemp = [];
        if (loc && loc.indexOf(',') > -1) {
            [city, country] = loc.split(',')
        }

        // TODO: match all results in lookup (there are millions though)
        // const re = new RegExp(_.escapeRegExp(city), 'i')
        // const isMatch = (result) => re.test(result.name)

        // const matchObj = _.filter(cityList, isMatch)

        // console.log(matchObj)

        // const id = matchObj
        if (city && country) {
            const api_call = await fetch( 
                // TODO: match with id instead of just city
                // `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${Api_Key}`

                `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${Api_Key}&units=metric`
            );
            const response = await api_call.json();
            
            console.log(response)
            
            for (let i = 0; i < response.list.length; i += 8) {
                if (i === 0) {
                    this.setState({today: response.list[i]});
                    this.setState({cityInfo: response.city});
                } else {
                    resultTemp.push(response.list[i])
                }
            }

            this.setState({results: resultTemp})
        } else {
            this.setState({error: 'Please enter the proper format for the search'})
        }
        
    }

    render() {

        const { results, today, cityInfo } = this.state;
        const days = results.map((day) => {
            return (
                <WeatherCard info={day} key={day.dt}/>
            );
        });

        return (
            <div>
                <Form loadWeather={this.getWeather}/>
                <WeatherMain today={today} cityInfo={cityInfo}/>
                <Card.Group centered>
                    {days}
                </Card.Group>
            </div>
        );
    }
}

export default App;