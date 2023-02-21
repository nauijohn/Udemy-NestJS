import { TypeOrmExModule } from "src/database/typeorm-ex.module";

import { Module } from "@nestjs/common";

import { TasksController } from "./tasks.controller";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
