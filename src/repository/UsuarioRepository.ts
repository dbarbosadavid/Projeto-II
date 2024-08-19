import { Usuario } from '../model/entity/Usuario';
import { executarComandoSQL } from '../database/mysql';

export class UsuarioRepository{
    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pessoaID INT NOT NULL,
            senha VARCHAR(255) NOT NULL
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarUsuario(usuario: Usuario): Promise<Usuario>{
        const query = "INSERT INTO biblioteca.usuario (pessoaID, senha) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.pessoaID, usuario.senha]);
            console.log('Usuario cadastrado com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir usuario:', err);
            throw err;
        }
    }

    async atualizaUsuario(usuario: Usuario) :Promise<Usuario>{
        const query = "UPDATE biblioteca.usuario set pessoaID = ?, senha = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.pessoaID, usuario.senha, usuario.id]);
            console.log('Usuario atualizado com sucesso, ID: ', resultado);
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletaUsuario(usuario: Usuario) :Promise<Usuario>{
        const query = "DELETE FROM biblioteca.usuario where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('Usuario deletado com sucesso: ', resultado);
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async buscarUsuarioID(id: number): Promise<Usuario>{
        const query = "SELECT * FROM biblioteca.usuario where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto localizado com sucesso, ID: ', resultado);
            return new Promise<Usuario>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar usuario de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async listarUsuario(): Promise<Usuario[]>{
        const query = "SELECT * FROM biblioteca.usuario" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
            throw err;
        }
    }
}