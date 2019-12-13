import React, { Component } from 'react';
import { Card, Image, Grid } from 'semantic-ui-react';
import './WeatherMain.css';

class WeatherMain extends Component {
    state = {};

    render() {
        const { today, cityInfo } = this.props;
        let weather = null;
        if (today.main) {
            weather = (
                <span>
                    <Card.Header as='h2' className='weatherDesc'>{today.weather[0].description}</Card.Header>
                    <Card.Header as='h3'>Temperature: {today.main.temp} °C</Card.Header>
                    <Card.Description>Feels Like: {today.main.feels_like} °C</Card.Description>
                </span>
            );
        };
        return (
            <Card className='main' centered>
                <Grid centered>
                    <Grid.Column width={12} className='cardFix'>
                        <Card.Content className='inline'>
                            <Card.Header as='h1'>{cityInfo.name}, {cityInfo.country}</Card.Header>
                            {weather}
                            <Card.Description as='h4'>Population: {cityInfo.population}</Card.Description>
                        </Card.Content>
                        <Card.Content>
                            {cityInfo.coord? (
                                <div>
                                    <Card.Meta>Latitude: {cityInfo.coord.lat}</Card.Meta>
                                    <Card.Meta>Longitude: {cityInfo.coord.lon}</Card.Meta>
                                </div>
                                ) : (null)
                            }
                            <Card.Description>Sunrise: {Date(cityInfo.sunrise)}</Card.Description>
                            <Card.Description>Sunset: {Date(cityInfo.sunset)}</Card.Description>
                        </Card.Content>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {today.weather? (<Image
                                className='mainIcon'
                                src={`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
                                alt={today.weather[0].main}
                            />) : (null)
                        }
                    </Grid.Column>
                </Grid>
            </Card>
        );
    };
};

export default WeatherMain;