const asyncErrorWrapper = require("express-async-handler");
const {searchHelper,paginationHelper} = require("./queryMiddlewareHelpers");


const userQueryMiddleware = function(model,option){

    return asyncErrorWrapper(async function(req,res,next){
       
        let query = model.find();

        //Search by name
        query = searchHelper("name",query,req);

        const total = await model.countDocuments();
        const paginationResult = await paginationHelper(total,query,req);

        query = paginationResult.query;
        pagination = paginationResult.pagination;

        const queryResult = await query.find();
        res.queryResults = {
            success: true,
            count: queryResult.length,
            pagination:pagination,
            data:queryResult
        };

        next();

    });
}


module.exports = userQueryMiddleware;