import { Request, Response } from 'express';
import { EmprestimoService } from '../service/EmprestimoService';

const emprestimoService = new EmprestimoService()

export function cadastrarEmprestimo(req: Request, res: Response) {
    try {
        const novoEmprestimo = emprestimoService.cadastrarEmprestimo(req.body)
        res.status(200).json({
            message: "Emprestimo Registrado com Sucesso!!!",
            novaCategoria: novoEmprestimo
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function listarEmprestimo(req: Request, res: Response){
    try {
        const lista = emprestimoService.listarEmprestimo()
        res.status(200).json({
            message: "Emprestimos Realizados:",
            Emprestimos: lista
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function buscarEmprestimoID(req: Request, res: Response){
    try {
        const emprestimo = emprestimoService.buscarEmprestimoID(req.params)
        res.status(200).json({
            message: "Emprestimo Encontrado!!!",
            Emprestimo: emprestimo
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}