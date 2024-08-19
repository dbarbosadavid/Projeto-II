import { Emprestimo } from '../model/entity/Emprestimo';
import { executarComandoSQL } from '../database/mysql';

export class EmprestimoRepository{
    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livroID INT NOT NULL,
            usuarioID INT NOT NULL,
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo>{
        const query = "INSERT INTO biblioteca.emprestimo (livroID, usuarioID, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroID, emprestimo.usuarioID, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('Emprestimo cadastrado com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise<Emprestimo>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err) {
            console.error('Erro ao inserir o produto:', err);
            throw err;
        }
    }

    async buscarEmprestimoID(id: number): Promise<Emprestimo>{
        const query = "SELECT * FROM biblioteca.emprestimo where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o emprestimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async atualizaEmprestimo(emprestimo: Emprestimo) :Promise<Emprestimo>{
        const query = "UPDATE biblioteca.emprestimo set livroID = ?, usuarioID = ?, dataEmprestimo = ?, dataDevolucao = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroID, emprestimo.usuarioID, emprestimo.dataEmprestimo, emprestimo.dataDevolucao, emprestimo.id]);
            console.log('Emprestimo atualizado com sucesso, ID: ', resultado);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletaEmprestimo(emprestimo: Emprestimo) :Promise<Emprestimo>{
        const query = "DELETE FROM biblioteca.emprestimo where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.id]);
            console.log('Emprestimo deletado com sucesso: ', resultado);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async listarEmprestimo(): Promise<Emprestimo[]>{
        const query = "SELECT * FROM biblioteca.emprestimo" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Emprestimo[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os emprestimos gerando o erro: ${err}`);
            throw err;
        }
    }
}