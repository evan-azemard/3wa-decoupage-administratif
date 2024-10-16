const url = "https://geo.api.gouv.fr/";
const listHTML = document.querySelector('#list');
const selectRegion = document.querySelector('#region');
const selectDepartment = document.querySelector('#department');
const showCity = document.querySelector('#showCity');

const show = async () => {
	await fetch(url+'regions')
		.then(response => response.json())
		.then(response => {
			response.forEach(region => {
				const option = document.createElement('option');

				option.textContent = region.nom;
				option.value = region.code;
				selectRegion.appendChild(option);
			})
		})

	selectRegion.addEventListener('change', (e) => {
		const code = e.target.value;
		selectDepartment.innerHTML = '';
		fetch(`${url}regions/${code}/departements`)
			.then(response => response.json())
			.then(response => {
				response.forEach(departement => {
					const option = document.createElement('option');
					
					option.textContent= departement.nom;
					option.value= departement.code;
					selectDepartment.appendChild(option);
				})
			})
	})

	showCity.addEventListener('click', () => {
		const code = selectDepartment.value;
		fetch(`${url}departements/${code}/communes`)
			.then(response => response.json())
			.then(response => {
				const sortList = response.sort((a,b) => b.population - a.population);
				listHTML.innerHTML = '';
				response.forEach(city => {
					console.log(city);
					const li = document.createElement('li');
					li.textContent = city.nom + ' population: '+ city.population;
					listHTML.appendChild(li);
				})
			})
	})
}
show();
	