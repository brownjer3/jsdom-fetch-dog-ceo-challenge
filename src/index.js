console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 



document.addEventListener("DOMContentLoaded", () => {
    fetchImages()
    fetchBreeds()
});

function fetchImages() {
    fetch(imgUrl).then(r => r.json())
    .then(json => {
        json.message.forEach(image => renderImage(image))    
    })
}

function renderImage(image) {
    const list = document.getElementById("dog-image-container");
    let imgTag = document.createElement("img")
    imgTag.src = image
    list.appendChild(imgTag)
}

function fetchBreeds() {
    fetch(breedUrl).then(r => r.json())
    .then(json => {
        breeds = Object.keys(json.message)
        renderBreeds(breeds)
        listenForBreedFilter()
    })
}

function renderBreeds(breedNames) {
    const breedList = document.getElementById('dog-breeds')
    for (const breed of breedNames){
        const newBreed = document.createElement('li')
        newBreed.innerText = breed
        breedList.appendChild(newBreed)
        newBreed.addEventListener('click', changeColor)
    }
}

function changeColor(event) {
    event.target.style.color = "blue"
}

function filterBreeds(letter) {
    let breedList = document.getElementById('dog-breeds')
    breedList.innerHTML = ""
    let names = []
    for (const name of breeds) {
        if (name[0] == letter) {
            names.push(name)
        }
    }
    renderBreeds(names)
}

function listenForBreedFilter() {
    let breedDropdown = document.getElementById('breed-dropdown')
    breedDropdown.addEventListener('change', (e) => {
        let letter = e.target.value
        filterBreeds(letter)
    })
}
