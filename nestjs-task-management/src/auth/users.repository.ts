import * as bcrypt from "bcrypt";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";

import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505")
        throw new ConflictException("Username already exists");
      else throw new InternalServerErrorException();
    }
  }
}
