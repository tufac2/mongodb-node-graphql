import { IResolvers } from 'graphql-tools';
import PlatformService from '../../services/platform.service';
import ProductService from '../../services/product.service';

// We do this because good Apollo Practises we need to use ProducID and in database we have product-id
const resolversShopProductTypes: IResolvers = {
    ShopProduct: {
        productId: (parent) => {
            console.log("a")
            return parent.product_id;
        },
        platformId: (parent) => {
            console.log("as")
            return parent.platform_id;
        },
        product: async (parent, __, { db }) => {
            console.log("aas")
            const result = await new ProductService(
                {},
                { id: parent.product_id },
                { db }
            ).details();
            return result.product;
        },
        platform: async (parent, __, { db }) => {
            console.log("aasd")
            const result = await new PlatformService(
                {},
                { id: parent.platform_id },
                { db }
            ).details();
            console.log(result);
            return result.platform;
        }
    }
};

export default resolversShopProductTypes;