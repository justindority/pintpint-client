export const getItems = () => {
    return fetch("http://localhost:8000/items", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const getItem = (id) => {
    return fetch(`http://localhost:8000/items/${parseInt(id)}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const getItemsByType = (typeId) => {
    return fetch(`http://localhost:8000/items?type=${typeId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
} 

export const getActiveItemsByType = (typeId) => {
    return fetch(`http://localhost:8000/items?type=${typeId}&active`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
} 

export const editItem = (item) => {
    return fetch(`http://localhost:8000/items/${item.id}`, {
        method: 'PUT',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
}

export const createItem = (item) => {
    return fetch(`http://localhost:8000/items`, {
        method: 'POST',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
}

export const deactivateItemFetch = (itemId) => {
    return fetch(`http://localhost:8000/items/${parseInt(itemId)}?deactivate`, {
        method: 'PUT',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const reactivateItemFetch = (itemId) => {
    return fetch(`http://localhost:8000/items/${parseInt(itemId)}?reactivate`, {
        method: 'PUT',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}