import { Usuario } from '../model/Usuario';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { PessoaService } from './PessoaService';

const pessoaService = new PessoaService

export class UsuarioService {
    usuarioRepository = new UsuarioRepository

    cadastrarUsuario(dados: Usuario): Usuario | undefined{
        const {pessoaID, senha} = dados
        if(!pessoaID || !senha)
            throw new Error('Informações Incompletas.')
        
        pessoaService.buscarPessoaID(pessoaID)
        let novoUsuario = new Usuario(0, pessoaID, senha)
        this.usuarioRepository.cadastrarUsuario(novoUsuario)
        return novoUsuario
    }
    
    buscarUsuarioID(id: any): Usuario | undefined{
        if(this.usuarioRepository.buscarUsuarioID(id))
            return this.usuarioRepository.buscarUsuarioID(id)

        throw new Error ('UserID não encontrado')
    }

    listarUsuario(): Usuario[]{
        const lista: Usuario[] = this.usuarioRepository.listarUsuario()
        if(lista.length == 0)
            throw new Error ('Sem usuários cadastrados.')

        return lista
    }
    
}