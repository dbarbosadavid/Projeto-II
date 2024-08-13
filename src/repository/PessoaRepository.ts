import { Pessoa } from '../model/Pessoa';

export class PessoaRepository{
    pessoaLista: Pessoa[] = []


    cadastrarPessoa(dados: Pessoa){
        this.pessoaLista.push(dados)
    }

    buscarPessoaEmail(email: string): Pessoa | undefined{
        return this.pessoaLista.find(pessoa => pessoa.email === email)
    }

    buscarPessoaID(id: number): Pessoa | undefined{
        return this.pessoaLista.find(pessoa => pessoa.id === id)
    }

    listarPessoa(): Pessoa[]{
        return this.pessoaLista
    }
}