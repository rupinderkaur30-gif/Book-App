class Book {
static all = []
    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }


    static getBooks = () => {
        api.getBooks().then(books => {
            books.forEach(book => new Book(book))
            this.renderIndex()
        })
    }


    static renderIndex = () => {
        const main = document.getElementById("main")
        main.innerHTML = ""
        const bookContainer = document.createElement("div")
        bookContainer.id = "book-container"
        const addBook = document.createElement("button")
        addBook.innerText = "Add a New Book"
        addBook.addEventListener("click", this.openBookForm)
        main.append(bookContainer, addBook)
        this.all.forEach(movie => movie.renderCard())
        bookContainer.addEventListener("click", this.handleIndexClick)
    }

    static openBookForm = () => {
        modal.main.innerHTML = `
        <h1>Add Your Book</h1>
        <form>
          <label for="title">Title:</label><br>
          <input type="text" name="title"><br>
          <label for"imageUrl">Image:</label><br>
          <input type="text" name="imageUrl"><br>
          <label for="genre">Genre:</label><br>
          <input type="text" name="genre"><br>
          <label for="yearsPublished">yearsPublished:</label><br>
          <input type="date" name="yearsPublished"><br>
          <label for="author">Author:</label><br>
          <input type="text" name="author"><br>
          <input type="submit" value="Add Book"><br>
        </form>`
        modal.main.querySelector("form").addEventListener("submit", this.handleSubmit)
        modal.open()
    }


    static handleSubmit = (e) => {
        e.preventDefault()
        const newBook = {
            title: e.target.title.value,
            image_url: e.target.imageUrl.value,
            genre: e.target.genre.value,
             years_published: e.target.yearsPublished.value,
            author: e.target.author.value
          }
           api.createBook(newBook).then(book => new Book(book).renderCard())
           modal.close()
    }
 
    static handleIndexClick = (e) => {
        if (e.target.tagName == "IMG" || e.target.classList.contains("title")){
        const id =  e.target.closest(".book-card").dataset.id
        this.find(id).renderShow()
        }
    }

    renderShow = () => {
        const {id, title, genre, author, yearsPublished, imageUrl} = this.data
        document.getElementById("main").innerHTML = `
        <div class="show-card" >
        <img src=${imageUrl} alt=${title}/>
        <p>
        <span class="title">${title}</span><br>
        </p>
        <p>${author}, ${genre}, ${yearsPublished} </p> 
        <button id="goBack">Go Back</button><br> 
        <button id="deleteButton">Delete Button</button>
      </div>
        `
        document.getElementById("goBack").addEventListener("click", Book.renderIndex)
        document.getElementById("deleteButton").addEventListener("click", () => {
          api.destroyBook(id)
          Book.renderIndex()
        })
    }

    static find = (id) => this.all.find(book => book.data.id == id)

    renderCard = () => {
        const { title, genre, author, yearsPublished, imageUrl, id} =  this.data
        document.getElementById("book-container").innerHTML += `
        <div class="book-card" data-id=${id}>
        <img src=${imageUrl} alt=${title}/>
        <p>
        <span class="title">${title}</span><br>
        </p>
        <p>${author}, ${genre}, ${yearsPublished} </p>
      </div>`

    
    }
}