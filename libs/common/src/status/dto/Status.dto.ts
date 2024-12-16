import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStatusRequest {
    @IsString()
    @IsNotEmpty()
    // @RemoveSpecialCharacter()
    // @Column({ select: false })
    // @IsUnique(
    //     { tableName: StatusCollection, column: 'code' },
    //     {
    //         message: i18nValidationMessage('validation.FIELD_EXIST', {
    //             message: 'value',
    //         }),
    //     },
    // )
    code: string;

    @Expose()
    @IsNotEmpty()
    // @RemoveSpecialCharacter()
    // @Column({ select: false })
    // @IsUnique(
    //     { tableName: StatusCollection, column: 'name' },
    //     {
    //         message: i18nValidationMessage('validation.FIELD_EXIST', {
    //             message: 'value',
    //         }),
    //     },
    // )
    name: string;
  
}

@Exclude()
export class StatusResponse {
  @Expose()
  name: string;
}
