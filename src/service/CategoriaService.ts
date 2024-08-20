import { Categoria } from '../model/entity/Categoria';
import { CategoriaRepository } from '../repository/CategoriaRepository';


export class CategoriaService {
    categoriaRepository: CategoriaRepository = new CategoriaRepository();

    async cadastrarCategoria(categoriaData: any): Promise<Categoria>{
        const {nome} = categoriaData

        const categoria = new Categoria(undefined, nome)

        const novaCategoria =  await this.categoriaRepository.cadastrarCategoria(categoria);
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async atualizaCategoria(categoriaData: any): Promise<Categoria> {
        const { id, nome } = categoriaData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const categoria = new Categoria(id, nome)

        this.categoriaRepository.atualizaCategoria(categoria);
        return categoria;
    }

    async deletaCategoria(categoriaData: any): Promise<Categoria> {
        const { id, nome } = categoriaData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const categoria = new Categoria(id, nome)

        this.categoriaRepository.deletaCategoria(categoria);
        return categoria;
    }

    async buscarCategoriaID(categoriaData: any): Promise<Categoria>{
        const idNumber = parseInt(categoriaData, 10);

        const categoria =  await this.categoriaRepository.buscarCategoriaID(idNumber);
        console.log("Service - Filtrar", categoria);
        return categoria;
    }

    async listarCategoria(): Promise<Categoria[]>{
        const categorias =  await this.categoriaRepository.listarCategoria();
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }
}