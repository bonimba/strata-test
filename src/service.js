
export const service = (url) => {
    return window.fetch(`https://api.tfl.gov.uk/${url}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
};