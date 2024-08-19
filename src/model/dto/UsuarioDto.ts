export class UsuarioDto {
    id:number;
    pessoaID: number;
    senha: string;

    constructor(id: any, pessoaID: any, senha: any) {
        this.id = id;
        this.pessoaID = pessoaID;
        this.senha = senha;
    }
}