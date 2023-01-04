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
    <article className="item-types">
    {
        itemTypes?.map(itemType => {
            return <section id={itemType?.id} onClick={(e)=>setSelectedItemType(e.target.id)} >
                <p class="item-type" id={itemType?.id} >{itemType?.type}</p>
            </section>
        })
    }
    </article>
    {
        selectedItemType != null
        ? <section><Items selectedItemType={selectedItemType} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></Items></section>
        : <></>
    }

    </>)
}