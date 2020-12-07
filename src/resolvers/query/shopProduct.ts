import { IResolvers } from 'graphql-tools';
import ShopProductService from '../../services/shop-product.service';


const resolversShopProductQuery: IResolvers = {
    Query:{
        shopProducts(_, variables, { db }) {
            return new ShopProductService(_, { pagination: variables }, { db }).items()
        },
        shopProductsPlatforms(_, {page, itemsPage, platform, random }, { db }) {
            return new ShopProductService(
                _,
                {
                    pagination: { page, itemsPage }
                }, { db }).items(platform, random);
        },
        shopProductsOffersLast(_, { page, itemsPage, random, topPrice, lastUnits }, {db}) {
            let otherFilters = {};
            if (lastUnits > 0 && topPrice > 10) {
                otherFilters = {
                    $and: [
                        {price: {$lte: topPrice}},
                        {stock: {$lte: topPrice}}
                    ]
                };
            } else if (lastUnits <= 0 && topPrice > 10) {
                otherFilters = { price: {$lte: topPrice}};
            } else if (lastUnits > 0 && topPrice <= 10) {
                otherFilters = { stock: { $lte: lastUnits } };
            }
            return new ShopProductService(
                _,
                {
                    pagination: { page, itemsPage }
                }, { db }).items(['-1'], random, otherFilters);
        }
    }
};

export default resolversShopProductQuery;