export const getEmployees = () => {
    return fetch("http://localhost:8000/employees", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}

export const getEmployee = (id) => {
    return fetch(`http://localhost:8000/employees/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`
        }
    })
        .then(response => response.json())
}


export const editEmployee = (emp) => {
    return fetch(`http://localhost:8000/employees/${parseInt(emp.id)}`, {
        method: 'PUT',
        headers:{
            "Authorization": `Token ${localStorage.getItem("pintpoint_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(emp)
    })
}