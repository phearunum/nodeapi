
const express = require('express');
const router = express.Router();
const userRoute = require('./users/user.route')
const authRoute = require('./auth.route')
const categoryRoute = require('./category.route')
const trancRoute = require('./tranc.route')
const RouteList = [
    {
        path: '/users',
        route:userRoute
    },
    {
        path: '/category',
        route:categoryRoute
    },
    {
        path: '/transaction',
        route:trancRoute
    },
    {
        path: '/auth',
        route:authRoute
    }
]
RouteList.forEach((route) => {
    router.use(route.path ,route.route)
    
})

module.exports = router;