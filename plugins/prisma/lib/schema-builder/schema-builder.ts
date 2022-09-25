import { buildSchema, validateSchema } from "graphql";
import { concat, mergeDeepWith, path } from "ramda";
import { DMMF } from "../dmmf";
import { findModelByEnum } from "../model-enum";
import { findModelByInput } from "../model-inputs";
import { findModelByOperationSchema } from "../model-operations";
import { findModelByOutput } from "../model-outputs";
import { isOperation } from "./schema-builder-utils";
import { createVisitorBuilder } from "../visitor";
import { printPrismaModel } from "../print/prisma-model";
import { printPrismaEnumModel } from "../print/prisma-enum-model";
import { printPrismaInput } from "../print/prisma-input";
import { printPrismaEnum } from "../print/prisma-enum";
import { printScalars, scalars } from "../print/type";
import { printDirectives, directives } from "../print/directive";
import {
  printPrismaOperation,
  printPrismaOutput,
} from "../print/prisma-output";
import {
  createGlobalSchemas,
  createModuleSchemas,
} from "./schema-builder-files";
import { Store } from "../context";
import { GenerateOptions } from "../generator";
import { relative } from "path";

export interface GlobalSchemaDefinition {
  enums: string[];
  scalars: string[];
  directives: string[];
  inputTypes: string[];
  outputTypes: string[];
}

export interface ModuleSchemaDefinition {
  name: string;
  model: string[];
  enums: string[];
  queries: string[];
  mutations: string[];
  inputTypes: string[];
  outputTypes: string[];
}

export type ModuleDefinitionMap = Record<
  string,
  ModuleSchemaDefinition | undefined
>;

export function createSchemaBuilder(store: Store, options: GenerateOptions) {
  const { models, inputsMap, outputsMap, operationsMap } = store;

  const moduleDefinitions: ModuleDefinitionMap = {};

  let globalDefinitions: GlobalSchemaDefinition = {
    enums: [],
    scalars: scalars,
    directives: directives,
    inputTypes: [],
    outputTypes: [],
  };

  const schema = [printScalars(), printDirectives()];

  function pushDefinition(model: string, def: Partial<ModuleSchemaDefinition>) {
    const current = moduleDefinitions[model] ?? {
      name: model,
      model: [],
      queries: [],
      mutations: [],
      inputTypes: [],
      outputTypes: [],
      enums: [],
    };
    moduleDefinitions[model] = mergeDeepWith(concat, current, def);
  }

  function addToGlobal(def: Partial<GlobalSchemaDefinition>) {
    globalDefinitions = mergeDeepWith(concat, globalDefinitions, def);
  }

  function addToSchema(value: string) {
    schema.push(value);
  }

  const visitor = createVisitorBuilder();

  visitor.onModel((model) => {
    const content = printPrismaModel(model);
    addToSchema(content);
    pushDefinition(model.name, { model: [content] });
  });

  visitor.onModelEnum((enumModel) => {
    const content = printPrismaEnumModel(enumModel);
    addToSchema(content);
    addToGlobal({ enums: [content] });
  });

  visitor.onSchemaEnum((enumType) => {
    const content = printPrismaEnum(enumType);
    const model = findModelByEnum(models, enumType);

    addToSchema(content);

    if (!model) {
      return addToGlobal({ enums: [content] });
    }

    pushDefinition(model, { enums: [content] });
  });

  visitor.onInputType((inputType) => {
    const content = printPrismaInput(inputType);
    const model = findModelByInput(inputsMap, inputType);

    addToSchema(content);

    if (!model) {
      return addToGlobal({ inputTypes: [content] });
    }

    pushDefinition(model, { inputTypes: [content] });
  });

  visitor.onOutputType((outputType) => {
    const content = printPrismaOutput(outputType);

    addToSchema(content);

    if (isOperation(outputType.name)) {
      return handleOperation(outputType, outputType.name);
    }

    const model = findModelByOutput(outputsMap, outputType);

    if (!model) {
      return addToGlobal({ outputTypes: [content] });
    }

    pushDefinition(model, { outputTypes: [content] });
  });

  function handleOperation(
    outputType: DMMF.OutputType,
    operation: "Query" | "Mutation"
  ) {
    for (const field of outputType.fields) {
      const model = findModelByOperationSchema(operationsMap, field);

      if (!model) {
        continue;
      }

      const content = printPrismaOperation(operationsMap, field);

      if (!content) {
        continue;
      }

      if (operation === "Query") {
        pushDefinition(model, {
          queries: [content],
        });
      }

      if (operation === "Mutation") {
        pushDefinition(model, {
          mutations: [content],
        });
      }
    }
  }

  function validate() {
    validateSchema(buildSchema(schema.join("\n")));
  }

  function compose() {
    validate();

    const fileOptions = {
      root: options.modulesDir,
      namespace: options.schemaNamespace,
      casing: options.casing,
    };

    return [
      ...createGlobalSchemas(globalDefinitions, fileOptions),
      ...createModuleSchemas(moduleDefinitions, fileOptions),
    ];
  }

  return {
    visitor,
    compose,
  };
}
