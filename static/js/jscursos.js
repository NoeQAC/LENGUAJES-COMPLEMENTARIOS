// Función que obtiene los datos de la API y crea las cards
async function obtenerDatos() {
    try {
        // Utilizamos fetch para obtener los datos de la API
        const response = await fetch('https://cursos-12235-default-rtdb.firebaseio.com/cursos.json');

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }

        // Convertir los datos a formato JSON
        const data = await response.json();

        // Obtener el elemento contenedor para las cards
        const cardDeck = document.getElementById('card-deck');

        // Limpiar el contenido actual para evitar duplicados
        cardDeck.innerHTML = '';

        // Iterar sobre los datos y crear una card para cada objeto
        for (let key in data) {
            const objeto = data[key];

            // Crear un contenedor de columna para la tarjeta
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'mb-4'); // 3 tarjetas por fila (12 / 4 = 3)

            // Crear los elementos HTML para la card
            const card = document.createElement('div');
            card.classList.add('card', 'h-100'); // Añadimos 'h-100' para igualar alturas

            const imagen = document.createElement('img');
            imagen.classList.add('card-img-top');
            imagen.src = objeto.imagen || '/static/img/default.jpg'; // Imagen predeterminada si falta la imagen
            imagen.alt = objeto.nombrecurso || 'Imagen del curso';

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cursos = document.createElement('h5');
            cursos.classList.add('card-title');
            cursos.textContent = objeto.nombrecurso || 'Nombre del curso no disponible';

            const duracion = document.createElement('p');
            duracion.classList.add('card-text');
            duracion.textContent = `Duración: ${objeto.duracion || 'N/A'} meses`;

            const valor = document.createElement('p');
            valor.classList.add('card-text');
            valor.textContent = `Valor: $${objeto.valor || '0.00'}`;

            // Agregar los elementos al cuerpo de la card
            cardBody.appendChild(cursos);
            cardBody.appendChild(duracion);
            cardBody.appendChild(valor);

            // Ensamblar la card completa
            card.appendChild(imagen);
            card.appendChild(cardBody);

            // Agregar la card al contenedor de columna
            col.appendChild(card);

            // Agregar la columna al contenedor de cards
            cardDeck.appendChild(col);
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);

        // Mostrar mensaje de error al usuario
        const cardDeck = document.getElementById('card-deck');
        cardDeck.innerHTML = '<p class="text-danger">No se pudieron cargar los cursos. Intente más tarde.</p>';
    }
}

// Ejecutar la función obtenerDatos al cargar la página
obtenerDatos();

// Ejecutar la función obtenerDatos cada 5 segundos
setInterval(obtenerDatos, 5000);
