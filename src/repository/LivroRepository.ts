import { executarComandoSQL } from '../database/mysql';
import { Livro } from '../model/entity/Livro';

export class LivroRepository{
    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            categoriaID INT NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarLivro(livro: Livro): Promise<Livro>{
        const query = "INSERT INTO biblioteca.livro (titulo, author, categoriaID) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.author, livro.categoriaID]);
            console.log('Livro cadastrado com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async atualizaLivro(livro: Livro) :Promise<Livro>{
        const query = "UPDATE biblioteca.livro set titulo = ?, author = ?, categoriaID = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.author, livro.categoriaID, livro.id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletaLivro(livro: Livro) :Promise<Livro>{
        const query = "DELETE FROM biblioteca.livro where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log('Livro deletado com sucesso: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async buscarLivro(titulo: string, author: string): Promise<Livro[]>{
        const query = "SELECT * FROM biblioteca.livro where titulo = ? or where author = ?" ;

        try {
            const resultado:Livro[] = await executarComandoSQL(query, [titulo, author]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro ${titulo || author}  gerando o erro: ${err}`);
            throw err;
        }    
    }

    async buscarLivroID(id: number): Promise<Livro>{
        const query = "SELECT * FROM biblioteca.livro where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async listarLivro(): Promise<Livro[]>{
        const query = "SELECT * FROM biblioteca.livro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Livro[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }    
    }
}