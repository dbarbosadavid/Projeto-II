export class Livro {
    id: number
    titulo: string
    author: string
    categoriaID: number 

    constructor(id?: number, titulo?: string, author?: string, categoriaID?: number){
        this.id = id || 0;
        this.titulo = titulo || '';
        this.author = author || '';
        this.categoriaID = categoriaID || 0;
    }
}