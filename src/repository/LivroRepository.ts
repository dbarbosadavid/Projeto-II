import { Livro } from '../model/Livro';

export class LivroRepository{
    livroLista: Livro[] = []

    cadastrarLivro(dados: Livro){
        this.livroLista.push(dados)
    }

    buscarLivro(titulo: string, author: string): Livro | undefined{
        return this.livroLista.find(livro => livro.titulo === titulo && livro.author === author)
    }

    buscarLivroID(id: number): Livro | undefined{
        return this.livroLista.find(livro => livro.id === id)
    }

    listarLivro(): Livro[]{
        return this.livroLista
    }
}