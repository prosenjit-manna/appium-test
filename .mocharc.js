module.exports = {
    timeout: 200000,
    spec: 'src/**/*.test.ts',
    require: 'ts-node/register',
    reporter: 'spec',
    recursive: true,
    exit: true
};