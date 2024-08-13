import { Livro } from '../model/Livro';
import { LivroRepository } from '../repository/LivroRepository';
import { CategoriaService } from './CategoriaService';


const categoriaService = new CategoriaService

export class LivroService {
    livroRepository = new LivroRepository

    cadastrarLivro(dados: Livro): Livro | undefined{
        const {titulo, author, categoriaID} = dados
        if(!titulo || !author || !categoriaID)
            throw new Error('Informações Incompletas')
        
        if(this.livroRepository.buscarLivro(titulo, author))
            throw new Error('Livro Já Cadastrado')

        categoriaService.buscarCategoriaID(categoriaID)
        let novoLivro = new Livro(0, titulo, author, categoriaID)
        this.livroRepository.cadastrarLivro(novoLivro)
        return novoLivro
    }


    buscarLivroID(id: any): Livro | undefined{
        if(this.livroRepository.buscarLivroID(id))
            return this.livroRepository.buscarLivroID(id)

        throw new Error ('Livro não encontrado')
    }
    
    listarLivro(): Livro[]{
        const lista: Livro[] = this.livroRepository.listarLivro()
        if(lista.length == 0)
            throw new Error ('Nenhum livro cadastrado.')

        return lista
    }
}