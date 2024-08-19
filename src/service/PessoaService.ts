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

        const pessoa = new Pessoa(id, nome, email)

        await this.pessoaRepository.atualizaPessoa(pessoa);
        console.log("Service - Update ", pessoa);
        return pessoa;
    }

    async deletaPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        const pessoa = new Pessoa(id, nome, email)

        await this.pessoaRepository.deletaPessoa(pessoa);
        console.log("Service - Delete ", pessoa);
        return pessoa;
    }

    async buscarPessoaID(pessoaData: any): Promise<Pessoa>{
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepository.buscarPessoaID(idNumber);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async buscarPessoaEmail(pessoaData: any): Promise<Pessoa[]> {
        const email:string = pessoaData;

        const pessoas =  await this.pessoaRepository.buscarPessoaEmail(email);
        console.log("Service - Filtrar", pessoas);
        return pessoas;
    }

    async listarPessoa(): Promise<Pessoa[]>{
        const pessoas =  await this.pessoaRepository.listarPessoa();
        console.log("Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}