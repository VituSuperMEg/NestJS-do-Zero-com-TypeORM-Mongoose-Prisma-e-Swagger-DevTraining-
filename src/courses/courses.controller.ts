import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res, Put} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dtos/create-course.dto';
import { UpdateCourseDTO } from './dtos/update-couse.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly courseService : CoursesService) {}

  @Get()
  findAll() {
    return this.courseService.findAll()
  }
  @Get(':id')
  findOne(@Param('id') id : string) {
    return this.courseService.findOne(id)
  }
  // @HttpCode(204) - No Content
  // Mudar o status code 
  @Post()
  create(@Body() createCourseDTO : CreateCourseDTO) {
    return this.courseService.create(createCourseDTO);
  }
  @Put(':id')
  update(@Param('id') id : string, @Body() updateCourseDTO: UpdateCourseDTO) {
     this.courseService.update(id, updateCourseDTO);
  }
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id : string) {
     return this.courseService.remove(id);
  }
}

