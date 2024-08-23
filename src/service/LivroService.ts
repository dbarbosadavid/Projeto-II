import { Livro } from '../model/entity/Livro';
import { LivroRepository } from '../repository/LivroRepository';
import { CategoriaService } from './CategoriaService';

export class LivroService {

    categoriaService: CategoriaService = new CategoriaService();
    livroRepository: LivroRepository = new LivroRepository

    async cadastrarLivro(livroData: any): Promise<Livro>{
        const {titulo, author, categoriaID} = livroData

        if (!titulo || !author || !categoriaID) {
            throw new Error("Informações incompletas ou incorretas");
        }

        let categoria = await this.categoriaService.buscarCategoriaID(categoriaID);

        if(!categoria){
            throw new Error("Categoria inexistente.");
        }
        return this.livroRepository.cadastrarLivro(new Livro(undefined,titulo, author, categoriaID));
    }

    async atualizaLivro(livroData: any): Promise<Livro> {
        const { id, titulo, author, categoriaID } = livroData;
        if (!id || !titulo || !author || !categoriaID) {
            throw new Error("Informações incompletas ou incorretas");
        }

        const livro = new Livro(id, titulo, author, categoriaID)

        this.livroRepository.atualizaLivro(livro);
        return livro;
    }

    async deletaLivro(livroData: any): Promise<Livro> {
        const { id, titulo, author, categoriaID } = livroData;

        if (!id || !titulo || !author || !categoriaID) {
            throw new Error("Informações incompletas ou incorretas");
        }

        const livro = new Livro(id, titulo, author, categoriaID)

        this.livroRepository.deletaLivro(livro);
        return livro;
    }


    async buscarLivroID(livroData: any): Promise<Livro>{
        const idNumber = parseInt(livroData, 10);
        if(!idNumber){
            throw new Error("Informe o id")
        }
        const livro =  await this.livroRepository.buscarLivroID(idNumber);
        if(!livro){
            throw new Error("Livro nao encontrado")
        }
        console.log("Service - Filtrar", livro);
        return livro;
    }
    
    async listarLivro(): Promise<Livro[]>{
        const livros =  await this.livroRepository.listarLivro();
        if(livros.length == 0){
            throw new Error("Nenhum livro cadastrado")
        }
        console.log("Service - Filtrar Todos", livros);
        return livros;
    }
}