import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Data from './components/Data';

const App = () => {
	const [searchValue, setSearchValue] = useState('');
	const [countriesList, setCountriesList] = useState([]);
	const [filteredList, setFilteredList] = useState(countriesList);
	const [singleCountry, setSingleCountry] = useState(null);
	const [singleCountryData, setSingleCountryData] = useState(null);

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then(response => {
				const parsedList = response.data.map(countrie => countrie.name.common);
				setCountriesList(parsedList);
				setFilteredList(parsedList);
			});
	}, []);

	useEffect(() => {
		if (singleCountry) {
			console.log('countrie parameter: ', singleCountry);
			axios
				.get(
					`https://studies.cs.helsinki.fi/restcountries/api/name/${singleCountry}`
				)
				.then(response => {
					setSingleCountryData(response.data);
				});
		}
	}, [singleCountry]);

	const changeHandler = event => {
		const search = event.target.value;
		setSearchValue(search);
		console.log(search);
		setFilteredList(countriesMatcher(search));
	};

	const countriesMatcher = search => {
		const matchedList = countriesList.filter(countrie =>
			countrie.includes(search)
		);
		console.log(matchedList);
		return matchedList;
	};

	const initializeProcedure = () => {
		setSingleCountry(filteredList[0]);
	};

	const showCountry = value => {
		setSearchValue(value);
		setFilteredList(countriesMatcher(value));
	};

	return (
		<div>
			<Search
				text={'find countries'}
				value={searchValue}
				changeHandler={changeHandler}
			/>
			<Data
				countriesList={filteredList}
				showCountry={showCountry}
				setSingleCountrieFrom={initializeProcedure}
				singleCountryData={singleCountryData}
			/>
		</div>
	);
};

export default App;
