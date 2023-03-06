const net = require('net')

const httpServer = net.createServer(
    (connection) => {
        connection.on('data', () => {
            let content = 
            `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />
                </head>
                <body>
                    WebSocket Test
                    <script>
                        let ws = new WebSocket('ws://localhost:3001')
                        ws.onmessage = event => alert('Message from server: ' + event.data)
                        ws.onopen = () => ws.send('hello')
                    </script>
                </body>
            </html>
            `
            connection.write('HTTP/1.1 200 OK\r\nContent-Length: ' + content.length + '\r\n\r\n' + content)
        })
    }
)

httpServer.listen(3000, () => {
    console.log('HTTP server listening on port 3000')
})

const wsServer = net.createServer(
    (connection) => {
        console.log('\nClient connected')
        connection.on('data', (data) => {
            console.log('Data received from client: ', data.toString())
        })
        connection.on('end', () => {
            console.log('Client disconnected')
        })
    }
)
wsServer.on('error', (error) => {
    console.log('Error: ', error)
})

wsServer.listen(3001, () => {
    console.log('WebSocket server listening on port 3001')
})