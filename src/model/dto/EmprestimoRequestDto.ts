export class EmprestimoRequestDto {
    livroID: number;
    usuarioID: number;
    dataEmprestimo: string;
    dataDevolucao: string;


    constructor(livroID?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.livroID = livroID || 0;
        this.usuarioID = usuarioId || 0;
        this.dataEmprestimo = dataEmprestimo || '';
        this.dataDevolucao = dataDevolucao || '';
    }
}