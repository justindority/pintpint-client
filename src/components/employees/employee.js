import { useEffect, useState } from "react"
import { editEmployee, getEmployee, getEmployees } from "../../managers/employeeManager"
import './employee.css'


export const Employees = () => {

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [clickedEmployee, setClickedEmployee] = useState(false)
    const [clickedEditEmployee, setClickedEditEmployee] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState()

    useEffect(()=>{
        getEmployees().then(data => setEmployees(data))
    },[])

    const clickEmployee = (id) => {
        setClickedEmployee(true)
        getEmployee(id).then(res => {
            let tempEmp = {
                id: res.id,
                first_name: res?.user?.first_name,
                last_name: res?.user?.last_name,
                email: res.user.email,
                username: res.user.username,
                hourly_rate: res.hourly_rate,
                hire_date: res.hire_date,
                is_staff: res.user.is_staff,
                is_active: res.user.is_active,
                user_id: res.user.id
            }
            setSelectedEmployee(tempEmp)})
    }

    const clickEditEmployeeFn = () => {
        setEditingEmployee(selectedEmployee)
        setClickedEditEmployee(true)
    }

    const updateEmployee = (evt) => {
        let copy = {...editingEmployee}
        copy[evt.target.id] = evt.target.value
        setEditingEmployee(copy)
    }

    const editEmployeeSubmitButton = () => {
        setClickedEditEmployee(false)
        editEmployee(editingEmployee).then(res => getStuff())

    }

    const getStuff = () => {
        getEmployees().then(res => setEmployees(res))
        clickEmployee(selectedEmployee.id).then(res => {return setSelectedEmployee(res)})
    }



    return(
        <div className="employee-3-panel">
            <div className="three-panel-1">
                {
                    employees.map(emp => {
                        return <><p id={emp.id} onClick={e => clickEmployee(parseInt(e.target.id))}>{emp.user.first_name} {emp.user.last_name}
                        </p></>
                    })
                }
            </div>
            <div className="three-panel-2">
                {
                    selectedEmployee
                    ? <><p>Name: {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
                        <p>Hourly Rate: {selectedEmployee.hourly_rate}</p>
                        <p>Username: {selectedEmployee.username}</p>
                        <p>Admin: {selectedEmployee.is_staff ? <>True</> : <>False</>}</p>
                        <p>Hire Date: {selectedEmployee.hire_date}</p>
                        <button onClick={clickEditEmployeeFn}>Edit Employee</button>
                        <button>Terminate Employee</button>
                        </>
                    : <> </>
                }
            </div>
            <div className="3-panel-3">
                {
                    clickedEditEmployee
                    ? (<><form onChange={(evt)=>updateEmployee(evt)}>
                    <p>Creating New Item:</p>
                    <label>First Name:</label><input id="first_name" value={editingEmployee?.first_name}></input><br></br>
                    <label>Last Name:</label><input id="last_name" value={editingEmployee?.last_name}></input><br></br>
                    <label>Email:</label><input id="email" value={editingEmployee?.email}></input><br></br>
                    <label>Username:</label><input id="username" value={editingEmployee?.username}></input><br></br>
                    <label>Hourly Rate:</label><input id="hourly_rate" value={editingEmployee?.hourly_rate}></input> <br></br>
                    {/* <label>Pintpoint Admin?:</label><input id="is_staff" value={newItem?.maker}></input> <br></br> */}
                    </form><button onClick={()=>editEmployeeSubmitButton()}>Submit</button></>)
                    : <></>
                }
            </div>
        </div>
    )
}