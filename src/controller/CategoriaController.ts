import { CategoriaService } from '../service/CategoriaService';
import { CategoriaRequestDto } from '../model/dto/CategoriaRequestDto';
import { Categoria } from '../model/entity/Categoria';
import { BasicResponseDto } from '../model/dto/BasicResponseDto';
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { CategoriaDto } from '../model/dto/CategoriaDto';

@Route("categoria")
@Tags("Categoria")
export class CategoriaController extends Controller{
    categoriaService = new CategoriaService();

    @Post()
    async cadastrarCategoria(
        @Body() dto: CategoriaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.cadastrarCategoria(dto);
            return success(201, new BasicResponseDto("Categoria cadastrada com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    
    @Put()
    async atualizaCategoria(
        @Body() dto: CategoriaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.atualizaCategoria(dto);
            return success(200, new BasicResponseDto("Categoria atualizada com sucesso!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletaCategoria(
        @Body() dto: CategoriaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.deletaCategoria(dto);
            return success(200, new BasicResponseDto("Produto deletado com sucesso!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
    
    @Get("all")
    async listarCategoria(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categorias: Categoria[] = await this.categoriaService.listarCategoria();
            return success(200, new BasicResponseDto("Categorias listadas com sucesso!", categorias));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
    
    @Get("id/{id}")
    async buscarCategoriaPorID(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.buscarCategoriaID(id);
            return success(200, new BasicResponseDto("Categoria encontrada!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}

