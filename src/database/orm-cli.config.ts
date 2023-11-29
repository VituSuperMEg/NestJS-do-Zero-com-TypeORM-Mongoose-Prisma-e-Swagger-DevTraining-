import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1700781965190 } from "src/migrations/1700781965190-CreateCoursesTable";
import { CreateTagsTable1700782780226 } from "src/migrations/1700782780226-CreateTagsTable";
import { CreateCoursesTagsTable1700784147152 } from "src/migrations/1700784147152-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1700784420018 } from "src/migrations/1700784420018-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1700784923519 } from "src/migrations/1700784923519-AddTagsIdToCoursesTagsTable";


export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1700781965190, CreateTagsTable1700782780226, CreateCoursesTagsTable1700784147152, AddCoursesIdToCoursesTagsTable1700784420018, AddTagsIdToCoursesTagsTable1700784923519]
})