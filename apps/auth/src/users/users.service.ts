import { Injectable } from "@nestjs/common";
import { Users } from "./schema/users.schema";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async validateUser(email: string): Promise<any> {
        const user = await this.usersRepository.findOne({ filter: { email: email }});
        console.log('ThanhNguyen:: user', user);
        return user;

    }

    async getUser(getUserArgs: Partial<Users>) {
        const result =  await this.usersRepository.find(getUserArgs);
        console.log('ThanhNguyen:: result', result);
        return result;
    }
}