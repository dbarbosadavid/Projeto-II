import { Request, Response } from 'express';
import { LivroService } from '../service/LivroService';

const livroService = new LivroService()

export function cadastrarLivro(req: Request, res: Response) {
    try {
        const novoLivro = livroService.cadastrarLivro(req.body)
        res.status(200).json({
            message: "Livro Cadastrado com Sucesso!!!",
            novoLivro: novoLivro
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function listarLivro(req: Request, res: Response){
    try {
        const lista = livroService.listarLivro()
        res.status(200).json({
            message: "Livros Cadastrados:",
            Livros: lista
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function buscarLivroID(req: Request, res: Response){
    try {
        const livro = livroService.buscarLivroID(req.params)
        res.status(200).json({
            message: "Livro Encontrado!!!",
            Livro: livro
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}