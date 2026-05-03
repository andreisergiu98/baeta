import type { EntityHandlerMap } from "../../__generated__/federation.ts";
import { handleUserEntity } from "../user/user.entity.ts";

const entityHandlersMap: EntityHandlerMap = {
    User: handleUserEntity,
};

export default entityHandlersMap;