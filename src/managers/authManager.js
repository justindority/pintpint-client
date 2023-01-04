export const getMe = () => {
    let token = ""
    if(localStorage.getItem("pintpoint_token")){
        return fetch(`http://localhost:8000/getMe`,{
            headers: {
                "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
            }
        })
        .then(response => response.json())
    } else {
        return fetch(`http://localhost:8000/getMe`)
        .then(response => response.json())
    }

}