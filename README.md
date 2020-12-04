![header](https://i.ibb.co/pwBLgTj/Captura-de-pantalla-2020-12-03-a-las-17-37-20.png)

# Luziflix. Series finder

Esta es la evaluación final del módulo 2 (JavaScript) del curso de <a href="https://adalab.es/" target="_blank">Adalab Digital</a>. Se trata de una web de búsqueda de series, que a través de la API de TV Maze nos permite hacer una búsqueda de series por su título y guardarlas en favoritos.

## Guía del proyecto:

* __Estructura__:
 
La página consta de un input de búsqueda asociado a un botón. Debajo de éste se encuentra la lista donde el usuario puede añadir sus series favoritas. Cada favorito va acompañado de un botón para poder borrarlo de la lista. A su vez, esta sección cuenta con un botón para borrar la lista entera de favoritos.
En el lado derecho se encuentra el listado donde aparecerán los resultados de la búsqueda.

* __Funcionamiento__:

Cuando el usuario introduce un texto en el campo de búsqueda, al hacer click en el botón o darle a la tecla de 'enter' se produce una llamada a la API de TV Maze, el cual devuelve un objeto JSON con los resultados de la búsqueda, que transformamos en objeto y lo almacenamos en un array.
Recorriendo dicho array, llamamos a una función para que nos pinte en pantalla el nombre y la imagen que hemos seleccionado de dicho array. Si la serie no tuviera imagen, le decimos mediante un condicional que añada una por defecto.

* __Favoritos__:

El usuario puede hacer click sobre una serie, se invierte el fondo y color del título y la añade a la sección de favoritos mediante su almacenamiento en un array. Al refrescar la página, los favoritos se mantienen, pues son almacenados en el local storage del navegador.
Para borrar los favoritos, se puede hacer con un botón que hay junto a cada favorito, haciendo click sobre la serie seleccionada en la zona de resultados o borrándolas todas con el botón 'Delete all'.

## Pasos para arrancar el proyecto:

Este proyecto está realizado con el starter kit de Adalab. Los pasos para arrancar el proyecto podrás encontrarlos <a href="https://github.com/Adalab/adalab-web-starter-kit" target="_blank">aquí</a>.



