const Gitrows = require('gitrows');

const cli_args = require('minimist')(process.argv.slice(2));

console.log(cli_args);


const gitrows = new Gitrows();

console.log(gitrows.options());

// let path = '@github/gitrows/data/iris.json';
let path = '.';

console.log(gitrows.get(path).then(
    data => {
        console.log(data);
    }
));


// new Gitrows({}).update(
//     './ManageChannels.yaml', 
//     {
//         id          : cli_args.id,
//         name        : cli_args.name,
//         base_url    : cli_args.base_url
//     },
//     'id'

// ).catch(
//     (err) => {
//         console.log(err);
//     }
// ).then(
//     (res) => {
//         console.log(res);
//     }
// );