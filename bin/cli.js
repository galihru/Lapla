const { LaplaceOperator } = require('lapla');
const argv = require('yargs')
  .usage('Usage: $0 <expression> [options]')
  .demandCommand(1, 'Expression is required')
  .option('d', {
    alias: 'deriv',
    describe: 'Compute nth derivative',
    type: 'number'
  })
  .option('l', {
    alias: 'laplace',
    describe: 'Compute Laplace transform',
    type: 'boolean'
  })
  .help()
  .argv;

const expr = argv._[0];
const op   = new LaplaceOperator(expr);

if (argv.deriv) {
  op.derivative(argv.deriv, true);
}
if (argv.laplace) {
  op.laplace(null, true);
}
