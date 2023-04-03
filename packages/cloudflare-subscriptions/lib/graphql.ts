import { getArgumentValues, GraphQLError, GraphQLSchema, parse } from 'graphql';
import { SubscribeMessage, SubscribePayload } from 'graphql-ws';
import { collectFields } from 'graphql/execution/collectFields';
import {
  buildExecutionContext,
  buildResolveInfo,
  ExecutionContext,
  getFieldDef,
} from 'graphql/execution/execute';
import { addPath } from 'graphql/jsutils/Path';

export interface SubscriptionInfo {
  id: string;
  connectionId: string;
  connectionPoolId: string;
  topic: string;
  subscription: SubscribePayload;
}

export function createSubscriptionInfo(
  schema: GraphQLSchema,
  message: SubscribeMessage,
  connectionId: string,
  connectionPoolId: string
) {
  const execContext = buildExecutionContext({
    schema: schema,
    document: parse(message.payload.query),
    variableValues: message.payload.variables,
    operationName: message.payload.operationName,
  });

  if (!isExecutionContext(execContext)) {
    throw new AggregateError(execContext);
  }

  const { field, root, args, context, info } = getResolverAndArgs({ execContext });

  if (!field.subscribe) {
    throw new Error('No field');
  }

  const result = field.subscribe(root, args, context, info);

  const subInfo: SubscriptionInfo = {
    id: message.id,
    connectionId,
    connectionPoolId,
    // @ts-expect-error todo
    topic: result.topic as string,
    subscription: message.payload,
  };

  return subInfo;
}

function getResolverAndArgs({ execContext }: { execContext: ExecutionContext }) {
  const { schema, fragments, operation, variableValues, rootValue } = execContext;
  const rootType = schema.getSubscriptionType();

  if (rootType == null) {
    throw new GraphQLError('Schema is not configured to execute subscription operation.', {
      nodes: operation,
    });
  }

  const rootFields = collectFields(
    schema,
    fragments,
    variableValues,
    rootType,
    operation.selectionSet
  );

  const firstRootField = rootFields.entries().next().value;
  const [responseName, fieldNodes] = firstRootField;
  const fieldDef = getFieldDef(schema, rootType, fieldNodes[0]);

  if (!fieldDef) {
    const fieldName = fieldNodes[0].name.value;

    throw new GraphQLError(`The subscription field "${fieldName}" is not defined.`, {
      nodes: fieldNodes,
    });
  }

  const path = addPath(undefined, responseName, rootType.name);
  const info = buildResolveInfo(execContext, fieldDef, fieldNodes, rootType, path);
  const args = getArgumentValues(fieldDef, fieldNodes[0], variableValues);

  return {
    root: null,
    args,
    info,
    field: fieldDef,
    context: execContext.contextValue,
  };
}

function isExecutionContext(
  execContext: readonly GraphQLError[] | ExecutionContext
): execContext is ExecutionContext {
  return !Array.isArray(execContext);
}
