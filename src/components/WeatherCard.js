import React, {Component} from 'react';
import { Card, Image } from 'semantic-ui-react';
import './WeatherCard.css';

class WeatherCard extends Component {
    state = {};

    render() {
        const { info } = this.props;
        // Format entire date with time into only date
        let d = new Date(info.dt_txt.substring(0,10));
        let n = d.toDateString();
        return (
            <Card className='sidePanel'>
                <Card.Content>
                    <Card.Header>{n}</Card.Header>
                    <Image
                        size='tiny'
                        src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
                        alt={info.weather[0].main}
                    />
                    <Card.Header>{info.weather[0].description}</Card.Header>
                    <Card.Description>Temperature: {info.main.temp} °C</Card.Description>
                </Card.Content>
            </Card>
        );
    };
};

export default WeatherCard;