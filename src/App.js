import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cs from 'classnames';
import CardReactFormContainer from 'card-react';
import './App.css';

function App() {
	const { register, handleSubmit, errors } = useForm();
	const [accountType, setAccountType] = useState('checking');
	const [form, setForm] = useState({});
	const onSubmit = (data) => {
		console.log(data);
	};

	const onRadioChange = (e) => {
		setAccountType(e.target.value);
	};

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="App">
			<header>
				<h1>One-time Loan Payment</h1>
				<p>Fill out the form below to complete your payment</p>
			</header>
			{/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input-container">
					<label htmlFor="accNumber">Loan Account Number</label>
					<input name="accNumber" ref={register} />
				</div>

				<div className="form-inputs">
					<div>
						<div className="input-container">
							<label htmlFor="accType">Type of Account</label>
							<div className="radios-container">
								<div className="radio-container">
									<input
										type="radio"
										id="checking"
										name="account"
										value="checking"
										checked={accountType === 'checking'}
										onChange={onRadioChange}
									/>
									<label htmlFor="checking">Checking</label>
								</div>
								<div className="radio-container">
									<input
										type="radio"
										id="card"
										name="account"
										value="card"
										checked={accountType === 'card'}
										onChange={onRadioChange}
									/>
									<label htmlFor="card">Debit Card</label>
								</div>
							</div>
						</div>

						{accountType === 'checking' ? (
							<div>
								<div
									className={cs('input-container', {
										'input-error': errors.routing,
									})}
								>
									<label htmlFor="routing">Routing Number</label>
									<input name="routing" ref={register({ required: true })} />

									{errors.routing && (
										<p className="error">Routing Number is required</p>
									)}
								</div>
								<div className="input-container">
									<label htmlFor="bankAccount">Bank Account Number</label>
									<input name="bankAccount" ref={register} />
								</div>
								<div className="input-container">
									<label htmlFor="confirmBankAccount">
										Confirm Bank Account Number
									</label>
									<input name="confirmBankAccount" ref={register} />
								</div>
							</div>
						) : (
							<div>
								<CardReactFormContainer
									// the id of the container element where you want to render the card element.
									// the card component can be rendered anywhere (doesn't have to be in ReactCardFormContainer).
									container="card-wrapper" // required
									// an object contain the form inputs names.
									// every input must have a unique name prop.
									formInputsNames={{
										number: 'number', // optional — default "number"
										expiry: 'exp', // optional — default "expiry"
										cvc: 'cvc', // optional — default "cvc"
										name: 'name', // optional - default "name"
									}}
									// initial values to render in the card element
									initialValues={{
										number: '', // optional — default •••• •••• •••• ••••
										cvc: '', // optional — default •••
										expiry: '', // optional — default ••/••
										name: '', // optional — default FULL NAME
									}}
									// the class name attribute to add to the input field and the corresponding part of the card element,
									// when the input is valid/invalid.
									classes={{
										valid: 'valid-input', // optional — default 'jp-card-valid'
										invalid: 'invalid-input', // optional — default 'jp-card-invalid'
									}}
									// specify whether you want to format the form inputs or not
									formatting={true} // optional - default true
								>
									<form>
										<div className="input-container">
											<label htmlFor="number">Card Number</label>
											<input type="text" name="number" />
										</div>
										<div className="input-container">
											<label htmlFor="name">Name On Card</label>
											<input name="name" />
										</div>
										<div className="input-container">
											<label htmlFor="exp">Expiration</label>
											<input type="text" name="exp" />
										</div>
										<div className="input-container">
											<label htmlFor="cvc">CVV</label>
											<input type="number" name="cvc" />
										</div>
									</form>
								</CardReactFormContainer>
							</div>
						)}
					</div>
					<div>
						{accountType === 'checking' ? (
							<div className="checking-account">
								<p>Where can I find the routing and account number</p>
								<img src="check.jpg" alt="Blank check" />
								<div className="check-info">
									<div className="pointer-info">
										<div className="horizontal-border"></div>
										<div className="vertical-border"></div>
										<p>Routing Number</p>
									</div>

									<div className="pointer-info">
										<div className="horizontal-border"></div>
										<div className="vertical-border"></div>
										<p>Accont Number</p>
									</div>
								</div>
							</div>
						) : (
							<div id="card-wrapper"></div>
						)}
					</div>
				</div>
				<button type="submit">Make Payment</button>
			</form>
		</div>
	);
}

export default App;
