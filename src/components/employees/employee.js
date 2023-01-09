import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { editEmployee, getEmployee, getEmployees, terminateEmployee } from "../../managers/employeeManager"
import './employee.css'
import {Button, ButtonGroup, Input, InputGroup, InputGroupText, Card} from 'reactstrap'


export const Employees = () => {

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [clickedEmployee, setClickedEmployee] = useState(false)
    const [clickedEditEmployee, setClickedEditEmployee] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState()
    const [blueOrNah, setBlueOrNah] = useState("warning")
    const navigate = useNavigate()

    useEffect(()=>{
        getEmployees().then(data => setEmployees(data))
    },[])

    const clickEmployee = (id) => {
        setClickedEmployee(true)
        setClickedEditEmployee(false)
        setBlueOrNah("warning")
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
        setBlueOrNah("primary")
        setClickedEditEmployee(true)
    }

    const updateEmployee = (evt) => {
        let copy = {...editingEmployee}
        copy[evt.target.id] = evt.target.value
        setEditingEmployee(copy)
    }

    const editEmployeeSubmitButton = () => {
        setBlueOrNah("warning")
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

    let color = 'light'


    return(
        <div className="employee-3-panel">

        

            <div className="three-panel-1">
                <ButtonGroup vertical>
                {
                    employees.map(emp => {
                        {
                            color = "light"
                            if(selectedEmployee?.id === emp.id){
                                color = "primary"
                            }
                        }
                        return (
                                emp?.user?.is_active
                            ? <><Button color={color} id={emp.id} key={emp.id} onClick={e => clickEmployee(parseInt(e.target.id))}>{emp?.user?.first_name} {emp?.user?.last_name}</Button>
                        </>
                            : <></>
                            
                    )
                })
                }
                
                <Button color="success" onClick={registerNewEmployee}>Register New Employee</Button>
                </ButtonGroup>
            </div>
            <div className="three-panel-2">
                {
                    selectedEmployee
                    ? <><Card className="selected-employee-card"><p>Name: {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
                        <p>Hourly Rate: ${selectedEmployee.hourly_rate}</p>
                        <p>Username: {selectedEmployee.username}</p>
                        <p>Admin: {selectedEmployee.is_staff ? <>True</> : <>False</>}</p>
                        <p>Hire Date: {selectedEmployee.hire_date}</p>
                        <ButtonGroup vertical>
                            <Button color={blueOrNah} onClick={clickEditEmployeeFn}>Edit Employee</Button>
                            <Button color="danger" onClick={terminateEmployeeFn}>Terminate Employee</Button>
                        </ButtonGroup>
                        </Card></>
                    : <> </>
                }
            </div>
            <div className="three-panel-3">
                {
                    clickedEditEmployee
                    ? (<>    <Card className="edit-employee-card">        
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
                    <Button color='success' onClick={()=>editEmployeeSubmitButton()}>Submit</Button>
                </div> </Card>
                    </>)
                    : <></>
                }
            </div>



        </div>
    )
}