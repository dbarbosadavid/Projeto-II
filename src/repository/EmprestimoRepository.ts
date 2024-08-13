import { Emprestimo } from '../model/Emprestimo';

export class EmprestimoRepository{
    emprestimoLista: Emprestimo[] = []

    cadastrarEmprestimo(dados: Emprestimo){
        this.emprestimoLista.push(dados)
    }
//
    buscarEmprestimoID(id: number): Emprestimo | undefined{
        return this.emprestimoLista.find(emp => emp.id === id)
    }

    listarEmprestimo(): Emprestimo[]{
        return this.emprestimoLista
    }
}