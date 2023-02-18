const Ajv       = require('ajv');
const fs        = require('fs');
const yaml      = require('js-yaml');
const minimist  = require('minimist');



class OpenAPISchema {

    constructor(options = {}) {
        this.options = {
            ...this.getDefaultOptions(),
            ...options
        };
    }
    
    getDefaultOptions() {
        return {
            schema    : null,
            encoding  : 'utf8',
            data      : null
        };
    }

    with(options) {
        this.options = { 
            ...this.options, 
            ...options 
        };

        return this.validateOptions().then(
            () => this
        );
    }

    validateOptions(options = ['schema', 'data']) {
        const options_validations = {
            schema: [
                {
                    test    : (option) => this.options[option] !== null,
                    message : (option) => `The option ${option} must be provided.`,
                },
            ],
            data: [
                {
                    test    : (option) => this.options[option] !== null,
                    message : (option) =>`The option ${option} must be provided.`,
                },
            ],
        };

        options.forEach((option) => {
            options_validations[option].forEach((testCase) => {
                if (!testCase.test(option)) {
                    throw new Error(testCase.message(option));
                }
            });
        });
    }
    

    async parse( {schema} = this.options) {
        let schema_string;

        try {

            schema_string = await fs.promises.readFile('./ManageChannels.yaml', this.options.encoding);
        
        } catch (error) {

            if (error.code === 'ENOENT') {
                schema_string = schema;
            } else {
                throw error;
            }

        }

        try {
            return JSON.parse(schema_string);
        } catch (error) {
            return yaml.load(schema_string);
        }

        
        // this.schema = typeof this.schema === 'string'
        //     ? await fs.promises.readFile(this.schema, this.encoding)
        //     : this.schema;
        

        // this.validateOptions(['schema']);

        // return this.schema.startsWith('{')
        //     ? JSON.parse(this.schema)
        //     : yaml.load(this.schema);
    }

    async validate( {data, schema} = this.options) {
        
        this.validateOptions(['data', 'schema']);

        const ajv = new Ajv();

        if (typeof schema === 'string') {
            
            try {
                const openapi = yaml.load(fs.readFileSync(schema, this.options.encoding));
                const schemas = openapi.components.schemas;

                console.log(schemas);
                console.log(typeof schemas);


                Object.entries(schemas).forEach(([name, definition]) => {
                    console.log(name)
                    console.log(definition)
                    
                    ajv.addSchema(definition, name);
                });

            } catch (error) {
                throw new Error(`Error reading schema file: ${error}`);
            }

        } else {
            ajv.addSchema(schema);
        }

        const validate = ajv.compile(schema);
        const valid = validate(this.options.data);
        
        if (!valid) {
            throw new Error(ajv.errorsText(validate.errors));
        }

        // return new Ajv().compile(
        //     await this.parse(
        //         schema
        //     )
        // ).validate(data);
    }
}


// Command
if (require.main === module) {
  const schema = new OpenAPISchema();

  const long_options    = Object.keys(schema.getDefaultOptions());
  const alias_options   = long_options.reduce(
    (aliases, option_name) => (
         aliases[option_name[0]] = option_name, 
         aliases
    ),
    {}
  );
  
  const args = minimist(process.argv.slice(2), {
    string: long_options,
    alias: alias_options
  });

  schema.with(args)
    .then(
        async () => {
            const result = await schema.validate();
            console.log(result ? 'Data is valid' : 'Data is invalid');
        }
    ).catch(error => {
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = OpenAPISchema;
