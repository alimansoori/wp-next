import allSettingReducer from "./allSetting.reducers";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from './category.reducers';
import productReducer from './product.reducers';
import searchReducer from './search.reducers';
import localReducer from './local.reducers';
import cartReducer from './cart.reducers';
import orderReducer from './order.reducers';
import viewerReducer from './viewer.reducers';
import customerReducer from './customer.reducers';
import checkoutReducer from './checkout.reducers';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    allSetting: allSettingReducer,
    auth: authReducer,
    user: userReducer,
    viewer: viewerReducer,
    customer: customerReducer,
    checkout: checkoutReducer,
    category: categoryReducer,
    product: productReducer,
    search: searchReducer,
    local: localReducer,
    cart: cartReducer,
    order: orderReducer,
});

export default rootReducer;