
const {query} = require("../utils/connectSql")
const httpAjax = require("../utils/httpRequest")

console.log("query",query)

class Model {
    constructor(query,httpAjax){
        this.query = query;
        this.httpAjax = httpAjax;
        console.log(' this.query', this.query)
    }
}

module.exports = Model;