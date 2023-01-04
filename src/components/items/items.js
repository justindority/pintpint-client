import { useEffect, useState } from "react"
import { getItems, getActiveItemsByType } from "../../managers/itemManager"
import { addItemToTab, getTabs } from "../../managers/tabManager"

export const Items = ({selectedItemType, selectedTab, remoteSetSelectedTab}) => {

    const [items, setItems] = useState()

    useEffect(()=>{
        getActiveItemsByType(parseInt(selectedItemType)).then(data => setItems(data))
    },[selectedItemType])

    const addTabItem = (itemId) => {
        let item = {
            item: parseInt(itemId)
        }
        addItemToTab(parseInt(selectedTab.id), item)
        .then(getTabs().then(remoteSetSelectedTab(selectedTab.id)))
    }

    return(
        <>
        {
            items
            ? items.map(item => {
                return <><p id={item.id}>{item.name} &nbsp; ${item.price} &nbsp; &nbsp;
                {
                    selectedTab.closed
                    ? <></>
                    : <button onClick={(e)=>addTabItem(e.target.id)} id={item.id}>Add to Tab</button>
                }
                </p></>
            })
            : <></>
        }
        </>
    )
}