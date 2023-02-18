const Gitrows = require('gitrows');
const OpenAPISchema = require('./openapi-schema');
const cli_args = require('minimist')(process.argv.slice(2));


// async function parseSchemas(openapi_file) {
//     const parser = new OpenAPIParser();
//     const api = await parser.parse(openapi_file);
  
//     const schemas = api.components.schemas;
//     const schemaMap = {};
  
//     async function parseSchema(schema, schemaName) {
//       if (schema.$ref) {
//         const ref = parser.resolveRef(schema.$ref);
//         return parseSchema(ref, schemaName);
//       }
  
//       const properties = schema.properties;
  
//       const columns = [];
//       for (const propertyName in properties) {
//         const property = properties[propertyName];
//         const column = { name: propertyName, type: property.type };
//         columns.push(column);
//       }
  
//       schemaMap[schemaName] = columns;
//     }
  
//     for (const schemaName in schemas) {
//         const schema = schemas[schemaName];
//         await parseSchema(schema, schemaName);
//     }
  
//     return schemaMap;
// }

console.log(cli_args);

// let schema_file = '@github/dukeofgaming/stock-timeline/api/UseCases/ManageChannels/ManageChannels.yaml';
let schema_file = './ManageChannels.yaml';
let table_file = '@github/dukeofgaming/stock-timeline/channels.json';

const gitrows = new Gitrows({
    token   : process.env.GH_TOKEN,
    user    : process.env.GH_USER,
    path    : table_file
});


console.log(gitrows.options());

try{
    

    let channels;

    gitrows.get(table_file).then(
        (res) => {
            console.log('Method success:');
            console.log(res);
            res = channels
        }
    ).catch(
        (err) => {
            console.log('Method error:');
            console.log(err);
        }
    );

    console.log(channels)

    const OpenAPISchema = require('./openapi-schema');

    const schema = new OpenAPISchema({
        schema  : './ManageChannels.yaml',
        data    : channels
    }).validate();

    // gitrows.put(
    //     path, 
    //     {
    //         id          : cli_args.id,
    //         name        : cli_args.name,
    //         base_url    : cli_args.base_url
    //     }
    
    // ).catch(
    //     (err) => {
    //         console.log('Method error:');
    //         console.log(err);
    //     }
    // ).then(
    //     (res) => {
    //         console.log('Method success:');
    //         console.log(res);
    //     }
    // );

}catch(err){
    console.log('Class error' + err);
}
