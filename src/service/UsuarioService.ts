import { Usuario } from '../model/entity/Usuario';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { PessoaService } from './PessoaService';

export class UsuarioService {

    pessoaService: PessoaService = new PessoaService
    usuarioRepository: UsuarioRepository = new UsuarioRepository

    async cadastrarUsuario(usuarioData: any): Promise<Usuario>{
        const {pessoaID, senha} = usuarioData;
        
        if (!pessoaID || !senha) {
            throw new Error("Informações incompletas ou incorretas");
        }

        let pessoa = await this.pessoaService.buscarPessoaID(pessoaID);

        if(!pessoa){
            throw new Error("Categoria inexistente.");
        }
        return this.usuarioRepository.cadastrarUsuario(new Usuario(undefined,pessoaID, senha));
    }

    async atualizaUsuario(usuarioData: any): Promise<Usuario> {
        const { id, pessoaID, senha } = usuarioData;

        if (!id || !pessoaID || !senha) {
            throw new Error("Informe os dados corretos.");
        }
        let pessoa = await this.pessoaService.buscarPessoaID(pessoaID);

        if(!pessoa){
            throw new Error("Categoria inexistente.");
        }
        const usuario = new Usuario(id, pessoaID, senha)

        this.usuarioRepository.atualizaUsuario(usuario);
        return usuario;
    }

    async deletaUsuario(usuarioData: any): Promise<Usuario> {
        const { id, pessoaID, senha } = usuarioData;

        if (!id || !pessoaID || !senha) {
            throw new Error("Informe os dados corretos.");
        }
        let pessoa = await this.pessoaService.buscarPessoaID(pessoaID);

        if(!pessoa){
            throw new Error("Categoria inexistente.");
        }
        const usuario = new Usuario(id, pessoaID, senha)

        this.usuarioRepository.deletaUsuario(usuario);
        return usuario;
    }
    
    async buscarUsuarioID(usuarioData: any): Promise<Usuario[]>{
        const idNumber = parseInt(usuarioData, 10);
        if(!idNumber){
            throw new Error("Informe o id")
        }
        const usuario =  await this.usuarioRepository.buscarUsuarioID(idNumber);
        if(usuario.length == 0){
            throw new Error("Usuario nao encontrado")
        }
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async listarUsuario(): Promise<Usuario[]>{
        const usuarios =  await this.usuarioRepository.listarUsuario();
        if(usuarios.length == 0){
            throw new Error("Nenhum usuario cadastrado")
        }
        console.log("Service - Filtrar Todos", usuarios);
        return usuarios;
    }
    
}