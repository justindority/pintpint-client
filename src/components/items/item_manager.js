import { UNSAFE_getPathContributingMatches } from "@remix-run/router"
import { useEffect, useState } from "react"
import { createItem, deactivateItemFetch, editItem, getItem, getItems, getItemsByType, reactivateItemFetch } from "../../managers/itemManager"
import { createItemType, getItemTypes } from "../../managers/itemTypeManager"
import { addItemToTab, getTabs } from "../../managers/tabManager"
import './items.css'

export const ItemManager = () => {

    const [itemTypes, setItemTypes] = useState([])
    const [clickedItemType, setClickedItemType] = useState(false)
    const [selectedItemType, setSelectedItemType] = useState()
    const [items, setItems] = useState([])
    const [newItemType, setNewItemType] = useState()
    const [newItemTypeButtonClicked, setNewItemTypeButtonClicked] = useState(false)
    const [clickedEdit, setClickedEdit] = useState(false)
    const [itemToEdit, setItemToEdit] = useState()
    const [clickedNewItem, setClickedNewItem] = useState()
    const [newItem, setNewItem] = useState()


    useEffect(()=>{
        getItemTypes().then(data => setItemTypes(data))
    },[])

    const clickItem = (id) => {
        setClickedEdit(false)
        setClickedItemType(true)
        setSelectedItemType(id)
        getItemsByType(id).then(data => setItems(data))
    }

    const updateNewItemType = (evt) => {
        let copy = {...newItemType}
        copy[evt.target.id] = evt.target.value
        setNewItemType(copy)
    }

    const updateItemToEdit = (evt) => {
        let copy = {...itemToEdit}
        copy[evt.target.id] = evt.target.value
        setItemToEdit(copy)
    }

    const updateNewItem = (evt) => {
        let copy = {...newItem}
        copy[evt.target.id] = evt.target.value
        setNewItem(copy)
    }


    const submitNewItemType = () => {
        if(newItemType.newItemTypeInput){
            let type = {itemType:newItemType.newItemTypeInput}
            createItemType(type).then(getItemTypes().then(data => setItemTypes(data)))
         } else {
            window.alert("Please enter a type")
        }
    }

    const deactivateItem = (itemId) => {
        deactivateItemFetch(itemId).then(res => clickItem(res.type))
        
    }

    const reactivateItem = (itemId) => {
        reactivateItemFetch(itemId).then(res => clickItem(res.type))

    }

    const clickedEditFn = (itemId) => {
        setNewItemTypeButtonClicked(false)
        setClickedEdit(true)
        getItem(itemId).then(res => setItemToEdit(res))
    }

    const editSubmitButton = () => {
        setClickedEdit(false)
        editItem(itemToEdit).then(res => getItemsByType(res.type).then(res => setItems(res)))
    }

    const newItemSubmitButton = () => {
        if(newItem.name && newItem.price){
            setClickedNewItem(false)
            let itemToSubmit = newItem
            itemToSubmit.type = selectedItemType
            createItem(newItem).then(res => getItemsByType(res.type).then(res => setItems(res)))
        } else {
            window.alert("Please enter all data!")
        }
    }

    const clickNewItemTypeFn = () => {
        setNewItemTypeButtonClicked(true)
        setClickedEdit(false)
        setClickedItemType(false)
    }

    const clickNewItemFn = (typeId) => {
        setNewItem({})
        setClickedNewItem(true)
        setClickedEdit(false)
    }

    return(
        <div className="items-3-panel">
            <div className="three-panel-1">
            {
                itemTypes?.map(type => {
                    return <p id={type.id} onClick={(e)=>clickItem(parseInt(e.target.id))}>{type.type}</p>
                })
            }
            
        {
            newItemTypeButtonClicked
            ? <><label>Type: </label><input id="newItemTypeInput" onChange={updateNewItemType}></input><button onClick={(e)=>submitNewItemType()}>Submit</button><button onClick={()=>setNewItemTypeButtonClicked(false)}>Cancel</button></>
            : <button onClick={clickNewItemTypeFn}>Create Item Type</button>
        }
        </div>
        <div className="three-panel-2">
        {
            clickedItemType
            ? <>{items.map(item => {
                return <>
                <p id={item.id}>{item.name} ${item.price} {item.active 
                    ? <><button id={item.id} onClick={(e)=>clickedEditFn(parseInt(e.target.id))}>Edit</button> 
                      <button id={item.id} onClick={(e)=>deactivateItem(parseInt(e.target.id))}>Deactivate</button></> 
                    : <button id={item.id} onClick={(e)=>reactivateItem(parseInt(e.target.id))}>Reactivate</button>}</p>
                </>
            })}<button id={selectedItemType} onClick={(e)=>clickNewItemFn(e.target.id)} >New Item of this Type</button></>
            : <></>
        }
        </div>
        <div className="three-panel-3">
        {
            clickedEdit
            ? (<><form onChange={(evt)=>updateItemToEdit(evt)}>
                <p>Editing {itemToEdit?.name}</p>
               <label>Name:</label><input id="name" value={itemToEdit?.name}></input><br></br>
               <label>Price:</label><input id="price" value={itemToEdit?.price}></input> <br></br>
               <label>Maker:</label><input id="maker" value={itemToEdit?.maker}></input> <br></br>
            </form><button onClick={()=>editSubmitButton()}>Submit</button></>)
            : <></>
        }
        {
            clickedNewItem
            ? (<><form onChange={(evt)=>updateNewItem(evt)}>
                <p>Creating New Item:</p>
                <label>Name:</label><input id="name" value={newItem?.name}></input><br></br>
                <label>Price:</label><input id="price" value={newItem?.price}></input> <br></br>
                <label>Maker:</label><input id="maker" value={newItem?.maker}></input> <br></br>
            </form><button onClick={()=>newItemSubmitButton()}>Submit</button></>)
            : <></>
        }
        </div>
        </div>
    )
}