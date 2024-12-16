import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "../base/base.schema";
export type TemplateDocument = Document & Templates;

// @Schema({
//   timestamps: true
// })
@Schema()
export class Templates extends BaseSchema {

  @Prop({
    unique: true
  })
  name: string;

  @Prop()
  template: string; // This can be html string

  @Prop({
    type: Array<string>
  })
  requiredFields: string[];
}

export const TemplateSchema = SchemaFactory.createForClass(Templates);
