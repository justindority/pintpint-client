import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { editEmployee, getEmployee, getEmployees, terminateEmployee } from "../../managers/employeeManager"
import './employee.css'
import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from 'reactstrap'


export const Employees = () => {

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [clickedEmployee, setClickedEmployee] = useState(false)
    const [clickedEditEmployee, setClickedEditEmployee] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState()
    const navigate = useNavigate()

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

    const terminateEmployeeFn = () => {
        let empToSend = selectedEmployee.user_id
        terminateEmployee(empToSend).then(getEmployees().then(data => setEmployees(data).then(setClickedEditEmployee(false)))
        )
    }

    const registerNewEmployee = (e) => {
        e.preventDefault()
        navigate('/register')
    }



    return(
        <div className="employee-3-panel">

        

            <div className="three-panel-1">
                <ButtonGroup vertical>
                {
                    employees.map(emp => {
                        return (
                            
                                emp?.user?.is_active
                            ? <><Button id={emp.id} onClick={e => clickEmployee(parseInt(e.target.id))}>{emp?.user?.first_name} {emp?.user?.last_name}</Button>
                        </>
                            : <></>
                            
                    )
                })
                }
                
                <Button onClick={registerNewEmployee}>Register New Employee</Button>
                </ButtonGroup>
            </div>
            <div className="three-panel-2">
                {
                    selectedEmployee
                    ? <><p>Name: {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
                        <p>Hourly Rate: ${selectedEmployee.hourly_rate}</p>
                        <p>Username: {selectedEmployee.username}</p>
                        <p>Admin: {selectedEmployee.is_staff ? <>True</> : <>False</>}</p>
                        <p>Hire Date: {selectedEmployee.hire_date}</p>
                        <Button onClick={clickEditEmployeeFn}>Edit Employee</Button>
                        <Button onClick={terminateEmployeeFn}>Terminate Employee</Button>
                        </>
                    : <> </>
                }
            </div>
            <div className="3-panel-3">
                {
                    clickedEditEmployee
                    ? (<>            
                        <div>
                        <InputGroup onChange={(evt)=>updateEmployee(evt)}>
                            <InputGroupText>
                                first name
                            </InputGroupText>
                            <Input id="first_name" value={editingEmployee?.first_name} />
                        </InputGroup>
                        <br />
                        <InputGroup onChange={(evt)=>updateEmployee(evt)}>
                            <InputGroupText>
                                last name
                            </InputGroupText>
                            <Input id="last_name" value={editingEmployee?.last_name}/>
                        </InputGroup >
                        <br />
                        <InputGroup onChange={(evt)=>updateEmployee(evt)}>
                            <InputGroupText>
                                email
                            </InputGroupText>
                            <Input id="email" value={editingEmployee?.email}/>
            
                        </InputGroup>
                        <br />
                        <InputGroup onChange={(evt)=>updateEmployee(evt)}>
                            <InputGroupText>
                                username
                            </InputGroupText>
                            <Input id="username" value={editingEmployee?.username}/>
                        </InputGroup>
                        <br />
                        <InputGroup onChange={(evt)=>updateEmployee(evt)}>
                            <InputGroupText>
                                hourly rate
                            </InputGroupText>
                            <Input id="hourly_rate" value={editingEmployee?.hourly_rate}/>
                        </InputGroup>
                        <br />
                    <Button onClick={()=>editEmployeeSubmitButton()}>Submit</Button>
                </div> 
                    </>)
                    : <></>
                }
            </div>



        </div>
    )
}