const login = {
    TO_LOGIN: '/api/sellerlogin/Login',
};

const order={
    // 查询订单
    SEARCH_ORDER: '/api/sellerOrder/getVenueOrderDetails',
}

const vip={
    // 查询VIP
    SEARCH_VIPUSERINFOS: '/api/sellerVipUser/getVipUserInfos',

}
export {
    login,
    order,  //订单管理
    vip,  //会员卡管理
}