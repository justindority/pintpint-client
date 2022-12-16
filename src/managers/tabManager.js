export const getTabs = () => {
    return fetch("http://localhost:8000/tabs", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const getTab = (id) => {
    return fetch(`http://localhost:8000/tabs/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const addItemToTab = (tab, item) => {
    return fetch(`http://localhost:8000/tabs/${tab}/additem`, {
        method: 'POST',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
}

export const removeItemFromTab = (tab, item) => {
    return fetch(`http://localhost:8000/tabs/${tab}/removeitem`, {
        method: 'DELETE',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}

export const editTab = (tab) => {
    return fetch(`http://localhost:8000/tabs/${parseInt(tab.id)}`, {
        method: 'PUT',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tab)
    })
        .then(response => response.json())
}

export const createTab = () => {
    return fetch(`http://localhost:8000/tabs`, {
        method: 'POST',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export const getClosed = () => {
    return fetch("http://localhost:8000/tabs?closed", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}