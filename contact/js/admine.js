var bookList = document.getElementById('bookList');
var bookForm = document.getElementById('bookForm');
var message = document.getElementById('message');

bookForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var genre = document.getElementById('genre').value;
    var year = document.getElementById('year').value;

    // Créer un nouvel élément de liste
    var listItem = document.createElement('li');
    listItem.innerHTML = `${title} par ${author}, Genre: ${genre}, Année de publication: ${year}`;
    
    // Ajouter des boutons pour supprimer, éditer et publier
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Supprimer';
    deleteButton.addEventListener('click', function () {
        bookList.removeChild(listItem);
    });

    var editButton = document.createElement('button');
    editButton.innerHTML = 'Éditer';
    editButton.addEventListener('click', function () {
        // Mettre en œuvre la logique d'édition ici, par exemple, en remplissant le formulaire avec les détails du livre.
        // Vous pouvez utiliser un formulaire séparé pour l'édition.
    });

    var publishButton = document.createElement('button');
    publishButton.innerHTML = 'Publier';
    publishButton.addEventListener('click', function () {
        // Mettre en œuvre la logique de publication ici, par exemple, en changeant le statut du livre.
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(publishButton);

    bookList.appendChild(listItem);

    // Réinitialiser le formulaire
    bookForm.reset();
});