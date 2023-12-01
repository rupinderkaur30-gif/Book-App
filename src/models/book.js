class Book {
static all = []
    constructor(data){
        this.data = data
        this.constructor.all.push(this)
        console.log(this)
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
        main.append(bookContainer)
        this.all.forEach(movie => movie.renderCard())
        bookContainer.addEventListener("click", this.handleIndexClick)
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
      </div>
        `
        document.getElementById("goBack").addEventListener("click", Book.renderIndex)
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