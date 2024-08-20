import { Emprestimo } from '../model/entity/Emprestimo';
import { Livro } from '../model/entity/Livro';
import { Usuario } from '../model/entity/Usuario';
import { EmprestimoRepository } from '../repository/EmprestimoRepository';
import { LivroService } from './LivroService';
import { UsuarioService } from './UsuarioService';

export class EmprestimoService {
    livroService: LivroService = new LivroService()
    usuarioService: UsuarioService = new UsuarioService()

    emprestimoRepository: EmprestimoRepository = new EmprestimoRepository();

    async cadastrarEmprestimo(emprestimoData: any): Promise<Emprestimo>{
        const {livroID, usuarioID, dataEmprestimo, dataDevolucao} = emprestimoData;

        if (typeof livroID !== 'number' || typeof usuarioID !== 'number' ||  typeof dataEmprestimo !== 'string' ||  typeof dataDevolucao !== 'string') {
            throw new Error("Informações incompletas ou incorretas");
        }

        let livro = await this.livroService.buscarLivroID(livroID);
        let usuario = await this.usuarioService.buscarUsuarioID(usuarioID);

        if(!livro && !usuario){
            throw new Error("Categoria inexistente.");
        }
        return this.emprestimoRepository.cadastrarEmprestimo(new Emprestimo(undefined, livroID, usuarioID, dataEmprestimo, dataDevolucao));
    }

    async atualizaEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, livroID, usuarioID, dataEmprestimo, dataDevolucao } = emprestimoData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const emprestimo = new Emprestimo(id, livroID, usuarioID, dataEmprestimo, dataDevolucao)

        this.emprestimoRepository.atualizaEmprestimo(emprestimo);
        return emprestimo;
    }

    async deletaEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, livroID, usuarioID, dataEmprestimo, dataDevolucao } = emprestimoData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }

        const emprestimo = new Emprestimo(id, livroID, usuarioID, dataEmprestimo, dataDevolucao)

        this.emprestimoRepository.deletaEmprestimo(emprestimo);
        return emprestimo;
    }

    async buscarEmprestimoID(emprestimoData: any): Promise<Emprestimo>{
        const idNumber = parseInt(emprestimoData, 10);

        const emprestimo =  await this.emprestimoRepository.buscarEmprestimoID(idNumber);
        console.log("Service - Filtrar", emprestimo);
        return emprestimo;
    }
    
    async listarEmprestimo(): Promise<Emprestimo[]>{
        const emprestimos =  await this.emprestimoRepository.listarEmprestimo();
        console.log("Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }
}