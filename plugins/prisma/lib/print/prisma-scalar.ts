export enum PrismaScalars {
  string = 'String',
  boolean = 'Boolean',
  int = 'Int',
  float = 'Float',
  dateTime = 'DateTime',
  json = 'Json',
  bigInt = 'BigInt',
  decimal = 'Decimal',
  bytes = 'Bytes',
}

export function mapPrismaTypeToScalar(scalar: string) {
  switch (scalar) {
    case PrismaScalars.string: {
      return 'String';
    }
    case PrismaScalars.boolean: {
      return 'Boolean';
    }
    case PrismaScalars.int: {
      return 'Int';
    }
    case PrismaScalars.float: {
      return 'Float';
    }
    case PrismaScalars.dateTime: {
      return 'DateTime';
    }
    case PrismaScalars.json: {
      return 'Json';
    }
    case PrismaScalars.bigInt: {
      return 'BigInt';
    }
    case PrismaScalars.decimal: {
      return 'Decimal';
    }
    case PrismaScalars.bytes: {
      return 'Bytes';
    }
    default: {
      throw new Error(`Unrecognized scalar type: ${scalar}`);
    }
  }
}
