// minimist for CLI arg processing
const cli_args = require('minimist')(process.argv.slice(2));

// GitRows configured for GitHub
const Gitrows = require('gitrows');

// File-Handling
const fs    = require("fs");
const yaml  = require("js-yaml");


// OpenAPI Schema Parsing
// TODO: REMOVE? - const OpenAPISchema = require('./openapi-schema');
const openapiSchemaValidator = require('openapi-schema-validator');
const Ajv = require("ajv");

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

let gitrows_persistance_file = '@github/dukeofgaming/stock-timeline/channels.json';
// let gitrows_persistance_file = '@github/dukeofgaming/stock-timeline/api/UseCases/ManageChannels/ManageChannels.yaml';
let schema_file = './Channel.yaml';

const gitrows = new Gitrows({
    token   : process.env.GH_TOKEN,
    user    : process.env.GH_USER,
    path    : gitrows_persistance_file
});


console.log(gitrows.options());

try{
    
    
    let channels;
    
    gitrows.get(gitrows_persistance_file).then(
        (gitrows_data) => {
            console.log('Method success:');
            console.log(gitrows_data);
            
            
            const openapi_schema = yaml.load(
                fs.readFileSync(
                    schema_file, 
                    "utf8"
                )
            );
                
            console.log(openapi_schema);
            
            // JSON Schema Validation
            const ajv       = new Ajv({strict:false});
            
            const validate  = ajv.compile(openapi_schema);
            const valid     = validate(gitrows_data);
            
            if (!valid) {
                //   throw new Error(ajv.errorsText(validate.errors));
                console.log(ajv.errorsText(validate.errors));
            }
            
            console.log(valid);
            console.log(typeof valid);
            
            // openapiSchemaValidator.validate(schema, channels, (error) => {
                //     if (error) {
            //         console.error(error);
            //     } else {
            //         console.log('Data is valid against the OpenAPI schema.');
            //     }
            // });



        }
    ).catch(
        (err) => {
            console.log('Method error:');
            console.log(err);
        }
    );

    console.log(channels)

    // const OpenAPISchema = require('./openapi-schema');

    // const schema = new OpenAPISchema({
    //     schema  : './ManageChannels.yaml',
    //     data    : channels
    // }).validate();


    


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
