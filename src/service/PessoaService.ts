import { Pessoa } from '../model/entity/Pessoa';
import { PessoaRepository } from '../repository/PessoaRepository';


export class PessoaService {
    pessoaRepository: PessoaRepository = new PessoaRepository;

    async cadastrarPessoa(pessoaData: any): Promise<Pessoa>{
        const { nome, email } = pessoaData;
        
        const pessoa = new Pessoa(undefined, nome, email)

        const novaPessoa =  await this.pessoaRepository.cadastrarPessoa(pessoa);
        console.log("Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async atualizaPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const pessoa = new Pessoa(id, nome, email)

        this.pessoaRepository.atualizaPessoa(pessoa);
        return pessoa;
    }

    async deletaPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const pessoa = new Pessoa(id, nome, email)

        this.pessoaRepository.deletaPessoa(pessoa);
        return pessoa;
    }

    async buscarPessoaID(pessoaData: any): Promise<Pessoa>{
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepository.buscarPessoaID(idNumber);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async buscarPessoaEmail(pessoaData: any): Promise<Pessoa> {
        const email:string = pessoaData;

        const pessoa =  await this.pessoaRepository.buscarPessoaEmail(email);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async listarPessoa(): Promise<Pessoa[]>{
        const pessoas =  await this.pessoaRepository.listarPessoa();
        console.log("Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}