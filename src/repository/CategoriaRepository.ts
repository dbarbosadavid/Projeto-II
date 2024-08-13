import { Categoria } from '../model/Categoria';

export class CategoriaRepository{
    categoriaLista: Categoria[] = []


    cadastrarCategoria(dados: Categoria){
        this.categoriaLista.push(dados)
    }

    buscarCategoriaNome(nome: string): Categoria | undefined{
        return this.categoriaLista.find(categoria => categoria.nome === nome)
    }

    buscarCategoriaID(id: number): Categoria | undefined{
        return this.categoriaLista.find(categoria => categoria.id === id)
    }

    listarCategoria(): Categoria[]{
        return this.categoriaLista
    }
}