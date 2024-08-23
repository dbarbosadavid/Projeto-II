import { Categoria } from '../model/entity/Categoria';
import { CategoriaRepository } from '../repository/CategoriaRepository';


export class CategoriaService {
    categoriaRepository: CategoriaRepository = new CategoriaRepository();

    async cadastrarCategoria(categoriaData: any): Promise<Categoria>{
        const {nome} = categoriaData

        const categoria = new Categoria(undefined, nome)
        if(!nome){
            throw new Error("Informe o nome")
        }
        if((await this.categoriaRepository.buscarCategoriaNome(nome)).length>0){
            throw new Error("categoria ja existente")
        }
        const novaCategoria =  await this.categoriaRepository.cadastrarCategoria(categoria);
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async atualizaCategoria(categoriaData: any): Promise<Categoria> {
        const { id, nome } = categoriaData;

        if (!id || !nome ) {
            throw new Error("Informe os dados corretos.");
        }
        const categoria = new Categoria(id, nome)

        this.categoriaRepository.atualizaCategoria(categoria);
        return categoria;
    }

    async deletaCategoria(categoriaData: any): Promise<Categoria> {
        const { id, nome } = categoriaData;

        if (!id || !nome ) {
            throw new Error("Informe os dados corretos.");
        }
        const categoria = new Categoria(id, nome)
        this.categoriaRepository.deletaCategoria(categoria);
        return categoria;
    }

    async buscarCategoriaID(categoriaData: any): Promise<Categoria[]>{
        const idNumber = parseInt(categoriaData, 10);
        if(!idNumber){
            throw new Error("Informe o id")
        }
        const categoria =  await this.categoriaRepository.buscarCategoriaID(idNumber);
        if(categoria.length == 0){
            throw new Error("Categoria nao encontrada")
        }
        console.log("Service - Filtrar", categoria);
        return categoria;
    }

    async listarCategoria(): Promise<Categoria[]>{
        const categorias =  await this.categoriaRepository.listarCategoria();
        if(categorias.length == 0){
            throw new Error("Nenhuma categoria cadastrada")
        }
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }
}