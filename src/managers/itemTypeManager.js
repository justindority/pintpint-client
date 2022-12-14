export const getItemTypes = () => {
    return fetch("http://localhost:8000/itemTypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const getItem = (id) => {
    return fetch(`http://localhost:8000/items/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const createItemType = (type) => {
    return fetch(`http://localhost:8000/itemTypes`, {
        method: 'POST',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    })
        .then(response => response.json())
}