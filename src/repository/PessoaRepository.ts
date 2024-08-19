import { Pessoa } from '../model/entity/Pessoa';
import { executarComandoSQL } from '../database/mysql';

export class PessoaRepository{
    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }


    async cadastrarPessoa(pessoa: Pessoa): Promise<Pessoa>{
        const query = "INSERT INTO biblioteca.pessoa (nome, email) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
            console.log('Pessoa cadastrada com sucesso, ID: ', resultado.insertId);
            pessoa.id = resultado.insertId;
            return new Promise<Pessoa>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err) {
            console.error('Erro ao cadastrar pessoa :', err);
            throw err;
        }   
    }

    async atualizaPessoa(pessoa: Pessoa) :Promise<Pessoa>{
        const query = "UPDATE biblioteca.pessoa set nome = ?, email = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email, pessoa.id]);
            console.log('Pessoa atualizada com sucesso, ID: ', resultado);
            return new Promise<Pessoa>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletaPessoa(pessoa: Pessoa) :Promise<Pessoa>{
        const query = "DELETE FROM biblioteca.pessoa where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.id]);
            console.log('Pessoa deletada com sucesso: ', resultado);
            return new Promise<Pessoa>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar a pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async buscarPessoaEmail(email: string): Promise<Pessoa[]>{
        const query = "SELECT * FROM biblioteca.pessoa where email = ?" ;

        try {
            const resultado:Pessoa[] = await executarComandoSQL(query, [email]);
            console.log('Pessoa localizada com sucesso, ID: ', resultado);
            return new Promise<Pessoa[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar pessoa ${email} gerando o erro: ${err}`);
            throw err;
        }
    }

    async buscarPessoaID(id: number): Promise<Pessoa>{
        const query = "SELECT * FROM biblioteca.pessoa where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Pessoa localizada com sucesso, ID: ', resultado);
            return new Promise<Pessoa>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar pessoa de ID ${id} gerando o erro: ${err}`);
            throw err;
        }    
    }

    async listarPessoa(): Promise<Pessoa[]>{
        const query = "SELECT * FROM biblioteca.pessoa" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Pessoa[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as pessoas gerando o erro: ${err}`);
            throw err;
        }
    }
}