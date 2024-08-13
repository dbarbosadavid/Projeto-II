import { Emprestimo } from '../model/Emprestimo';
import { EmprestimoRepository } from '../repository/EmprestimoRepository';
import { LivroService } from './LivroService';
import { UsuarioService } from './UsuarioService';

const livroSerivice = new LivroService()
const usuarioService = new UsuarioService()

export class EmprestimoService {
    emprestimoRepository = new EmprestimoRepository

    cadastrarEmprestimo(dados: Emprestimo): Emprestimo | undefined{
        const {livroID, usuarioID, dataEmprestimo} = dados
        if(!livroID || !usuarioID || !dataEmprestimo)
            throw new Error('Por favor, informe o nome da Categoria.')
        
        livroSerivice.buscarLivroID(livroID)
        usuarioService.buscarUsuarioID(usuarioID)
        let novoEmprestimo = new Emprestimo(0 , livroID, usuarioID, dataEmprestimo)
        this.emprestimoRepository.cadastrarEmprestimo(novoEmprestimo)
        return novoEmprestimo
    }

    buscarEmprestimoID(id: any): Emprestimo | undefined{
        if(this.emprestimoRepository.buscarEmprestimoID(id))
            return this.emprestimoRepository.buscarEmprestimoID(id)

        throw new Error ('Empréstimo não encontrado')
    }
    
    listarEmprestimo(): Emprestimo[]{
        const lista: Emprestimo[] = this.emprestimoRepository.listarEmprestimo()
        if(lista.length == 0)
            throw new Error ('Não foram realizados empréstimos.')

        return lista
    }
}