import { useEffect, useState } from "react"
import { getEmployee, getEmployees } from "../../managers/employeeManager"


export const Employees = () => {

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [clickedEmployee, setClickedEmployee] = useState(false)

    useEffect(()=>{
        getEmployees().then(data => setEmployees(data))
    },[])

    const clickEmployee = (id) => {
        setClickedEmployee(true)
        getEmployee(id).then(res => setSelectedEmployee(res))
    }



    return(
        <>
        {
            employees.map(emp => {
                return <><p id={emp.id} onClick={e => clickEmployee(parseInt(e.target.id))}>{emp.user.first_name} {emp.user.last_name}
                </p></>
            })
        }
        {
            selectedEmployee
            ? <><p>Name: {selectedEmployee.user.first_name} {selectedEmployee.user.last_name}</p>
                <p>Hourly Rate: {selectedEmployee.hourly_rate}</p>
                <p>Username: {selectedEmployee.user.username}</p>
                <p>Admin: {selectedEmployee.user.is_staff ? <>True</> : <>False</>}</p>
                <p>Hire Date: {selectedEmployee.hire_date}</p>
                <button>Edit Employee</button>
                <button>Terminate Employee</button>
                </>
            : <> </>
        }
        </>
    )
}