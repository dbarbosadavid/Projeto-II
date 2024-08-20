export class LivroDto {
    id:number;
    titulo: string;
    author: string;
    categoriaID: number;


    constructor(id: any, titulo: any, author: any, categoriaID: any) {
        this.id = id;
        this.titulo = titulo;
        this.author = author;
        this.categoriaID = categoriaID;
    }
}