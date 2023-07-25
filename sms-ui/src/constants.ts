export const env = import.meta.env;

const prod = {
    API_URL: env.VITE_APP_API_URL,
}

const dev = {
    API_URL: "http://localhost:8080",
}

export const config = env.MODE === 'development' ? dev : prod;