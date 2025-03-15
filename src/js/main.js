'use strict';

// Para empezar voy a seleccionar los elementos del html que necesito para cuando la usuaria haga click en buscar, por lo que voy a querer crear un evento de tipo click que suceda sobre el boton buscar: entonces voy a recoger el formulario, el input para buscar y el boton buscar.
const form = document.querySelector(".js-form");
const input = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
// Voy a seleccionar el container que usaré para mi sección de favoritas en una variable const
const favoriteContainer = document.querySelector(".js-favorites");
//Ahora escribir una variable let para crear un array vacio y meter ahí las series favoritas
let favoritesAnimes = [];

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

// Ahora voy a selecionar el contenedor donde voy a mostrar el resultado. Que es el div con la clase js-results asi que lo recojo en una variable const que voy a llamar resultContainer. Y ahí es donde apareceran las series cuando la usuaria busque.
const resultsContainer = document.querySelector(".js-results");

// Ahora voy a crear una funcion a la que voy a llamar renderAnimeList, para que pinte las pelis  y le añadiré el parámetro animeList(que será la lista de pelis que me dió la API) Osea, que renderAnimeList es la funcion que quiero que me pinte la peli buscada.
function renderAnimeList(animeList) {
    /*console.log("funcionando?",animeList);*///si funciona bien
    resultsContainer.innerHTML = ""; // Esto lo hago para limpiar el div donde muestro los reultados de la busqueda. O sea, que si busco la peli patata se mostrará la peli patata, pero si luego busco la peli tomate gracias a esto se borra el resultado de patata y ya aparece el de tomate. y así no se me pone una peli encima de otra.

// Ahora voy a usar un bucle for of porque necesito recorrer cada serie una por una para poder pintarla en la web cuando la usuaria la busque. o sea, necesito recorrer mi array de objetos, objeto por objeto. siendo animeList mi array y anime mi objeto. o sea, siendo animeList mi lista de series, y anime cada serie de la lista. Dentro de este bucle voy a crear una variable const que se llame animeHTML ¿xq? porque la voy a usar como un aespecie de bloque donde meteré el código html que pinte cada card de cada serie. y es ahí donde meto el div que pinta cada serie con su titulo y su imagen. Entonces en resultContainer mostrará mi animeHTML con su imagen y su ttulo (card de la serie)

// Vale Ahora quiero solucionar un problema que ocurre cuando una peli no tiene imagen y para ello voy a usar una imagen azul que yo he elegido y descargado de otra web. Entonces voy a 
/*console.log("saber cuantas series", animeList.length);*/ //si funciona bien
    for (const anime of animeList) {
        
        const animeHTML = `
        <div class="anime-card js-anime-card" data-id="${anime.mal_id}">
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
        </div>
    `;

        resultsContainer.innerHTML += animeHTML;
    }
    /*console.log("a ver si esto funciona", resultsContainer.innerHTML);*/// si funciona bien

 //Aquí voy a empezar a desarrollar lo del click en las series favoritas y para ello voy a seleccionar todas las "cards" guardandolas en una variable const, y uso document.querySelectorAll xq estas cards  aparecen en la web  cuando la usuaria ya las ha buscado(para esto voy a necesitar añadir una clase js al div que tengo dentro de const ainmeHTML). Ahora bien, como quiero que todas las cards escuhen el click (de favorito) voy a hacer un bucle for of para recorrer cada una, y es aquí donde quiero escuchar el evento de click en cada una de ellas además voy a hacer una funcion manejadora a la que llamaré handleFavoritesClick y dentro de esta funcion manejadora voyy a usar event.currentTarget.dataset.id para saber el ID de la card donde la usuaria hizo click(y esto lo voy a meter en una variable const que voy a llamar animeId,(esto lo hago asi para volver a usarlo de manera mas corta).Vale he comprobado que el evento se escucha cuando clika en una serie. 
// Entonces ahora quiero saber la serie que ha clikado. Como cada serie tiene un ID propio (que me da la API)(veo en JSON que el ID esta recogido en un objeto que se llama "mal_id"). Yo quiero que se recoja cada ID en un sitio y para eso usaré data-id(que justo lo escribí en el div de la const animeHTML xq es el sitio donde está la información que necesito de cada serie, su imagen, su titulo y su ID) y cuando la usuaria haga click  en una card podré saber cual ha seleccionado. Vale, ahora ya cuando la usuaria clika una serie a mi me aparece en consola el evento y el id, por lo que todo correcto hasta aquí.
//Entonces ahora lo que quiero hacer esañadir esa serie clikada a favoritas

    const animeCards = document.querySelectorAll(".js-anime-card")

    for (const card of animeCards) {
        card.addEventListener("click", handleFavoritesClick);
    }
}
function handleFavoritesClick(event) {
    const animeId = event.currentTarget.dataset.id;
    /*console.log("has clikado aqui pillina", animeId);*/// siiiiii por fin funciona!!!!!
}

// Vale, ahora quiero "modificar" mi funcion fetchAnime para que llame a mi funcion renderAnimeList y me aparezcan las pelis en la web cuando se realixe la peticion al servidor,(que para eso hice fetch). y para ello me voy a ir a donde hice mi funcion ftechAnime y voy a llamar a renderAnimeList pasandole el parámetro data.data xq lo que quiero conseguir con esto e es que, después de haber recibido los datos de la API en fetchAnime, le paso a renderAnimeList la lista de series que me ha dado la API. Entonces renderAnimeList puede coger esa lista de series (data.data), recorrerla y pintar cada serie en la web.

//Vale llegada hasta aquí me pasa una cosa y es que cuando abro la pagina y sin escribir nada en el inptu hago click en buscar, se pintan todas las series del API en mi web. Entonces ahora voy a intentar solucionar esto o al menos ver que pasa. voy a hacer un console.log de handlesearch. ok ya lo he hecho y funciona. ahora voy a hacer console.log de fetchAnime. ok funciona bien. Voy a investigar como se soluciona esto xq no quiero que se haga la peticion al servidor solo con clickar buscar si no se ha escrito nada. vale he escrito una condicion y ya si el input esta vacio aunque clike en buscar no me hace la peticion. bien!!! 

// Bueno ahora quiero marcar algunas series como favoritas. Entonces lo que quiero es que si la usuaria hace click en alguna de las pelis, esta serie se marque como favorita y se pinte en la seccion de series favoritas y además quiero que las series marcadas en favoritas se guarden en el localstorage y se mantengan al recargar la página. Así que, voy a empezar por seleccionar el aside de mi html que creé para que fuera la sección favoritas y lo seleccionaré en una variable const, y luego crearé una variable let con un array vacio para guardar ahí las series favoritas. Vale, ahora mi siguiente paso es, saber cuando la usuaria hace click en una de las series, o sea necesito saber que serie ha clikado y para esto voy a usar un evento. donde lo hago? pues en renderAnimeList, que es donde se pintan las series. Así que me voy ahí arriba a hacer este evento.