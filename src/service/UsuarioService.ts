import { Usuario } from '../model/entity/Usuario';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { PessoaService } from './PessoaService';

export class UsuarioService {

    pessoaService: PessoaService = new PessoaService
    usuarioRepository: UsuarioRepository = new UsuarioRepository

    async cadastrarUsuario(usuarioData: any): Promise<Usuario>{
        const {pessoaID, senha} = usuarioData;
        
        if (typeof pessoaID !== 'number' || typeof senha !== 'string') {
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

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const usuario = new Usuario(id, pessoaID, senha)

        this.usuarioRepository.atualizaUsuario(usuario);
        return usuario;
    }

    async deletaUsuario(usuarioData: any): Promise<Usuario> {
        const { id, pessoaID, senha } = usuarioData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const usuario = new Usuario(id, pessoaID, senha)

        this.usuarioRepository.deletaUsuario(usuario);
        return usuario;
    }
    
    async buscarUsuarioID(usuarioData: any): Promise<Usuario>{
        const idNumber = parseInt(usuarioData, 10);

        const usuario =  await this.usuarioRepository.buscarUsuarioID(idNumber);
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async listarUsuario(): Promise<Usuario[]>{
        const usuarios =  await this.usuarioRepository.listarUsuario();
        console.log("Service - Filtrar Todos", usuarios);
        return usuarios;
    }
    
}