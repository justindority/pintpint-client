import { tab } from "@testing-library/user-event/dist/tab.js"
import { useEffect, useState } from "react"
import { editTab, removeItemFromTab } from "../../managers/tabManager.js"

export const TabDetails = ({selectedTab, remoteSetSelectedTab}) => {

    const [clickedAddName, setClickedAddName] = useState(false)
    const [tabName, setTabName] = useState()
    const [subtotal, setSubtotal] = useState()

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


    const clickedAddNameFn = () => {
        setClickedAddName(true)
    }

    const closeTab = (tab) => {
        let customer = ""
        if(tab.customer){
            customer = tab.customer
        }
        let tabToEdit = {
            id: parseInt(tab.id),
            employeeId: tab.employee.id,
            gratuity: tab.gratuity,
            closed: true,
            customer: customer
        }
        editTab(tabToEdit).then(res => remoteSetSelectedTab(null))
    }

    return(
        <>
        {
            clickedAddName
            ? <><label>Name:</label><input onChange={updateName} ></input><button onClick={addNameSubmit}>Submit</button></>
            : <></>
        }
        {
            selectedTab.customer
            ? <p>Tab for {selectedTab.customer}</p>
            : <><p>Tab {selectedTab.id} <button onClick={clickedAddNameFn} >Add Name to Tab</button></p></>
        }
        {
            selectedTab.closed
            ? <p>Tab Closed</p>
            : <p>Open Tab</p>
        }
        {
            selectedTab?.items?.map(item => {
                return <>
                <p>{item.name}</p><p>{item.price}
                {
                    selectedTab.closed
                    ? <></>
                    : <button id={item.id} onClick={(e)=>removeItem(e.target.id)}>Remove Item</button>
                } </p>
                </>
            })
        }
        <p>Subtotal: {subtotal}</p>
        {
            selectedTab.closed
            ? <></>
            : <button onClick={()=>closeTab(selectedTab)}>Close Tab</button>

        }
        </>
    )
}