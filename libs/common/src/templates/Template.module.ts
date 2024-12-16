import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Templates, TemplateSchema } from "./Template.schema";
import { TemplateService } from "./Template.service";
import { TemplateController } from "./Template.controller";

@Module({
  imports: [MongooseModule.forFeature([{
    name: Templates.name,
    schema: TemplateSchema
  }])],
  providers: [
    TemplateService,
  ],
  controllers: [
    TemplateController
  ],
  exports: [
    TemplateService
  ]
})
export class TemplateModule { }