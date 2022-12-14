import { useEffect,useState } from "react"
import { getItemTypes } from "../../managers/itemTypeManager.js"
import { Items } from "./items"


export const ItemTypes = ({selectedTab, remoteSetSelectedTab}) => {
    const [itemTypes, setItemTypes] = useState([])
    const [selectedItemType, setSelectedItemType] = useState(null)


    useEffect(()=>{
        getItemTypes().then(data => setItemTypes(data))
    }, [])


    return (<>
    {
        itemTypes?.map(itemType => {
            return <section>
                <p id={itemType?.id} onClick={(e)=>setSelectedItemType(e.target.id)}>{itemType?.type}</p>
            </section>
        })
    }

    {
        selectedItemType != null
        ? <section><Items selectedItemType={selectedItemType} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></Items></section>
        : <></>
    }

    </>)
}