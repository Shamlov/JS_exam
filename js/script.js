let api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'

// т.к. необходимо показать данные при клике. их сразу можно получить. а при клике на кнопку . показать не ожидая от сервера ответа
let outerData   // переменная для записи массива получаемого с сервера
async function getList() {
    const response = await fetch(api)
    if(!response.ok) {                          // если статус ответа не OK покажем пользователю
        alert("Ошибка загрузки с сервера")
    }
    const data = await response.json()
    // Вынесем данные data за {} функции и что бы не кликнуть раньше времени на кнопку . найдем ее после завершения загрузки с сервера
    outerData = data
    const btnGetList = document.querySelector('#btnGetList')  
}


let app = document.querySelector('#app')
// стартовый HTML , закину в JS. просто для интереса .
app.innerHTML = `
    <div class="container-md">
        <p class="fs-3 text-center">Для просмотра карты коктейлей, нажмите на кнопку </p>
        <div class="row">
            <div class="col-4 mb-4">
                <img class="logo img-fluid" src="images/vecteezy_lemonade-png-with-ai-generated_25065159.png" alt="rtyuio">
            </div>
            <div class="col-8">
                <button type="button" class="btn btn-primary" id='btnGetList'>Кликни для загрузки</button>
            </div>
        </div>
        <div class="row" id="listCards"> 

        </div>
    </div>
`
getList()  // т.к. поиcк кнопки зашит в функции , вызываем ее после того как HTML код уже сформирован. и ничего не сработало раньше времени .

const listCards = document.querySelector('#listCards')

btnGetList.addEventListener('click' , showList)
function showList() {
    outerData.drinks.forEach((el, index) => {             // проходим циклом по массиву даннх, вносим данные и добавляем и добавляем HTML
        console.log(el)
        let div = document.createElement('div')
        div.setAttribute('class' , 'card m-2')
        div.setAttribute('style' , 'width: 18rem')
        div.innerHTML = `
        <img src="${el.strDrinkThumb}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${el.strCategory}</h5>
            <p class="card-text">${el.strInstructionsIT}</p>
            <a href="#" class="btn btn-primary" id="btnIngredients" data-index = "${index}">ингредиенты</a>
        </div>
        `
        listCards.append(div)
    });
}

listCards.addEventListener('click' , showInfo)

function showInfo(event) {
    if(event.target.closest('btn')) {
        return
    }
    let index = ++event.target.dataset.index
    console.log(outerData.drinks[index].strIngredient1) 
    // alert(`Ингридиенты: ${outerData}`)    // покажу через простой алерт

    console.log(index)
}