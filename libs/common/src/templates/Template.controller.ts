import { Controller } from "@nestjs/common";
import { TemplateService } from "./Template.service";

@Controller('template')
export class TemplateController {
  constructor(private templateService: TemplateService) { }

  // @DefaultPost('', Template)
  // @WithRole(Roles.Admin)
  // async createTemplate(@Body() data: CreateTemplateDto) {
  //   // return this.templateService.create(data);
  // }

  // @DefaultGet('', PaginationResponseFactory(Template))
  // @WithRole(Roles.Admin)
  // async getAll(@Query() query: GetAllTemplateQuery) {
  //   // return this.templateService.getAll(query);
  // }

  // @DefaultGet(':templateId', Template)
  // @WithRole(Roles.Admin)
  // async getOne(@Param() params: GetOneTemplateParams) {
  //   return this.templateService.findById(params.templateId);
  // }

  // @DefaultGet('view/:templateId', String)
  // @ApiQuery({
  //   name: 'metadata',
  //   type: 'object'
  // })
  // async view(@Param() params: ViewTemplateParams, @Query() query: any) {
  //   if (query.products) query.products = JSON.parse(query.products);
  //   return this.templateService.compile({ _id: params.templateId }, query);
  // }

  // @DefaultPut(':templateId')
  // @WithRole(Roles.Admin)
  // async updateOne(@Param() params: UpdateTemplateParams, @Body() body: UpdateTemplateDto) {
  //   return this.templateService.findOneAndUpdate({ _id: params.templateId }, body, { new: true });
  // }

  // @DefaultDelete(':templateId', DeleteResponse)
  // @WithRole(Roles.Admin)
  // async remove(@Query() query: DeleteTemplateQuery) {
  //   return this.templateService.deleteMany(query.templateIds);
  // }
}
