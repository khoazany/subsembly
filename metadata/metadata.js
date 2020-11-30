const ts = require('typescript');
const fs = require("fs");
const node = ts.createSourceFile(
    'test.ts',
    fs.readFileSync('../assembly/pallets/aura/assembly/aura.ts', 'utf-8'),
    ts.ScriptTarget.Latest
);

const knownTypes = {
    "u8[]": "Vec<u8>",
    "UInt64": "u64",
    "CompactInt": "Compact<u64>",
    "UInt32": "u32",
    "Int64": "i64",
    "Int32": "i32"
};

let moduleMetadata = {
    calls: [],
    storage: {
        prefix: "",
        items: []
    }
};

// kind 163 -> property declaration
// kind 165 -> method declaration
// kind 113 -> void
// get names of the functions and 
node.statements[3]["members"].map(object => {
    moduleMetadata = {
        ...moduleMetadata,
        calls: moduleMetadata.calls.concat(renderNode(object))
    }
});

function renderNode(obj) {
    console.log(obj.jsDoc);
    switch(obj.kind){
        // render property node objects
        case 163:
            return {
                name: obj.name.escapedText,
                comment: extractComment(obj.jsDoc[0]),
            };
        case 165:
            return {
                name: obj.name.escapedText,
                comment: extractComment(obj.jsDoc[0]),
                type: extractType(obj.type),
                params: extractParams(obj.parameters)
            }
    }
}

function extractType(type){
    switch(type.kind){
        case 178:
            return knownTypes["u8[]"]
        case 113:
            return "void"
        default:
            return type.typeName.escapedText
    }
}

function extractParams(params){
    let args = [];
    if(params){
        params.forEach((param) => {
            args.push({
                name: param.name.escapedText,
                type: extractType(param.type)
            })
        })
    }
    return args;
}

function extractComment(jsDoc){
    if(jsDoc.comment && !jsDoc.tags){
        return jsDoc.comment;
    }
    return jsDoc.tags[0].comment;
}

console.log(moduleMetadata.calls[6].params);

// node.statements[3]["members"].map(object => {
//     console.log(object)
// }); 