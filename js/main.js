var containerDiv = document.createElement('div')
containerDiv.setAttribute('class', 'container')
document.body.appendChild(containerDiv)

var searchingForm = document.createElement('form')
containerDiv.appendChild(searchingForm)

var searchingRow = document.createElement('div')
searchingRow.setAttribute('class', 'row mt-4 mb-4 d-flex')
searchingForm.appendChild(searchingRow)

var searchInput = document.createElement('input')
searchInput.setAttribute('class', 'mb-4 form-control')
searchingRow.appendChild(searchInput)

var searchBtn = document.createElement('button')
searchBtn.setAttribute('class', 'btn btn-primary')
searchBtn.innerText = 'Search'
searchingRow.appendChild(searchBtn)

var selectionRow = document.createElement('select')
selectionRow.setAttribute('class', 'row form-select')
searchingForm.appendChild(selectionRow)

renderOptionsForSelection(movies)


var renderMoviesRow = document.createElement('div')
renderMoviesRow.setAttribute('class', 'row')
containerDiv.appendChild(renderMoviesRow)

movies.forEach(element => {
    renderMovie(element)
});


//      selecting by type part

selectionRow.addEventListener('change', () => {
    let currentSelectedType = selectionRow.value
    let result = false
    renderMoviesRow.innerHTML = ''

    movies.forEach(element => {
        result = checkingByType(element.genres, currentSelectedType)
        if(result)renderMovie(element)
    });
})

function checkingByType(element = [], currentSelectedType) {
    for(let i = 0; i<element.length; i++){
        if(element[i] === currentSelectedType){
            return true
        }
        if(i === element.length - 1){
            return false
        }
        
    }
}

//     searching part

searchBtn.addEventListener('click',event=>{
    event.preventDefault()
    renderMoviesRow.innerHTML = ''
    let searchingValue = searchInput.value
    console.log(searchingValue);
    searching(movies, searchingValue)
})

function searching(movies, searchingValue){
    movies.forEach(element=>{
        if(element.title.includes(searchingValue)){
            renderMovie(element)
        }
    })
}


function renderOptionsForSelection(movies) {
    let options = []
    movies.forEach(element => {
        element.genres.forEach(item => {
            if (!options.includes(item)) {
                options.push(item)
            }
        })
    });

    let i = 1
    options.forEach(element => {
        let tempOption = document.createElement('option')
        tempOption.textContent = element
        tempOption.value = element
        i++;
        selectionRow.appendChild(tempOption)
    })
}


function renderMovie(movie) {
    let colDiv = document.createElement('div')
    colDiv.setAttribute('class', 'column_elem col-4 mt-4 mb-4 position-relative')
    renderMoviesRow.appendChild(colDiv)

    let imgItem = document.createElement('img')
    imgItem.setAttribute('src', movie.imageUrl)
    imgItem.setAttribute('class', '')

    imgItem.addEventListener('error', () => {
        imgItem.setAttribute('src', 'https://media.netflixreleases.com/images/b8a0e3de35e399d02eb29dcb7ec664e3/elephants-dream-2006-poster.jpg')
    })
    colDiv.appendChild(imgItem)

    let yearItem = document.createElement('h6')
    yearItem.textContent = movie.year
    yearItem.setAttribute('class', 'year_elem badge bg-primary position-absolute ')
    colDiv.appendChild(yearItem)

    let titleItem = document.createElement('h3')
    titleItem.setAttribute('class', 'mt-2 mb-2')
    titleItem.textContent = movie.title
    colDiv.appendChild(titleItem)

    let genresItem = document.createElement('div')
    // genresItem.
    colDiv.appendChild(genresItem)

    movie.genres.forEach(element =>{
        let singleGenre = document.createElement('div')
        singleGenre.setAttribute('class', 'badge bg-primary me-2')
        singleGenre.textContent = element
        genresItem.appendChild(singleGenre)
    })
}
