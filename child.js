/**
 * The log() method sends data to the parent
 */
const log = function () {
  process.send({
    type: 'log',
    pid: process.pid,
    data: arguments
      ? (arguments.length === 1 ? arguments[0] : arguments)
      : undefined
  })
}

/**
 * Notify the parent we started
 */
process.send({
  type: 'start',
  pid: process.pid,
  data: null
})

/**
 * Handle a message from the parent. Default: console.log()
 */
process.on('message', async msg => {
  if (typeof msg === 'object' && msg !== null && typeof msg.type === 'string') {
    switch (msg.type) {
      case 'start':
        main(msg.data)
        break;
      default:
        console.log('Child received message:', msg)
    }
  }
})

/**
 * Code, modify to do whatever you like it to do.
 * Send data (object) to the parent with the log() method.
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
