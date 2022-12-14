export const getMe = () => {
    return fetch(`http://localhost:8000/employees?me`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}