import { ModuleBuilder } from './module';
import { PluginVersion } from './plugin';
import { SchemaTransformer } from './transformer';

export class PluginV1 {
  version = PluginVersion.V1;
  transformers: SchemaTransformer[] = [];

  constructor(readonly module: ModuleBuilder) {}

  build() {}

  resolverMethods(type: string, field: string) {
    return {};
  }

  typeMethods(type: string) {
    return {};
  }

  moduleMethods() {
    return {};
  }
}

export class PluginA extends PluginV1 {
  resolverMethods(type: string, field: string) {
    return {
      $test1: () => {
        console.log('test1');
      },
      $test2: () => {
        console.log('test2');
      },
    };
  }
}

export class PluginB extends PluginV1 {
  resolverMethods(type: string, field: string) {
    return {
      $test3: () => {
        console.log('test3');
      },
      $test4: () => {
        console.log('test4');
      },
    };
  }
}

export class PluginC extends PluginV1 {
  resolverMethods(type: string, field: string) {
    return {
      $test5: () => {
        console.log('test5');
      },
      $test6: () => {
        console.log('test6');
      },
    };
  }
}

export type PluginV1Builder = (module: ModuleBuilder) => PluginV1;
