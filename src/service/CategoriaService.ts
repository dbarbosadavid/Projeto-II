import { Categoria } from '../model/Categoria';
import { CategoriaRepository } from '../repository/CategoriaRepository';


export class CategoriaService {
    categoriaRepository = new CategoriaRepository

    cadastrarCategoria(dados: Categoria): Categoria | undefined{
        const {nome} = dados
        if(!nome)
            throw new Error('Por favor, informe o nome da Categoria.')

        if(this.categoriaRepository.buscarCategoriaNome(nome))
            throw new Error('Cateogria já cadastrada')
    
        let novaCategoria = new Categoria(0, nome)
        this.categoriaRepository.cadastrarCategoria(novaCategoria)
        return novaCategoria
    }


    buscarCategoriaID(id: any): Categoria | undefined{
        if(this.categoriaRepository.buscarCategoriaID(id))
            return this.categoriaRepository.buscarCategoriaID(id)

        throw new Error ('ID de Categoria não encontrado')
    }

    listarCategoria(): Categoria[]{
        const lista: Categoria[] = this.categoriaRepository.listarCategoria()
        if(lista.length == 0)
            throw new Error ('Sem categorias cadastradas.')

        return lista
    }
}