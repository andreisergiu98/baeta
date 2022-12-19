import { ModuleBuilder } from './module';
import { SchemaTransformer } from './transformer';

export class ModulePlugin {
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

export class PluginA extends ModulePlugin {
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

export class PluginB extends ModulePlugin {
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

export class PluginC extends ModulePlugin {
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
