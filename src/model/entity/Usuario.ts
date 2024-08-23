export class Usuario {
    id: number
    pessoaID: number
    senha: string 

    constructor(id?: number, pessoaID?: number, senha?: string){
        this.id = id || 0
        this.pessoaID = pessoaID || 0
        this.senha = senha || ''
    }

}
