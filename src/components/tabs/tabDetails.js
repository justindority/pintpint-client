import { tab } from "@testing-library/user-event/dist/tab.js"
import { useEffect, useState } from "react"
import { editTab, getOpenTabs, removeItemFromTab } from "../../managers/tabManager.js"

export const TabDetails = ({selectedTab, remoteSetSelectedTab, clickedCloseTabButtonFn, clickedCloseTab, clickBackButtonWhenClosing, resetTabs}) => {

    const [clickedAddName, setClickedAddName] = useState(false)
    const [tabName, setTabName] = useState()
    const [subtotal, setSubtotal] = useState()
    const [gratuity, setGratuity] = useState(0)
    const [clickedPayByCard, setClickedPayByCard] = useState(false)

    const removeItem = (itemId) => {
        let item = {
            item: parseInt(itemId)
        }
        removeItemFromTab(parseInt(selectedTab.id),item)
        .then(remoteSetSelectedTab(parseInt(selectedTab.id)))
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
        {
            clickedAddName
            ? <><button onClick={unclickAddNameFn}>Back</button><label>Name:</label><input onChange={updateName} ></input><button onClick={addNameSubmit}>Submit</button></>
            : <></>
        }
        {
            selectedTab.customer
            ? <p>Tab for {selectedTab.customer}</p>
            : ( clickedAddName
                ? <><p>Tab {selectedTab.id} </p></>
                : <><p>Tab {selectedTab.id} <button onClick={clickedAddNameFn} >Add Name to Tab</button></p></>)
        }
        {
            selectedTab.closed
            ? <p>Tab Closed</p>
            : <p>Open Tab</p>
        }
        {
            selectedTab?.items?.map(item => {
                return <>
                <p key={item.id}>{item.name} ${item.price} </p>
                {
                    selectedTab.closed
                    ? <></>
                    : <button id={item.id} onClick={(e)=>removeItem(e.target.id)}>Remove Item</button>
                } 
            
                </>
            })
        }
        <p>Subtotal: {subtotal}</p>
        {
            selectedTab.closed
            ? <></>
            : (
                clickedCloseTab
                ? (
                    clickedPayByCard
                    ? <></>
                    : <button onClick={clickBackButtonWhenClosing}>Back</button>
                )
                : <button onClick={clickedCloseTabButtonFn}>Close Tab</button>
                )

        }
        {
            clickedCloseTab
            ? (
                clickedPayByCard
                ? <><button onClick={unclickPayWithCardButtonFn}>Back</button>
                    Gratuity: <input type="number" onChange={updateGratuity}></input> 
                    <button onClick={closeTab}>Swipe Card</button>
                    <p>Tax: ${(subtotal * .07).toFixed(2)}</p>
                    <p>Total: ${(parseFloat(subtotal * 1.07) + gratuity)}</p></>
                : (<>
                <button onClick={clickedPayWithCardButtonFn}>Pay with Card</button>
                <button onClick={closeTab}>Customer Paid Cash</button>
                <p>Tax: ${(subtotal * .07).toFixed(2)}</p>
                <p>Total: ${(parseFloat(subtotal * 1.07))}</p>
              </>)
              )

            : <></>
        }
        </>
    )
}