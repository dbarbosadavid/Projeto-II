import { Pessoa } from '../model/entity/Pessoa';
import { PessoaRepository } from '../repository/PessoaRepository';


export class PessoaService {
    pessoaRepository: PessoaRepository = new PessoaRepository;

    async cadastrarPessoa(pessoaData: any): Promise<Pessoa>{
        const { nome, email } = pessoaData;
        if(!nome || !email){
            throw new Error("Informe os dados completos")
        }
        const pessoa = new Pessoa(undefined, nome, email)

        const novaPessoa =  await this.pessoaRepository.cadastrarPessoa(pessoa);
        console.log("Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async atualizaPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        if(!id || !nome || !email){
            throw new Error("Informe os dados completos")
        }

        const pessoa = new Pessoa(id, nome, email)

        this.pessoaRepository.atualizaPessoa(pessoa);
        return pessoa;
    }

    async deletaPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        if(!id || !nome || !email){
            throw new Error("Informe os dados completos")
        }

        const pessoa = new Pessoa(id, nome, email)

        this.pessoaRepository.deletaPessoa(pessoa);
        return pessoa;
    }

    async buscarPessoaID(pessoaData: any): Promise<Pessoa>{
        const idNumber = parseInt(pessoaData, 10);
        if(!idNumber){
            throw new Error("Informe o id")
        }
        const pessoa =  await this.pessoaRepository.buscarPessoaID(idNumber);
        if(!pessoa){
            throw new Error("Pessoa nao encontrada")
        }
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async buscarPessoaEmail(pessoaData: any): Promise<Pessoa> {
        const email:string = pessoaData;

        const pessoa =  await this.pessoaRepository.buscarPessoaEmail(email);
        if(!pessoa){
            throw new Error("Pessoa nao encontrada")
        }
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async listarPessoa(): Promise<Pessoa[]>{
        const pessoas =  await this.pessoaRepository.listarPessoa();
        if(pessoas.length == 0){
            throw new Error("Nenhuma pessoa cadastrada");
        }
        console.log("Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}