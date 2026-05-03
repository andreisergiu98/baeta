import type { EntityHandlerMap } from "../../__generated__/federation.ts";
import { handleProductEntity } from "../product/product.entity.ts";

const entityHandlersMap: EntityHandlerMap = {
    Product: handleProductEntity,
};

export default entityHandlersMap;