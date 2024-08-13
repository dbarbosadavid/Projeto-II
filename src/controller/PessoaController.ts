import { Request, Response } from 'express';
import { PessoaService } from '../service/PessoaService';

const pessoaService = new PessoaService()

export function cadastrarPessoa(req: Request, res: Response) {
    try {
        const novaPessoa = pessoaService.cadastrarPessoa(req.body)
        res.status(200).json({
            message: "Pessoa Cadastrada com Sucesso!!!",
            novaCategoria: novaPessoa
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function listarPessoa(req: Request, res: Response){
    try {
        const lista = pessoaService.listarPessoa()
        res.status(200).json({
            message: "Pessoas Cadastradas:",
            Pessoas: lista
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function buscarPessoaID(req: Request, res: Response){
    try {
        const pessoa = pessoaService.buscarPessoaID(req.params)
        res.status(200).json({
            message: "Registro Encontrado!!!",
            Pessoa: pessoa
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}