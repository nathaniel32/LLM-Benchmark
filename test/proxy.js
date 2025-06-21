fetch('http://localhost:3000/proxy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: 'http://141.56.137.185:11434/api/generate',
        method: 'POST',
        headers: {
            'Authorization': null,
            'Content-Type': 'application/json'
        },
        body: {
            model: "llama3.2",
            stream: false,
            prompt: 'Halo!'
        }
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));



fetch('http://localhost:3000/proxy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: 'http://141.56.137.185:11434/api/chat',
        method: 'POST',
        headers: {
            'Authorization': null,
            'Content-Type': 'application/json'
        },
        body: {
            model: "llama3.2",
            stream: false,
            messages: [
                {
                    role: "user",
                    content: "Halo!"
                }
            ]
        }
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));