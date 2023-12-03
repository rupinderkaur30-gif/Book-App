class ApiService{

    constructor(api){
        this.api = api
    }

    getBooks = () => fetch(this.api + "/books").then(res => res.json())

    createBook = (newBook) =>  fetch(this.api + "/books", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
          })
            .then(response => response.json())
          
            destroyBook = (id) => {
                Book.all = Book.all.filter(book => book.data.id !== id)
              
                 return fetch(this.api + "/books/" + id, {
                   headers: {
                     'Content-Type': 'application/json',
                   },
                     method: 'DELETE' 
                 })
               }
}
