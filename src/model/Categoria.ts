let cont = 0;

export class Categoria {
    id: number
    nome: string

    constructor(id?:number, nome?:string){
        this.id = this.gerarID(id || 0);
        this.nome = nome || ''
    }

    private gerarID(id: number): number{
        cont += 1
        return cont
    }
}
