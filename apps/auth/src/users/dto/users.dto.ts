import { Status } from "@app/common";
import { Exclude, Expose } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { QuerySelector } from "mongoose";

export class UsersRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsDate()
    @IsNotEmpty()
    last_login: Date;
}

@Exclude()
export class UserResponseDTO {
  @Expose()
  query: string;
  @Expose()
  email: string;
}
@Exclude()
export class UserDetailRequestDTO {
  @Expose()
  query?: QuerySelector<any>;
}

@Exclude()
export class UserDetailResponseDTO {
  @Expose()
  email: string;
  @Expose()
  displayname: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  avatar: string;
  @Expose()
  gender: string;
  @Expose()
  referralCode: string;
  @Expose()
  skipReferral: string;
  @Expose()
  status: Status;
  @Expose()
  creator: string;
  @Expose()
  create_at: Date;
  @Expose()
  update_at: Date;
  @Expose()
  last_login: Date;
}
