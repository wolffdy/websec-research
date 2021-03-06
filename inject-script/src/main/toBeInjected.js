import request from "superagent";

const targetHostAndPort = "0.0.0.0:9000";

Object.defineProperty(document, "cookie", {
    get: function() {
        postAccess("cookie", this._cookie, "get");
        return this._cookie;
    },
    set: function(val) {
        postAccess("cookie", val , "get");
        this._cookie = val;
        return this._cookie;
    },
});

function postAccess(domElement, value, accessMethod){
// Obviously not great to hardcode the ip and port here, but dockerizing a browser that loads an extension is nontrivial
    const timestamp = new Date().getTime() / 1000;
    request.post("http://" + targetHostAndPort)
        .set("SOURCE_OF_REQ", "EXTENSION")
        .send({ domElement: domElement, value: value, accessMethod: accessMethod, timestamp: timestamp})
        .catch( (reason) => console.log(reason) );
}
