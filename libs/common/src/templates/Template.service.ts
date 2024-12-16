import { Templates, TemplateDocument } from "./Template.schema";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { classToPlain } from "class-transformer";
import Handlebars from "handlebars";
import _ from "lodash";
import { BaseServices } from "../base/base.services";

@Injectable()
export class TemplateService extends BaseServices<TemplateDocument> {

  constructor(
    @InjectModel(Templates.name) private templateModel: Model<TemplateDocument>
  ) {
    super(templateModel)
  }

  async compile<T extends Record<string, any>>(filter: FilterQuery<TemplateDocument>, metadata: T) {
    const template = await this.findOne({ filter: filter });
    if (!template) throw new BadRequestException("Not found template in system");
    console.log('ThanhNguyen:: metadata', template);
    // template.requiredFields.map(field => {
    //   console.log('ThanhNguyen:: field', field);
    //   console.log('ThanhNguyen:: field', _.get(metadata, field));
    //   // if (_?.get(metadata, field) === undefined) throw new BadRequestException(`Field ${field} is required but not recieved`)
    // })
    const html = Handlebars.compile(template?.template)
    return html(metadata);
  }
}
