export class UsuarioRequestDto {
    pessoaID: number;
    senha: string;


    constructor(pessoaID?: number, senha?: string) {
        this.pessoaID = pessoaID || 0;
        this.senha = senha || '';
    }
}