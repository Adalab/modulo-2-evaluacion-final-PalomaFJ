'use strict';

// Para empezar voy a seleccionar los elementos del html que necesito para cuando la usuaria haga click en buscar, por lo que voy a querer crear un evento de tipo click que suceda sobre el boton buscar: entonces voy a recoger el formulario, el input para buscar y el boton buscar.
const form = document.querySelector(".js-form");
const input = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");

//  ahora voy a crear una función que se ejecutará cuando la usuaria haga click y la voy a llamar handleSearch xq es una funcion manejadora que se ejecutara con un evento que sucedera cuando la usuaria haga click en el boton buscar.Además voy a usar preven.default para evitar que se recargue la página. (escribo event en el parámetro de la funcion xq si no no serviría de nada el prevent.default)
function handleSearch(event) {
    event.preventDefault(); 
    /*console.log("handleSearch funciona");*/
    const searchText = input.value; // esta es la variable const que recoge el valor del input donde la usuaria escribirá la serie que busca.
    if (searchText === "") {
        return;
    }// esta condicion dice que si el input de buscar la seriei esta vacio no se me devuelva nada. o sea que no ejecuto la funcion que le hace la peticion al servidor si el inptu esta vacío.
    fetchAnime(searchText); // Aquí llamo a esta funcion y le paso como parámetro el texto que haya escrito, o sea la serie que este buscando. Vamos que estas dos funciones trabajan juntas para hacer la busqueda de la usuaria.(Aquí es donde tuve que volver para modificar handleSearch añadiendo esto)
}

// ahora voy a hacer el addEventListener para escuchar el evento sobre el boton de buscar y entre los parentesis le paso el tipo de evento, o sea click, y seguidamente de una coma pongo el nombre de la funcion(invocar la funcion) que cree para esto. o sea, handleSearch
searchBtn.addEventListener("click", handleSearch);
// Ahora voy a crear una funcion para el fetch(la peticion al servidor, o sea el API). Y esto lo voy a hacer para poder reutilizar la funcion por si la usuaria busacara mas series no tener que repetir mas codigo y llamar a la funcion directamente. Voy a declarar esta función fetchAnime y le voy a meter en el parametro searchText xq es el valor sobre el que necesito que se ejecute esta funcion. o sea que cuando la usuaria busque una serie se ejecutara esat funcion y este parametro será igual a lo que la usuaria haya escrito.
function fetchAnime(searchText) {
    /*console.log("ejecutando fetchAnime con:", searchText);*/

    //ahora voy a guardar la url del api en una variable const para no tener que repetirla y poder usarla en caso de que la necesite mas adelante simplemente nombrandola. y le voy a pasar el parametro searchText porque es justo ahí donde la usuaria escribira la serie que busca, o sea donde la usuaria le pedira a la api la serie que quiere. si la usuaria por ejemplo pone Naruto, searchText será igual a naruto y el servidor le devolvera lo que está buscando. Pero esto todavía no está pasando esto. 
    const url = `https://api.jikan.moe/v4/anime?q=${searchText}`; 
// Ahora hago la peticion al servidor con fetch y como me guarde la url en un  variable const, le voy a psar el nombre de mi variable(url) como parametro. o sea, que le voy a dar a fetch el parametro url, que es donde guarde la url. una lógica aplastante Palo!
    fetch(url)
        .then(response => response.json()) // vale aquí engo la respuesta del servidor, y convierto la respuesta del servidor en JSON xq esto me permite usar la api como objetos en mim web, que por lo visto es lo que hay que hacer aunque es cierto que esto no lo llegué a comprender del todo, pero se hacerlo y se que es lo que hay que hacer cuando hago fetch para podr usar correctamente la respusta del servidor. es como si lo estuviera traduciendo al idioma que necesito usar para que funcione todo bien.
        .then(data => {//Aquí tengo los datos que me ha dado el servidor convertidos a json, o sea esto es ya el objeto que puedo usar.
            //console.log("Datos recibdos", data); // Aquí compruebo que estos datos estan mi consola como objetos y contienen todo lo que le he pedido al servidor.
            renderAnimeList(data.data); //Aquí he añadido esta linea xq lo que quiero es llamar a renderAnimeList y pinte en mi web las pelis y le paso el parámetro data.data xq es la lista de pelis que me ha devuelto la API, y así recorre la lista y pinta cada peli.
        })
        // Ahora voy a a hacer catch para detectar algun posible problema con el api que estoy usando, esto hace que pueda detectar si hay algun problema de red o cosas así. De esto solo sé esto, no se si previene o solo detecta, pero se que se usarlo en el fetch  y prefiero ponerlo x seguridad. Aunque todavía tal vez no estoy segura al 100% de toda su funcionalidad. 
        .catch(error => console.error("Error en la petición:", error)); 
}
//// Ahora voy "modificar" mi funcion handleSearch para que llame a mi otra funcion fetchAnime y conecte con la API. porque antes cuando use handleSearch, solo cogia el texto del input y lo imprimia en la consola pero ahora en mi siguiente paso lo que voy a hacer es como llamar a fetchAnime para hacer la busqueda en el API.Entonces, llamo a la  funcion FetchAnime dentro de mi funcion HandleSearch. Así que me voy a volver arriba donde tengo mi funcion handleSearch y voy a llamar a fetchAnime.

