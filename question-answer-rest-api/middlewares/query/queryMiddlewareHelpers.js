const searchHelper = (searchKey,query,req) => {
    
    //Search
    if(req.query.search){ // /api/question?search="QUERY KISMI"  soru işaretinden sonraki kısım querydir var mı yok ? kontrolü
        //query.search diyerek soru işaretinden sonraki search den sonrası var mı kontrolü
        const searchObject = {};
        //title sorgusu 

        const regex = new RegExp(req.query.search,"i");//büyük küçük harf duyarsızlığı : i
        searchObject[searchKey] = regex;

        return query.where(searchObject);
        // Question.find().where --< findla başladı where eklendi burda
    }
    return query;
};

const populateHelper = (query,population) => {

    return query.populate(population);
}

const questionSortHelper = (query,req) => {

    const sortKey = req.query.sortBy;

    if(sortKey === "most-answered"){
        return query = query.sort("-answerCount");//- ile büyükten küçüğe tersine çevirdik
    }//answerCountları aynıysa en günceli getiricez createdAt ile
    if(sortKey === "most-liked"){
       return  query = query.sort("-likeCount");
    }
    return query.sort("-createdAt");
}

const paginationHelper = async ( totalDocuments ,query,req) => {

    const page = parseInt( req.query.page || 1); // queryden sonraki page=" " burdaki sayıyı alıyoruz verilmemişse otomatik 1 atıyor
    const limit = parseInt( req.query.limit || 5);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = totalDocuments;

    if(startIndex > 0){
        pagination.previous = {
            page: page -1,
            limit : limit
        }
    }
    if(endIndex < total){
        pagination.next = {
            page : page +1,
            limit : limit
        }
    }
    return {
        query: query === undefined ? undefined : query.skip(startIndex).limit(limit),
        pagination : pagination,
        startIndex,
        limit
    };
    // 1 2 3 4 5 6 7 8 9 10 
    //skip(2) 
    //limit(2) atlıcak 3-4
};

module.exports = {
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper
};