import { findOneElmenet, assignDocumentId } from './../lib/db-operations';
import { COLLECTIONS } from './../config/constants';
import { IContextData } from './../interfaces/contex.interface';
import ResolversOperationsService from "./resolvers-operations.service";
import slugify from 'slugify';

class CategoryService extends ResolversOperationsService {

    protected collection = COLLECTIONS.CATEGORIES;

    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;       
        const result = await this.list(this.collection, 'categories', page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            categories: result.items
        }
    }

    async details() {
        const result = await this.getItem(this.collection);
        return {
            status: result.status,
            message: result.message,
            category: result.item
        }
    }

    async insert() {
        const category = this.getVariables().category || '';
        if (!this.checkValueNotEmpty(category)) {
            return {
                status: false,
                message: 'Category not especified accordingly. Check database documentation',
                category: null
            };
        }
        if (await this.checkDocumentExistInDatabase(category) || '') {
            return {
                status: false,
                message: 'Category already exists',
                category: null
            };
        }
        const categoryObject = {
            id: await assignDocumentId(this.getDb(), this.collection, { id: -1 } ),
            name: category,
            slug: slugify(category, { lower: true })
        }

        const result = await this.addItem(this.collection, categoryObject,
            'Category'
        );
        return {
            status: result.status,
            message: result.message,
            category: result.item
        }
    }

    async modify() {
        const id = this.getVariables().id;
        const category = this.getVariables().category;
        if (!this.checkValueNotEmpty(String(id) || '')){
            return {
                status: false,
                message: 'Category not especified accordingly. Check database documentation',
                category: null
            };
        }
        if (!this.checkValueNotEmpty(category || '')){
            return {
                status: false,
                message: 'Category not especified accordingly. Check database documentation',
                category: null
            };
        }
        const objectUpdate = {
            name: category,
            slug: slugify(category || '', { lower:true } )
        }
        const result = await this.update(this.collection, { id },objectUpdate);
        return {
            status: result.status,
            message: result.message,
            category: result.item
        }
    }

    async delete() {
        const id = this.getVariables().id;
        if (!this.checkValueNotEmpty(String(id) || '')){
            return {
                status: false,
                message: 'Category not especified accordingly. Check database documentation',
                category: null
            };
        }
        const result = await this.remove(this.collection, { id }, 'category');
        return {
            status: result.status,
            message: result.message
        }
    }

    private checkValueNotEmpty(value: string) {
        return (value === '' || value === undefined) ? false : true;
    }

    private async checkDocumentExistInDatabase(value: string) {
        return await findOneElmenet(this.getDb(), this.collection, { name: value });
    }
}

export default CategoryService;