// Ahora quiero mostrar los resultados en la pantalla y como ya tengo los datos del API voy a pintarlos en la web. Quiero que cada peli tenga su imagen y su titulo. Tambien quiero que no se pinte una peli encima de otra en el div de resultado, o sea que se limpie entre una busqueda y otra.

// Ahora voy a selecionar el contenedor donde voy a mostrar el resultado. Que es el div con la clase js-results asi que lo recojo en una variable const que voy a llamar resultContainer. Y ahí es donde apareceran las pelis cuando la usuaria busque.
const resultsContainer = document.querySelector(".js-results");

// Ahora voy a crear una funcion a la que voy a llamar renderAnimeList, para que pinte las pelis  y le añadiré el parámetro animeList(que será la lista de pelis que me dió la API) Osea, que renderAnimeList es la funcion que quiero que me pinte la peli buscada.
function renderAnimeList(animeList) {
    resultsContainer.innerHTML = ""; // Esto lo hago para limpiar el div donde muestro los reultados de la busqueda. O sea, que si busco la peli patata se mostrará la peli patata, pero si luego busco la peli tomate gracias a esto se borra el resultado de patata y ya aparece el de tomate. y así no se me pone una peli encima de otra.

// Ahora voy a usar un bucle for of porque necesito recorrer cada peli una por una para poder pintarla en la web cuando la usuaria la busque. o sea, necesito recorrer mi array de objetos, objeto por objeto. siendo animeList mi array y anime mi objeto. o sea, siendo animeList mi lista de pelis, y anime cada peli de la lista.

// Vale Ahora quiero solucionar un problema que ocurre cuando una peli no tiene imagen y para ello voy a usar una imagen azul que yo he elegido y descargado de otra web. Entonces voy a 
    for (const anime of animeList) {
        
        const animeHTML = `
            <div class="anime-card">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
            </div>
        `;

        resultsContainer.innerHTML += animeHTML;
    }
}
// Vale, ahora quiero "modificar" mi funcion fetchAnime para que llame a mi funcion renderAnimeList y me aparezcan las pelis en la web. y para ello me voy a ir a donde hice mi funcion ftechAnime y voy a llamar a renderAnimeList pasandole el parámetro data.data xq lo que quiero conseguir con esto e es que, después de haber recibido los datos de la API en fetchAnime, le paso a renderAnimeList la lista de pelis que me ha dado la API. Entonces renderAnimeList puede coger esa lista de pelis (data.data), recorrerla y pintar cada peli en la web.

//Vale llegada hasta aquí me pasa una cosa y es que cuando abro la pagina y sin escribir nada en el inptu hago click en buscar, se pintan todas las pelis del API en mi web. Entonces ahora voy a intentar solucionar esto o al menos ver que pasa. voy a hacer un console.log de handlesearch. ok ya lo he hecho y funciona. ahora voy a hacer console.log de fetchAnime. ok funciona bien. Voy a investigar como se soluciona esto xq no quiero que se haga la peticion al servidor solo con clickar buscar si no se ha escrito nada. vale he escrito una condicion y ya si el inptu esta vacio aunque clike en buscar no me hace la peticion. bien!!! 
// Bueno ahora quiero marcar algunas pelis como favoritas