import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';

import { ROOT_API } from '../statics';

export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			player1: '',
			player2: '',
			player3: '',
			player4: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const { toggleLoading } = this.props;
		toggleLoading(true);
		
		const newGame = {
			// ["player1", "player2", "player3", "player4"]
			players: Object.keys(this.state).map(key => this.state[key]),
			scores: [[], [], [], []]
		}
		// yarn add
		axios({
			url: `${ROOT_API}/api/game`,
			method: "POST",
			data: newGame
		}).then(response => {
			if(response.data.success) {
				window.location.href = `/game/${response.data.game._id}`
			}
			// toggleLoading(false);
		}).catch(error => {
			toggleLoading(false);
			console.log(error)
		});
	}

	handleInputChange(event) {
		// console.log(event.target);
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Input
						name="player1"
						placeholder="Player 1 name"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="player2"
						placeholder="Player 2 name"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="player3"
						placeholder="Player 3 name"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="player4"
						placeholder="Player 4 name"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<Button>Create new game.</Button>
			</Form>
		);
	}
}