// import preact
import { h, render, Component } from 'preact';
// import the button component
import style from './style';

// build the nav component
export default class Nav extends Component {
	constructor() {
		super();
		this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
	}

	handleBackgroundChange(bg_image) {
		// debugger;
		const container = '.' + this.props.style;
		const elem = document.querySelector(container);
		const elemClasses = elem.classList.toString().split(' ');
		elemClasses.length > 1 ? elem.classList.remove(elemClasses[1]): '';
		;
		elem.classList.add(bg_image);
		// elem.style.backgoundImage = `url(${bg_image})`;
		console.log('the elem', elem.classList.toString());
	}

	render() {
		const imgPath = '../../assets/backgrounds/';
		return (
			<div>
				<div class={`${style.button} ${style.big_ben}`}
					onClick={this.handleBackgroundChange.bind(null, style.big_ben)} >
				</div>
				<div class={`${style.button} ${style.london_skyline}`}
					onClick={this.handleBackgroundChange.bind(null, style.london_skyline)} >
				</div>
				<div class={`${style.button} ${style.canary_wharf}`}
					onClick={this.handleBackgroundChange.bind(null, style.canary_wharf)} >
				</div>
				<div class={`${style.button} ${style.shards}`}
					onClick={this.handleBackgroundChange.bind(null, style.shards)} >
				</div>
				<div class={`${style.button} ${style.tower_bridge}`}
					onClick={this.handleBackgroundChange.bind(null, style.tower_bridge)} >
				</div>
			</div>
		);
	}
}