const Gitrows = require('gitrows');

const cli_args = require('minimist')(process.argv.slice(2));

console.log(cli_args);

let path = '@github/stock-timeline/api/UseCases/ManageChannels.yaml';
// let path = '@github/gitrows/data/iris.json';

const gitrows = new Gitrows({
    token       : process.env.GH_TOKEN,
    username    : process.env.GH_USERNAME,
});


console.log(gitrows.options());

try{
    gitrows.put(
        path, 
        {
            id          : cli_args.id,
            name        : cli_args.name,
            base_url    : cli_args.base_url
        }
    
    ).catch(
        (err) => {
            console.log('Method error:');
            console.log(err);
        }
    ).then(
        (res) => {
            console.log('Method success:');
            console.log(res);
        }
    );

}catch(err){
    console.log('Class error' + err);
}
