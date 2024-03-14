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
            .then(data => data)
    }
}

const apiClient = new ApiClient()

export default apiClient
