module.exports = {
    timeout: 200000,  // define a 20 seconds timeout for all tests
    spec: ['src/**/*.test.ts'],  // updated to look for TypeScript spec files
    reporter: 'spec',
    recursive: true,
    require: ['ts-node/register'],  // require ts-node/register to compile TypeScript files
    extension: ['ts'],  // file extensions to look for
    parallel: true,  // enable parallel execution
    jobs: 2  // number of parallel jobs
};