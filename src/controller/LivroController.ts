import { LivroService } from '../service/LivroService';
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { LivroRequestDto } from '../model/dto/LivroRequestDto';
import { BasicResponseDto } from '../model/dto/BasicResponseDto';
import { Livro } from '../model/entity/Livro';
import { LivroDto } from '../model/dto/LivroDto';

@Route("livro")
@Tags("Livro")
export class LivroController extends Controller {
    livroService = new LivroService();

    @Post()
    async cadastrarProduto(
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.cadastrarLivro(dto);
            return success(201, new BasicResponseDto("Produto criado com sucesso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    
    @Put()
    async atualizaLivro(
        @Body() dto: LivroDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.atualizaLivro(dto);
            return success(200, new BasicResponseDto("Produto atualizado com sucesso!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarProduto(
        @Body() dto: LivroDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.deletaLivro(dto);
            return success(200, new BasicResponseDto("Produto deletado com sucesso!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarLivro(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livros: Livro[] = await this.livroService.listarLivro();
            return success(200, new BasicResponseDto("Produtos listados com sucesso!", livros));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async buscaLivroPorID(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.buscarLivroID(id);
            return success(200, new BasicResponseDto("Produto encontrado!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}