import { Request, Response } from 'express';
import { CategoriaService } from '../service/CategoriaService';

const categoriaService = new CategoriaService()

export function cadastrarCategoria(req: Request, res: Response) {
    try {
        const novaCategoria = categoriaService.cadastrarCategoria(req.body)
        res.status(200).json({
            message: "Categoria Cadastrada com Sucesso!!!",
            novaCategoria: novaCategoria
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function listarCategoria(req: Request, res: Response){
    try {
        const lista = categoriaService.listarCategoria()
        res.status(200).json({
            message: "Categorias Cadastradas:",
            Categorias: lista
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function buscarCategoriaID(req: Request, res: Response){
    try {
        const categoria = categoriaService.buscarCategoriaID(req.params)
        res.status(200).json({
            message: "Categoria Encontrada!!!",
            Categoria: categoria
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}