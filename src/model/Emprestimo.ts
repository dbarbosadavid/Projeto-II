import { stringParaData } from "../Funcoes/dataFuncoes"
let cont = 0;

export class Emprestimo {
    id: number
    livroID: number
    usuarioID: number
    dataEmprestimo: any
    dataDevolucao: any
    

    constructor(id?: number, livroID?: number, usuarioID?: number, dataEmprestimo?: string, dataDevolucao?: string){
        this.id = this.gerarID(id || 0)
        this.livroID = livroID || 0
        this.usuarioID = usuarioID || 0
        this.dataEmprestimo =  stringParaData(dataEmprestimo || '')
        this.dataDevolucao = stringParaData(dataDevolucao || '')
    }

    private gerarID(id: number): number{
        cont += 1
        return cont
    }
}
