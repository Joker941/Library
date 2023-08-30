const books = [];

window.addEventListener("load", () => {
    document.querySelector(".addBook").style.display = 'none';
})

let showForm = document.querySelector('.showForm');

showForm.addEventListener('click', () => { 
    document.querySelector('.addBook').style.display = 'block';
});

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    books.push(newBook);
    document.querySelector('#bookTitle').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').checked = false;
    document.querySelector('#notRead').checked = false;
}

function deleteBookFromLibrary (index) {
    books.splice(index, 1);
}

function displayListBooks() {

    let contents = document.querySelector(".contents");

    for (index = 0; index < books.length; index++) {
        
        let div = document.createElement('div');
        div.classList.add("book");

        let titre = document.createElement("h3");
        titre.textContent = books[index].title;

        div.appendChild(titre);

        let secondDiv = document.createElement("div");
        secondDiv.classList.add("bookInfos");

        div.appendChild(secondDiv);

        let auteur = document.createElement("p");
        auteur.textContent = "By " + books[index].author + ", " + books[index].pages + " pages.";

        secondDiv.appendChild(auteur);

        let lu = document.createElement("p");

        if (books[index].read === true) {
            lu.textContent = "Read";
        } else {
            lu.textContent = "Not read";
        }

        secondDiv.appendChild(lu);

        let buttonChange = document.createElement("button");
        buttonChange.classList.add("changeRead");
        buttonChange.dataset.index = index;
        buttonChange.textContent = "Change read";

        secondDiv.appendChild(buttonChange);

        buttonChange.addEventListener("click", function () {
            
            if (books[index].read === true) {
                books[index].read = false;
                lu.textContent = "Not read";
            } else {
                books[index].read = true;
                lu.textContent = "Read";
            }
        })

        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("deleteBook");
        buttonDelete.dataset.index = index;
        buttonDelete.textContent = "Delete this book from your library";

        div.appendChild(buttonDelete);

        buttonDelete.addEventListener("click", function () {
            
            deleteBookFromLibrary(buttonDelete.dataset.index);
            let parentButton = buttonDelete.parentNode;
            parentButton.remove();
        })

        contents.appendChild(div);
    }

}

function removeBookList() {
    let removeBooks = document.querySelector('.contents');
    for (let i = 0; i <= removeBooks.childNodes.length - 1; i ++) {
        if(removeBooks.childNodes[i].nodeType === 1) {
            if (removeBooks.childNodes[i].classList.contains("book") === true) {
                removeBooks.childNodes[i].remove();
            }
        }
    }
}

let addOneBook = document.querySelector('.addOneBook');

addOneBook.addEventListener('click', () => { 

    let title = document.querySelector('#bookTitle').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let notRead = document.querySelector('#notRead').checked;

    if (title === '' || author === '' || pages === '' && read === false && notRead === false) {
        alert("You must fill all the fields");
    } else {
        if (read === true) {
            addBookToLibrary(title, author, pages, true);
        } else {
            addBookToLibrary(title, author, pages, false);
        }
    }

    document.querySelector('.addBook').style.display = 'none';

    removeBookList();

    displayListBooks();

});

