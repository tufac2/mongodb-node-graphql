import { findOneElmenet, insertOneElement } from './../../lib/db-operations';
import { COLLECTIONS, MESSAGES } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { assignDocumentId } from '../../lib/db-operations';
import CategoryService from '../../services/category.service';

const resolversCategoryMutation: IResolvers = {
    Mutation:{
        addCategory(_, variables, context){
        return new CategoryService(_, variables, context).insert();
        },
        updateCategory(_, variables, context){
            return new CategoryService(_, variables, context).modify();
        },
        deleteCategory(_, variables, context){
            return new CategoryService(_, variables, context).delete();
        }
    }
}

export default resolversCategoryMutation;