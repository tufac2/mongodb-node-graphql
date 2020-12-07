import { findOneElmenet, assignDocumentId, insertOneElement, randomItems } from './../lib/db-operations';
import { COLLECTIONS, MESSAGES } from './../config/constants';
import { IContextData } from './../interfaces/contex.interface';
import ResolversOperationsService from './resolvers-operations.service';
import slugify from 'slugify';
import bcrypt from 'bcrypt';
import JWT from '../lib/jwt';
import { filter } from 'compression';


class ShopProductService extends ResolversOperationsService {

    protected collection = COLLECTIONS.SHOP_PRODUCT;

    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async items(platform: Array<string> = ['-1'], random: Boolean = false, otherFilters: object = {}) {
        let filter = {};
        if(platform[0] !== '-1'){
            filter = {...filter, ...{platform_id: { $in: platform }} };
        }
        if (otherFilters !== {} && otherFilters !== undefined) {
            filter = {...filter, ...otherFilters};
            random = false;
        }
        
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;
        if(!random){
            const result = await this.list(this.collection, 'Shop Products', page, itemsPage, filter);
            return {
                info: result.info,
                status: result.status,
                message: result.message,
                shopProducts: result.items
            };
        }
        
        const result: Array<object> = await randomItems(
            this.getDb(),
            this.collection,
            filter,
            itemsPage
        );
        
        if(result.length === 0) {
            return {
                info: { page: 1, pages: 1, itemsPage, total: 0},
                status: false,
                message: 'Problems getting info in database',
                shopProducts: []
            };       
        }
        return {
            info: { page: 1, pages: 1, itemsPage, total: itemsPage},
            status: true,
            message: 'Ok getting data',
            shopProducts: result
        };
    }

    async modify () {
        const action = 'update';
        const user = this.getVariables().user;
        if (user == null) {
            return {
                status: false,
                message: 'Wrong requests - User not defined',
                user: null
            };
        }

        const userExists = await findOneElmenet(this.getDb(), this.collection, {email: user.email});
        if (userExists === null) {
            return {
                status: false,
                message: `${this.collection} - ${action} - ${MESSAGES.GENERAL.UPDATE_ITEM_NOT_EXISTS}`,
                user: null
            };
        }
        const filter = { id: user.id};
        const result = await this.update(this.collection, filter, user);
        return {
            status: result.status,
            message: result.message,
            user: result.item
        }
    }
}

export default ShopProductService;