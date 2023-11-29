import { HttpException, Injectable } from '@nestjs/common';
import { Course } from './entidades/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entidades/tags.entity';
import { CreateCourseDTO } from './dtos/create-course.dto';
import { UpdateCourseDTO } from './dtos/update-couse.dto';

@Injectable()
export class CoursesService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;
  async findAll() {
    return await this.courseRepository.find({
      relations: ['tags'],
    });
  }
  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });
    if (!course) {
      throw new HttpException('curso não encontrado', 404);
    }
    return course;
  }
  async create(createCourseDto: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });
    return await this.courseRepository.save(course);
  }
  async update(id: string, updateCourseDto: UpdateCourseDTO) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    });
    if (!course) {
      throw new HttpException('curso não encontrado', 404);
    }
    return this.courseRepository.save(course);
  }
  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new HttpException('curso não encontrado', 404);
    }
    return this.courseRepository.remove(course);
  }
  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
