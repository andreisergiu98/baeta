import { DMMF } from "@prisma/generator-helper";

type VisitorInput<T> = (model: T) => void | Promise<void>;

export interface Visitor {
  model: Array<VisitorInput<DMMF.Model>>;
  modelEnum: Array<VisitorInput<DMMF.DatamodelEnum>>;
  schemaEnum: Array<VisitorInput<DMMF.SchemaEnum>>;
  inputType: Array<VisitorInput<DMMF.InputType>>;
  outputType: Array<VisitorInput<DMMF.OutputType>>;
}

export type VisitorBuilder = ReturnType<typeof createVisitorBuilder>;

export function createVisitorBuilder() {
  const visitor: Visitor = {
    model: [],
    modelEnum: [],
    schemaEnum: [],
    inputType: [],
    outputType: [],
  };

  function getVisitor() {
    return visitor;
  }

  function onModel(input: VisitorInput<DMMF.Model>) {
    visitor.model.push(input);
  }

  function onModelEnum(input: VisitorInput<DMMF.DatamodelEnum>) {
    visitor.modelEnum.push(input);
  }

  function onSchemaEnum(input: VisitorInput<DMMF.SchemaEnum>) {
    visitor.schemaEnum.push(input);
  }

  function onInputType(input: VisitorInput<DMMF.InputType>) {
    visitor.inputType.push(input);
  }

  function onOutputType(input: VisitorInput<DMMF.OutputType>) {
    visitor.outputType.push(input);
  }

  return {
    getVisitor,
    onModel,
    onModelEnum,
    onSchemaEnum,
    onInputType,
    onOutputType,
  };
}

function visitItem<T>(
  item: T,
  visitor: Visitor,
  getInputs: (visitor: Visitor) => Array<VisitorInput<T>>
) {
  const handlers = getInputs(visitor);
  return handlers.map((handler) => handler(item));
}

export function visitItems<T>(
  items: T[],
  visitors: Visitor[],
  getInputs: (visitor: Visitor) => Array<VisitorInput<T>>
) {
  const promises: Array<void | Promise<void>> = [];

  for (const item of items) {
    for (const visitor of visitors) {
      promises.push(...visitItem(item, visitor, getInputs));
    }
  }

  return Promise.all(promises);
}

export function visit(document: DMMF.Document, visitors: Visitor[]) {
  const models = visitItems(
    document.datamodel.models,
    visitors,
    (visitor) => visitor.model
  );

  const modelEnums = visitItems(
    document.datamodel.enums,
    visitors,
    (visitor) => visitor.modelEnum
  );

  const inputTypes = visitItems(
    document.schema.inputObjectTypes.prisma,
    visitors,
    (visitor) => visitor.inputType
  );

  const outputTypes = visitItems(
    document.schema.outputObjectTypes.prisma,
    visitors,
    (visitor) => visitor.outputType
  );

  const enumTypes = visitItems(
    document.schema.enumTypes.prisma,
    visitors,
    (visitor) => visitor.schemaEnum
  );

  return Promise.all([
    models,
    modelEnums,
    inputTypes,
    outputTypes,
    enumTypes,
  ]).then(() => {
    // do nothing
  });
}
