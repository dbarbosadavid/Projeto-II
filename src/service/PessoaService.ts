import { Pessoa } from '../model/Pessoa';
import { PessoaRepository } from '../repository/PessoaRepository';


export class PessoaService {
    pessoaRepository = new PessoaRepository

    cadastrarPessoa(dados: Pessoa): Pessoa | undefined{
        const {nome, email} = dados
        if(!nome || !email)
            throw new Error('Informações Incompletas.')

        if(this.pessoaRepository.buscarPessoaEmail(email)) 
            throw new Error('Este email já está em uso')
        
        let novaPessoa = new Pessoa(0, nome, email)
        this.pessoaRepository.cadastrarPessoa(novaPessoa)
        return novaPessoa
    }

    buscarPessoaID(id: any): Pessoa | undefined{
        if(this.pessoaRepository.buscarPessoaID(id))
            return this.pessoaRepository.buscarPessoaID(id)

        throw new Error ('ID de Pessoa não encontrado')
    }

    listarPessoa(): Pessoa[]{
        const lista: Pessoa[] = this.pessoaRepository.listarPessoa()
        if(lista.length == 0)
            throw new Error ('Sem pessoas cadastradas.')

        return lista
    }

}