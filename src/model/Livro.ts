let cont = 0

export class Livro {
    id: number
    titulo: string
    author: string
    categoriaID: number 

    constructor(id?: number, titulo?: string, author?: string, categoriaID?: number){
        this.id = this.gerarID(id || 0) 
        this.titulo = titulo || ''
        this.author = author || ''
        this.categoriaID = categoriaID || 0
    }

    private gerarID(id: number): number{
        cont += 1
        return cont
    }
}