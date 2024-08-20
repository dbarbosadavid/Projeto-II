let cont = 0

export class Usuario {
    id: number
    pessoaID: number
    senha: string 

    constructor(id?: number, pessoaID?: number, senha?: string){
        this.id = this.gerarID(id || 0)
        this.pessoaID = pessoaID || 0
        this.senha = senha || ''
    }

    private gerarID(id: number): number{
        cont += 1
        return cont
    }
}
