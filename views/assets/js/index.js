const toastLiveExample = document.getElementById('liveToast')

async function makeRequest(url, method, body) {
    const request = await fetch(url, {
        method, body,
        headers: {
            'Content-type': 'application/json'
        }
    })

    return await request.json()
}