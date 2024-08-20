import { stringParaData } from "../../Funcoes/dataFuncoes";

export class Emprestimo {
    id: number;
    livroID: number;
    usuarioID: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    

    constructor(id?: number, livroID?: number, usuarioID?: number, dataEmprestimo?: string, dataDevolucao?: string){
        this.id = id || 0;
        this.livroID = livroID || 0;
        this.usuarioID = usuarioID || 0
        this.dataEmprestimo =  stringParaData(dataEmprestimo || '');
        this.dataDevolucao = stringParaData(dataDevolucao || '');
    }
}
