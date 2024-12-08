/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types.ts";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions/index.ts";


interface DefinedEnumValues {
  StringFormat: 'EMAIL' | 'UUID' | 'URL';
};

export type StringFormat = DefinedEnumValues['StringFormat'];

export namespace ModuleMetadata {
  export const id = 'baeta-directives';
  export const dirname = './baeta-directives';
  export const hashes = {};
  export const typedef = {"kind":"Document","definitions":[{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"validFloat","loc":{"start":140,"end":150}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"multipleOf","loc":{"start":156,"end":166}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":168,"end":173}},"loc":{"start":168,"end":173}},"directives":[],"loc":{"start":156,"end":173}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"max","loc":{"start":178,"end":181}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":183,"end":188}},"loc":{"start":183,"end":188}},"directives":[],"loc":{"start":178,"end":188}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"min","loc":{"start":193,"end":196}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":198,"end":203}},"loc":{"start":198,"end":203}},"directives":[],"loc":{"start":193,"end":203}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exclusiveMax","loc":{"start":208,"end":220}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":222,"end":227}},"loc":{"start":222,"end":227}},"directives":[],"loc":{"start":208,"end":227}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exclusiveMin","loc":{"start":232,"end":244}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":246,"end":251}},"loc":{"start":246,"end":251}},"directives":[],"loc":{"start":232,"end":251}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"oneOf","loc":{"start":256,"end":261}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":264,"end":269}},"loc":{"start":264,"end":269}},"loc":{"start":264,"end":270}},"loc":{"start":263,"end":271}},"directives":[],"loc":{"start":256,"end":271}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"notOneOf","loc":{"start":276,"end":284}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":287,"end":292}},"loc":{"start":287,"end":292}},"loc":{"start":287,"end":293}},"loc":{"start":286,"end":294}},"directives":[],"loc":{"start":276,"end":294}}],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":300,"end":322}},{"kind":"Name","value":"ARGUMENT_DEFINITION","loc":{"start":325,"end":344}}],"loc":{"start":129,"end":344}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"validInt","loc":{"start":357,"end":365}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"multipleOf","loc":{"start":371,"end":381}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":383,"end":386}},"loc":{"start":383,"end":386}},"directives":[],"loc":{"start":371,"end":386}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"max","loc":{"start":391,"end":394}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":396,"end":399}},"loc":{"start":396,"end":399}},"directives":[],"loc":{"start":391,"end":399}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"min","loc":{"start":404,"end":407}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":409,"end":412}},"loc":{"start":409,"end":412}},"directives":[],"loc":{"start":404,"end":412}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exclusiveMax","loc":{"start":417,"end":429}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":431,"end":434}},"loc":{"start":431,"end":434}},"directives":[],"loc":{"start":417,"end":434}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exclusiveMin","loc":{"start":439,"end":451}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":453,"end":456}},"loc":{"start":453,"end":456}},"directives":[],"loc":{"start":439,"end":456}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"oneOf","loc":{"start":461,"end":466}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":469,"end":472}},"loc":{"start":469,"end":472}},"loc":{"start":469,"end":473}},"loc":{"start":468,"end":474}},"directives":[],"loc":{"start":461,"end":474}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"notOneOf","loc":{"start":479,"end":487}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":490,"end":493}},"loc":{"start":490,"end":493}},"loc":{"start":490,"end":494}},"loc":{"start":489,"end":495}},"directives":[],"loc":{"start":479,"end":495}}],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":501,"end":523}},{"kind":"Name","value":"ARGUMENT_DEFINITION","loc":{"start":526,"end":545}}],"loc":{"start":346,"end":545}},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"StringFormat","loc":{"start":552,"end":564}},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"EMAIL","loc":{"start":571,"end":576}},"directives":[],"loc":{"start":571,"end":576}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"UUID","loc":{"start":581,"end":585}},"directives":[],"loc":{"start":581,"end":585}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"URL","loc":{"start":590,"end":593}},"directives":[],"loc":{"start":590,"end":593}}],"loc":{"start":547,"end":595}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"validString","loc":{"start":608,"end":619}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"format","loc":{"start":625,"end":631}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StringFormat","loc":{"start":633,"end":645}},"loc":{"start":633,"end":645}},"directives":[],"loc":{"start":625,"end":645}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"maxLength","loc":{"start":650,"end":659}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":661,"end":664}},"loc":{"start":661,"end":664}},"directives":[],"loc":{"start":650,"end":664}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"minLength","loc":{"start":669,"end":678}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":680,"end":683}},"loc":{"start":680,"end":683}},"directives":[],"loc":{"start":669,"end":683}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"startsWith","loc":{"start":688,"end":698}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":700,"end":706}},"loc":{"start":700,"end":706}},"directives":[],"loc":{"start":688,"end":706}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"endsWith","loc":{"start":711,"end":719}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":721,"end":727}},"loc":{"start":721,"end":727}},"directives":[],"loc":{"start":711,"end":727}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"includes","loc":{"start":732,"end":740}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":742,"end":748}},"loc":{"start":742,"end":748}},"directives":[],"loc":{"start":732,"end":748}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"regex","loc":{"start":753,"end":758}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":760,"end":766}},"loc":{"start":760,"end":766}},"directives":[],"loc":{"start":753,"end":766}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"regexFlags","loc":{"start":771,"end":781}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":783,"end":789}},"loc":{"start":783,"end":789}},"directives":[],"loc":{"start":771,"end":789}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"oneOf","loc":{"start":794,"end":799}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":802,"end":808}},"loc":{"start":802,"end":808}},"loc":{"start":802,"end":809}},"loc":{"start":801,"end":810}},"directives":[],"loc":{"start":794,"end":810}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"notOneOf","loc":{"start":815,"end":823}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":826,"end":832}},"loc":{"start":826,"end":832}},"loc":{"start":826,"end":833}},"loc":{"start":825,"end":834}},"directives":[],"loc":{"start":815,"end":834}}],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":840,"end":862}},{"kind":"Name","value":"ARGUMENT_DEFINITION","loc":{"start":865,"end":884}}],"loc":{"start":597,"end":884}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"constraints","loc":{"start":897,"end":908}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"minFields","loc":{"start":914,"end":923}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":925,"end":928}},"loc":{"start":925,"end":928}},"directives":[],"loc":{"start":914,"end":928}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"maxFields","loc":{"start":933,"end":942}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":944,"end":947}},"loc":{"start":944,"end":947}},"directives":[],"loc":{"start":933,"end":947}}],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_OBJECT","loc":{"start":953,"end":965}}],"loc":{"start":886,"end":965}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"trim","loc":{"start":978,"end":982}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"start","loc":{"start":983,"end":988}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":990,"end":997}},"loc":{"start":990,"end":997}},"directives":[],"loc":{"start":983,"end":997}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"end","loc":{"start":999,"end":1002}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1004,"end":1011}},"loc":{"start":1004,"end":1011}},"directives":[],"loc":{"start":999,"end":1011}}],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":1016,"end":1038}},{"kind":"Name","value":"ARGUMENT_DEFINITION","loc":{"start":1041,"end":1060}}],"loc":{"start":967,"end":1060}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"lower","loc":{"start":1072,"end":1077}},"arguments":[],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":1081,"end":1103}},{"kind":"Name","value":"ARGUMENT_DEFINITION","loc":{"start":1106,"end":1125}}],"loc":{"start":1061,"end":1125}},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"upper","loc":{"start":1137,"end":1142}},"arguments":[],"repeatable":false,"locations":[{"kind":"Name","value":"INPUT_FIELD_DEFINITION","loc":{"start":1146,"end":1168}},{"kind":"Name","value":"ARGUMENT_DEFINITION","loc":{"start":1171,"end":1190}}],"loc":{"start":1126,"end":1190}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
    };
  }
}

export const createBaetaDirectivesModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getBaetaDirectivesModule = Baeta.createSingletonModule(createBaetaDirectivesModule);
