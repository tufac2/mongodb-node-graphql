import GMR from 'graphql-merge-resolvers';
import resolversCategoryQuery from './category';
import resolversProductQuery from './product';
import resolversShopProductQuery from './shopProduct';
import resolversUserQuery from './user';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductQuery,
    resolversCategoryQuery,
    resolversShopProductQuery
]);

export default queryResolvers;