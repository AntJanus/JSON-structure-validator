JSON-structure-validator
========================

JSON Structure Validator for testing and other purposes

Why?
========================
During API testing and validation, it is often important to ensure that a specific map of keys is present in each API call, for instance, when calling an endpoint that should return a `username`, it's important to test that the username will be there.

Many testing frameworks allow assertion of "equals" where the resulting feed is matched EXACTLY against another feed; however, the data that comes back may change as an application evolves, the data keys may not.

The json structure validator works on a "minimum" principle, meaning that we're validating the minimum required keys.

Switching the order of compared JSON vs. compare map will result in exact key matching.

API
========================
The API is very simple:

`compareJSON(parent, compared)` where `parent` is the JSON map that the `compared` (resulting feed) should match.

Usage
========================
The structure validator works with any framework and can be used outside of testing; however, I built it to work with [Hippie](https://github.com/vesln/hippie) which is wonderful at API testing.

    var hippie = require('hippie');
    var compareJSON = require('JSON-structure-validator');

    var emptyMap = {
        "name" : "",
        "username": "",
        "id": "",
        "image_url": ""
    };

    var api = function() {
        return hippie().json().base('http://localhost:3000/api/user');
    };

    describe('User API', function() {
        it('should return all user information', function(done){
            api()
                .get('/13')
                .expect(function(res, body, next){
                    var comparison = compareJSON(emptyMap, body);
                    if(comparison == true) {
                        next();
                    } else {
                        throw new Error(comparison);
                    }
                })
                .end();
        });
    });

Again, no need to use Hippie. But in this case, the `body` of the `/api/user/13` request is required to have AT LEAST the keys present in `emptyMap`. If the comparison fails, the full path of the failure will be returned. For instance, if `body` was missing `image_url`, the error would read `Objects do not match at image_url`.

What about deep objects? I use the [Treeize](https://www.npmjs.org/package/treeize) package in order to create deep object graphs. JSON-structure-validator works with that tool as well.

Let's take our last example and extend the `emptyMap` to this:

    var emptyMapSingle = {
            "name" : "",
            "username": "",
            "id": "",
            "image_url": "",
            "aliases": [ {
                "alias": "",
                "id": ""
            }]
        };

    var emptyMap = [];
    emptyMap.push(emptyMapSingle);

Our map would then match against the feed like so.

**!important** Due to the "minimal match" feature of JSON-structure-validator, the object would be required to have AT LEAST ONE Alias. If there were multiple aliases, only the first one gets key match.

What if you want an EXACT match as well as a minimal match?

    var comparison = compareJSON(body, emptyMap);
    var comparison2 = compareJSON(emptyMap, body);

In this case, the `emptyMap` will be required to have all of the keys present in `body`, meaning that any keys that are EXTRA in the body and are not present in our emptyMap will throw an error. Doing a backward match in `comparison2` will also ensure that any stray keys that are available in our emptyMap but are NOT in body (thus would not be matched against in the first comparison) would throw an error. That way we're covered both ways!
