'use strict';

// Para empezar voy a seleccionar los elementos del html que necesito para cuando la usuaria haga click en buscar, por lo que voy a querer crear un evento de tipo click que suceda sobre el boton buscar: entonces voy a recoger el formulario, el input y el boton buscar.
const form = document.querySelector(".js-form");
const input = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");

//  ahora voy a crear una función que se ejecutará cuando la usuaria haga click y la voy a llamar handleSearch xq es una funcion manejadora que se ejecutara con un evento que sucedera cuando la usuaria haga click en el boton buscar.Además voy a usar preven.default para evitar que se recargue la página. (escribo event en el parámetro de la funcion xq si no no serviría de nada el prevent.default)
function handleSearch(event) {
    event.preventDefault(); 

    const searchText = input.value; // esta es la constante que recoge el valor del input donde la usuaria escribirá la peli que busca.
    /*console.log("pelicula que busco", searchText); el boton escucha el evento bien!! lo de searchText lo usaré como parámetro más adelante en la función del fetch*/
}

// ahora voy a hacer el addEventListener para escuchar el evento sobre el boton de buscar y entre los parentesis le paso el tipo de evento, o sea click, y seguidamente de una coma pongo el nombre de la funcion(invocar la funcion) que cree para esto. o sea, handleSearch
searchBtn.addEventListener("click", handleSearch);

// Ahora voy a crear una funcion para el fetch(la peticion al servidor, o sea el API). Y esto lo voy a hacer para poder reutilizar la funcion por si la usuaria busacara mas peliculas no tener que repetir mas codigo y llamar a la funcion directamente. Voy a llamar a esta función fetchAnime y le voy a meter en el parametro searchText xq es el valor sobre el que necesito que se ejecute esta funcion. o sea que cuando la usuaria busque una peli se ejecutara esat funcion y este parametro será igual a lo que la usuaria haya escrito.
function fetchAnime(searchText) {
    //ahora voy a guardar la url del api en una constante para no tener que repetirla y poder usarla en caso de que la necesite mas adelante simplemente nombrandola. y le voy a pasar el parametro searchText porque es justo ahí donde la usuaria escribira la peli que busca, o sea donde la usuaria le pedira a la api la peli que quiere. si la usuaria por ejemplo pone Naruto, searchText será igual a naruto y el servidor le devolvera lo que está buscando. Pero esto todavía no está pasando esto. 
    const url = `https://api.jikan.moe/v4/anime?q=${searchText}`; 
// Ahora hago la peticion al servidor con fetch y como me guarde la url en un aconstante le voy a psar el nombre de mi constante como parametro. o sea, que le voy a dar a fetch el parametro url, que es el nombre de mi constante donde guarde la url. una lógica aplastante Palo!
    fetch(url)
        .then(response => response.json()) // vale aquí engo la respuesta del servidor, y convierto la respuesta del servidor en JSON xq esto me permite usar la api como objetos en mim web, que por lo visto es lo que hay que hacer aunque es cierto que esto no lo llegué a comprender del todo, pero se hacerlo y se que es lo que hay que hacer cuando hago fetch para podr usar correctamente la respusta del servidor. es como si lo estuviera traduciendo al idioma que necesito usar para que funcione todo bien.
        .then(data => {//Aquí tengo los datos que me ha dado el servidor convertidos a json, o sea esto es ya el objeto que puedo usar.
            console.log("Datos recibidos:", data); // Aquí compruebo que estos datos estan mi consola como objetos y contienen todo lo que le he pedido al servidor.
        })
        // Ahora voy a a hacer catch para detectar algun posible problema con el api que estoy usando, esto hace que pueda detectar si hay algun problema de red o cosas así. De esto solo sé esto, no se si previene o solo detecta, pero se que se usarlo en el fetch  y prefiero ponerlo x seguridad. Aunque todavía tal vez no estoy segura al 100% de toda su funcionalidad. 
        .catch(error => console.error("Error en la petición:", error)); 
}

// Ahora voy "modificar" mi funcion handleSearch para que llame a mi otra funcion fetchAnime y conecte con la API. porque antes cuando use handleSearch, solo cogia el texto del input y lo imprimia en la consola pero ahora en mi siguiente paso lo que voy a hacer es como llamar a fetchAnime para hacer la busqueda en el API.Entonces, llamo a la funcion con su parametro event y con su event.prevent.default, y le meto la constante de searchText definiendo que su valor será lo que la usuaria escriba en el input. y despues ejecuto la funcion FetchAnime dentro de mi funcion HandleSearch.
function handleSearch(event) {
    event.preventDefault();

    const searchText = input.value; 
    /*console.log("la peli que busco", searchText);*/

    fetchAnime(searchText); //Aquí llamo a esta funcion y le paso como parámetro el texto que haya escrito, o sea la peli que este buscando. Vamos que stas dos funciones trabajan juntas para hacer la busqueda de la usuaria.
}




