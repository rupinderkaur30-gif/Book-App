class ApiService{

    constructor(api){
        this.api = api
    }

    getBooks = () => fetch(this.api + "/books").then(res => res.json())
}
