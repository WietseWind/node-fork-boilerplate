const log = function () {
  process.send({
    type: 'log',
    pid: process.pid,
    data: arguments
      ? (arguments.length === 1 ? arguments[0] : arguments)
      : undefined
  })
}

process.send({
  type: 'start',
  pid: process.pid,
  data: null
})

process.on('message', async msg => {
  if (typeof msg === 'object' && msg !== null && typeof msg.type === 'string') {
    switch (msg.type) {
      case 'start':
        main(msg.data)
        break;
      default:
        console.log('Child received message: ', msg)
    }
  }
})

/**
 * Code
 */

const main = async data => {
  // setInterval(() => {
  //   log({ child: 'alive' })
  // }, 500)
  // setTimeout(() => {
  //   log({ child: 'exit' })
  //   process.exit(0)
  // }, 5000)
}
