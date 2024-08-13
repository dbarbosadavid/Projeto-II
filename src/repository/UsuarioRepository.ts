import { Usuario } from '../model/Usuario';

export class UsuarioRepository{
    usuarioLista: Usuario[] = []

    cadastrarUsuario(dados: Usuario){
        this.usuarioLista.push(dados)
    }

    buscarUsuarioID(id: number): Usuario | undefined{
        return this.usuarioLista.find(user => user.id === id)
    }

    listarUsuario(): Usuario[]{
        return this.usuarioLista
    }
}