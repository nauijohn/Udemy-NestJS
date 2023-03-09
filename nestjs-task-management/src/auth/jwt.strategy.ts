import { ExtractJwt, Strategy } from "passport-jwt";

import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";

import { JwtPayload } from "./dto/jwt-payload.interface";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger("JwtStrategy");
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: "topSecret51",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<string> {
    this.logger.verbose(
      `In the validate function. payload is "${JSON.stringify(payload)}"`,
    );
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({
      where: { username },
      select: { id: true },
    });
    this.logger.verbose(`user: ${JSON.stringify(user)}`);
    if (!user) throw new UnauthorizedException();
    return user.id;
  }
}
