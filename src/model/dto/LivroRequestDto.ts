export class LivroRequestDto {
    titulo: string;
    author: string;
    categoriaID: number;


    constructor(titulo?: string, author?: string, categoriaID?: number) {
        this.titulo = titulo || '';
        this.author = author || '';
        this.categoriaID = categoriaID || 0;
    }
}