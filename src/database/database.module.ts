import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entidades/courses.entity';
import { Tag } from 'src/courses/entidades/tags.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
 type : 'postgres',
 host: 'localhost',
 port : 9000,
 username : 'postgres',
 password : 'docker',
 database : 'devtraining',
 entities : [Course, Tag],
 synchronize : false
}

@Module({
  imports : [TypeOrmModule.forRootAsync({
    useFactory : async () => {
      return {
        ...dataSourceOptions
      }
    }
  })],
})
export class DatabaseModule {}
