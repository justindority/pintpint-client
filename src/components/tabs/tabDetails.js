import { tab } from "@testing-library/user-event/dist/tab.js"
import { useEffect, useState } from "react"
import { editTab, getOpenTabs, removeItemFromTab } from "../../managers/tabManager.js"
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    ListGroup,
    ListGroupItem,
    Collapse,
    ButtonGroup,
    InputGroup,
    InputGroupText,
    Input
  } from 'reactstrap';

export const TabDetails = ({selectedTab, remoteSetSelectedTab, clickedCloseTabButtonFn, clickedCloseTab, clickBackButtonWhenClosing, resetTabs, clickedATab}) => {

    const [clickedAddName, setClickedAddName] = useState(false)
    const [tabName, setTabName] = useState()
    const [subtotal, setSubtotal] = useState()
    const [gratuity, setGratuity] = useState(0)
    const [clickedPayByCard, setClickedPayByCard] = useState(false)

    const removeItem = (itemId) => {
        let item = {
            item: parseInt(itemId)
        }
        removeItemFromTab(parseInt(selectedTab.id),item).then(() => remoteSetSelectedTab(parseInt(selectedTab.id)))
    }

    useEffect(()=>{
        let sbtotal = 0
            for (const item of selectedTab.items) {
                sbtotal += parseFloat(item.price)
            }
            setSubtotal(sbtotal.toFixed(2))
    }, [selectedTab])

    const addNameSubmit = () => {
        let tabToEdit = selectedTab
        tabToEdit.customer = tabName
        tabToEdit.employeeId = tabToEdit.employee.id
        setClickedAddName(false)
        editTab(tabToEdit).then(res => (remoteSetSelectedTab(res.id)))
    }

    const updateName = (evt) => {
        let copy = {...tabName}
        copy = evt.target.value
        setTabName(copy)
    }

    const updateGratuity = (evt) => {
        let copy = {...gratuity}
        copy = parseFloat(evt.target.value)
        if(copy){
            setGratuity(copy)
        } else {
            setGratuity(0)
        }
        
    }


    const clickedAddNameFn = () => {
        setClickedAddName(true)
    }

    const unclickAddNameFn = () => {
        setClickedAddName(false)
    }


    const clickedPayWithCardButtonFn = (e) => {
        e.preventDefault()
        setClickedPayByCard(true)
    } 

    const unclickPayWithCardButtonFn = (e) => {
        e.preventDefault()
        setClickedPayByCard(false)
    } 

    const closeTab = () => {
        let customer = ""
        if(selectedTab.customer){
            customer = selectedTab.customer
        }
        let tabToEdit = {
            id: parseInt(selectedTab.id),
            employeeId: selectedTab.employee.id,
            gratuity: gratuity,
            closed: true,
            customer: customer
        }
        editTab(tabToEdit).then(res => remoteSetSelectedTab(null)).then(res => resetTabs())

    }


    return(
        <>
        <Card
            >
            <CardBody>
                <CardTitle tag="h5">
                {
                    clickedAddName
                    ? <div className="add-name-div">
                    <InputGroup><InputGroupText>name</InputGroupText><Input onChange={updateName} ></Input> </InputGroup>
                    <ButtonGroup className="button-div"><Button color="warning" onClick={unclickAddNameFn}>Back</Button><Button color="success" onClick={addNameSubmit}>Submit</Button></ButtonGroup><br/>
                    </div>
                    : <></>
                }
                {
                    selectedTab.customer
                    ? <p>Tab for {selectedTab.customer}</p>
                    : ( clickedAddName
                        ? <><p>Tab {selectedTab.id} </p></>
                        : <><p>Tab {selectedTab.id} <Button color="primary" onClick={clickedAddNameFn} >Add Name to Tab</Button></p></>)
                }
                </CardTitle>
                <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
                >
                    {
                        selectedTab.closed
                        ? <p>Tab Closed</p>
                        : <p>Open Tab</p>
                    }
                </CardSubtitle>
                <ListGroup>
                    {
                        selectedTab?.items?.map(item => {
                            return <>
                            <ListGroupItem key={item?.id}>{item.name} ${item.price} &nbsp;
                            {
                                selectedTab.closed
                                ? <></>
                                : <Button id={item.id} color="light" onClick={(e)=>removeItem(e.target.id)}>&#128465;</Button>
                            } 
                            </ListGroupItem>
                            </>
                        })
                    }
                </ListGroup>
                <CardText>
                    <br></br><p>Subtotal: {subtotal}</p>   
                    {
                        selectedTab.closed
                        ? (
                            selectedTab.gratuity > 0
                            ? (<><p>Tax: ${(subtotal * .07).toFixed(2)}</p><p>Gratuity: ${selectedTab.gratuity}</p>
                            <p>Total: ${(parseFloat(subtotal * 1.07 + parseFloat(selectedTab.gratuity))).toFixed(2)}</p></>)
                            : (<><p>Tax: ${(subtotal * .07).toFixed(2)}</p>
                        <p>Total: ${(parseFloat(subtotal * 1.07)).toFixed(2)}</p></>)
                        )
                        : <></>
                    }
                    {
            selectedTab.closed
            ? <></>
            : (
                clickedCloseTab
                ? (
                    clickedPayByCard
                    ? <></>
                    : <ButtonGroup></ButtonGroup>
                )
                : <Button color="primary" onClick={clickedCloseTabButtonFn}>Close Tab</Button>
                )

        }             
                {
            clickedCloseTab
            ? (
                clickedPayByCard
                ? <>
                    Gratuity: <input type="number" onChange={updateGratuity}></input> &nbsp;
                    <ButtonGroup>
                    <Button color='success' onClick={closeTab}>Swipe Card</Button>
                    <Button color='warning' onClick={unclickPayWithCardButtonFn}>Back</Button>
                    </ButtonGroup><br/><br/>
                    <p>Tax: ${(subtotal * .07).toFixed(2)}</p>
                    <p>Total: ${(parseFloat(subtotal * 1.07) + gratuity).toFixed(2)}</p></>
                : (<>
                <ButtonGroup>
                <Button color='warning' onClick={clickBackButtonWhenClosing}>Back</Button>
                <Button color='primary' onClick={clickedPayWithCardButtonFn}>Pay with Card</Button>
                <Button color='success' onClick={closeTab}>Customer Paid Cash</Button></ButtonGroup><br/><br/>
                <p>Tax: ${(subtotal * .07).toFixed(2)}</p>
                <p>Total: ${(parseFloat(subtotal * 1.07)).toFixed(2)}</p>
              </>)
              )

            : <></>
        }
                </CardText>

            </CardBody>
            </Card>


    


        </>
    )
}

