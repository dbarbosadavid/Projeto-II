let cont=0

export class Pessoa {
    id: number
    nome: string
    email: string 

    constructor(id?: number, nome?: string, email?: string){
        this.id = this.gerarID(id || 0) 
        this.nome = nome || ''
        this.email = email || ''
    }

    private gerarID(id: number): number{
        cont += 1
        return cont
    }
}
