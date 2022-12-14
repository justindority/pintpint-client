import { tab } from "@testing-library/user-event/dist/tab.js"
import { useState } from "react"
import { editTab, removeItemFromTab } from "../../managers/tabManager.js"

export const TabDetails = ({selectedTab, remoteSetSelectedTab}) => {

    const [clickedAddName, setClickedAddName] = useState(false)
    const [tabName, setTabName] = useState()

    const removeItem = (itemId) => {
        let item = {
            item: parseInt(itemId)
        }
        removeItemFromTab(parseInt(selectedTab.id),item)
        .then(remoteSetSelectedTab(parseInt(selectedTab.id)))
    }

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
        let tabToEdit = {
            id: parseInt(tab.id),
            employeeId: tab.employee.id,
            gratuity: tab.gratuity,
            closed: true
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
        }{
            selectedTab.closed
            ? <></>
            : <button onClick={()=>closeTab(selectedTab)}>Close Tab</button>

        }
        </>
    )
}