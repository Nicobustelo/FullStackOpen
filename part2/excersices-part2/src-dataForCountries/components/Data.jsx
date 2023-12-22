const Data = ({
	countriesList,
	showCountry,
	setSingleCountrieFrom,
	singleCountryData,
}) => {
	console.log(countriesList);
	if (countriesList.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	} else if (countriesList.length < 11 && countriesList.length > 1) {
		return (
			<div>
				{countriesList.map(countrie => (
					<div key={countrie}>
						{countrie}{' '}
						<button onClick={() => showCountry(countrie)}>show</button>
					</div>
				))}
			</div>
		);
	} else if (countriesList.length === 1) {
		setSingleCountrieFrom();
		console.log('country devolution:', singleCountryData);
		if (singleCountryData) {
			return (
				<div>
					<h1>
						<b>{singleCountryData.name.common}</b>
					</h1>
					<p>capital {singleCountryData.capital[0]}</p>
					<p>area {singleCountryData.area}</p>
					<h2>
						<b>languages:</b>
					</h2>
					<ul>
						{Object.entries(singleCountryData.languages).map(([code, name]) => (
							<li key={name}>{name}</li>
						))}
					</ul>
					<img src={singleCountryData.flags.png} alt={singleCountryData.alt} />
				</div>
			);
		} else {
			console.log('Waiting for rerender');
		}
	} else {
		return <div>No matches found</div>;
	}
};

export default Data;
