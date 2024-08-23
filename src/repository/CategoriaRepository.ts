import { Categoria } from '../model/entity/Categoria';
import { executarComandoSQL } from '../database/mysql';

export class CategoriaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.categoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarCategoria(categoria: Categoria): Promise<Categoria>{
        const query = "INSERT INTO biblioteca.categoria (nome) VALUES (?)";
        try {
            const resultado = await executarComandoSQL(query, [categoria.nome]);
            console.log('Categoria cadastrada com sucesso:', resultado.insertId);
            categoria.id = resultado.insertId;
            return new Promise<Categoria>((resolve)=>{
                resolve(categoria);
            });
        } catch (err) {
            console.error('Erro ao criar uma nova categoria:', err);
            throw err;
        }    
    }
    
    async atualizaCategoria(categoria: Categoria) :Promise<void>{
        try {
            const query = "UPDATE biblioteca.categoria SET nome = ? WHERE id = ?";
            await executarComandoSQL(query, [categoria.nome, categoria.id]);
            console.log('Categoria atualizada com sucesso:', categoria.id);
        } catch (err) {
            console.error('Erro ao atualizar categoria:', err);
            throw err;
        }
    }
    
    async deletaCategoria(categoria: Categoria) :Promise<void>{
        try {
            const query = "DELETE FROM biblioteca.categoria WHERE id = ?";
            await executarComandoSQL(query, [categoria.id]);
            console.log('Categoria deletada com sucesso:', categoria.id);
        } catch (err) {
            console.error('Erro ao deletar categoria:', err);
            throw err;
        }
    }

    async buscarCategoriaNome(nome?: string): Promise<Categoria[]>{
        const query = "SELECT * FROM biblioteca.categoria where nome = ?";

        try{
            const resultado: Categoria[] = await executarComandoSQL(query, [nome])
            console.log('Categoria localizada com sucesso, ID: ', resultado);
            return new Promise<Categoria[]>((resolve)=> {
                resolve(resultado);
            })
        }catch(err:any){
            console.error(`Falha ao procurar categoria ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async buscarCategoriaID(id: number): Promise<Categoria[]>{
        const query = "SELECT * FROM biblioteca.categoria where id = ?";

        try{
            const resultado = await executarComandoSQL(query, [id])
            console.log('Categoria localizada com sucesso, ID: ', resultado);
            return new Promise<Categoria[]>((resolve)=> {
                resolve(resultado);
            })
        }catch(err:any){
            console.error(`Falha ao procurar categoria ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async listarCategoria(): Promise<Categoria[]>{
        const query = "SELECT * FROM biblioteca.categoria" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Categoria[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
            throw err;
        }    }
}