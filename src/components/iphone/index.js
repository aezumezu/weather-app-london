// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Nav from '../nav';
// import mockdata
import { we_data } from '../../../mockdata';

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// var url = "http://api.wunderground.com/api/c78f1a13d2ca6971/conditions/q/UK/London.json";

		console.log('remember to remove your api key when you are done.');
		var url = "http://api.wunderground.com/api/2cf6aee65910be39/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseResponse,
			error: function (req, err) { console.log('API call failed ' + err); }
		});
		// once the data grabbed, hide the button
		// this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={style.container}>
				{/*<div class={style.details}></div>*/}
				{this.state.display ?
					<div class={style_iphone.container}>
						<Button class={style_iphone.button}
							text='Display Weather'
							clickFunction={this.parseResponse}
						/>
					</div>
					:
					<div class={style.lower}>
						<div>
							<Nav style={style.container} />
						</div>
						<div class={style.detail}>
							<div class={style.header}>
								<div class={style.city}>{this.state.locate}</div>
								<div class={style.conditions}>{this.state.cond}
									<img class={style.icon} src={this.state.iconUrl} /></div>
								<span class={tempStyles}>{this.state.temp}</span>
							</div>
							<div class={style.recommendation}>Recommendation</div>
						</div>
					</div>
				}
			</div>
		);
	}

	parseResponse = () => {
		const parsed_json = we_data;
		// log error if call returns error
		if (parsed_json.response.error) {
			return console.log('API call failed ',
				parsed_json.response.error.description);
		}
		console.log('the data\n', parsed_json);
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var iconUrl = parsed_json['current_observation']['icon_url'];

		// set states for fields so they could be rendered later on
		this.setState({
			weatherData: true,
			locate: location,
			temp: temp_c,
			cond: conditions,
			iconUrl,
			display: false
		});
	}
}