export class EmprestimoDto {
    id:number;
    livroID: number;
    usuarioID: number;
    dataEmprestimo: string;
    dataDevolucao: string;


    constructor(id: any, livroID: any, usuarioID: any, dataEmprestimo: any, dataDevolucao: any) {
        this.id = id;
        this.livroID = livroID;
        this.usuarioID = usuarioID;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao
    }
}