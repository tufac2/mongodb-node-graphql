import { findOneElmenet, assignDocumentId } from './../lib/db-operations';
import { COLLECTIONS } from './../config/constants';
import { IContextData } from './../interfaces/contex.interface';
import ResolversOperationsService from "./resolvers-operations.service";
import slugify from 'slugify';

class ProductService extends ResolversOperationsService {

    protected collection = COLLECTIONS.PRODUCT;

    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async details() {
        const result = await this.getItem(this.collection);
        return {
            status: result.status,
            message: result.message,
            product: result.item
        }
    }

}

export default ProductService;