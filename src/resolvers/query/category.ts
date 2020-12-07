import { COLLECTIONS } from './../../config/constants';
import { IResolvers } from "graphql-tools";
import { countElements } from "../../lib/db-operations";
import CategoryService from '../../services/category.service';
import { pagination } from '../../lib/pagination';


const resolversCategoryQuery: IResolvers = {
    Query:{
        async categories(_, variables, { db }) {
            return new CategoryService(_, { pagination: variables }, { db }).items()
        },
        async category(_, { id }, { db }) {
            return new CategoryService(_, { id }, { db }).details()
        },
    }
};

export default resolversCategoryQuery;