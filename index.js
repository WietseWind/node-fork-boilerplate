const {fork} = require('child_process')
const options = {
  children: 10
}

const launch = data => {
  const child = fork(__dirname + '/child.js')

  child.on('message', async msg => {
    if (typeof msg === 'object' && msg !== null && typeof msg.type === 'string') {
      switch (msg.type) {
        case 'start':
          if (msg.pid === child.pid) {
            child.send({
              type: 'start',
              data
            })
          }
          break;
        case 'log':
        default:
          console.log('Child message:', msg)
      }
    }
  })

  child.on('exit', (code, signal) => {
    console.log('Child exit:', {code, signal})
  })

  return child
}

const children = Array.apply(null, Array(options.children)).map(a => {
  return launch(null)
})

console.log('Running children #', children.filter(c => c.connected).length)

process.on('SIGINT', async () => {
  console.log(' --- STOPPING (PARENT: SIGINT) --- ')
  setTimeout(() => {
    console.log('Running children #', children.filter(c => c.connected).length)
  }, 500)
})
