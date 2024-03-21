class ApiClient {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY
    }

    async get(url) {
        return fetch(`${this.baseUrl}${url}`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.apiKey}`
            },
        })
            .then(response => response.json())
    }

    async post(url, body) {
        return fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
    }

    async delete(url) {
        return fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.apiKey}`
            },
        })
            .then(response => response.json())
    }
}

const apiClient = new ApiClient()

export default apiClient
