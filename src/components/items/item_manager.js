import { UNSAFE_getPathContributingMatches } from "@remix-run/router"
import { useEffect, useState } from "react"
import { createItem, deactivateItemFetch, editItem, getItem, getItems, getItemsByType, reactivateItemFetch } from "../../managers/itemManager"
import { createItemType, getItemTypes } from "../../managers/itemTypeManager"
import { addItemToTab, getTabs } from "../../managers/tabManager"
import './items.css'
import {Button, 
        ButtonGroup,
        Input, 
        InputGroup, 
        InputGroupText,
        Card,
        CardTitle} from 'reactstrap'


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
        setClickedNewItem(false)
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
            setNewItemTypeButtonClicked(false)
            createItemType(type).then(() => getItemTypes().then(data => setItemTypes(data)))
         } else {
            window.alert("Please enter a type")
        }
    }

    const deactivateItem = (itemId) => {
        deactivateItemFetch(itemId).then(res => clickItem(res.type.id))
        
    }

    const reactivateItem = (itemId) => {
        reactivateItemFetch(itemId).then(res => clickItem(res.type.id))

    }

    const clickedEditFn = (itemId) => {
        setNewItemTypeButtonClicked(false)
        setClickedNewItem(false)
        setClickedEdit(true)
        getItem(itemId).then(res => setItemToEdit(res))
    }

    const editSubmitButton = () => {
        setClickedEdit(false)
        editItem(itemToEdit).then(res => {
            setItemToEdit(null)
            getItemsByType(res.type.id).then(resp => setItems(resp))})
    }

    const newItemSubmitButton = () => {
        if(newItem.name && newItem.price){
            setClickedNewItem(false)
            let itemToSubmit = newItem
            itemToSubmit.type = selectedItemType
            createItem(newItem).then(res => getItemsByType(res.type.id).then(resp => setItems(resp)))
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

    let color = "light"
    let editColor = 'warning'

    return(
        <div className="items-3-panel">
            <div className="three-panel-1">
                <ButtonGroup vertical>
            {
                itemTypes?.map(type => {
                    {
                        color = "light"
                        if(selectedItemType === type.id){
                            color = "primary"
                        }
                    }
                    return (<Button color={color} id={type.id} key={type.id} onClick={(e)=>clickItem(parseInt(e.target.id))}>{type.type}</Button>)
                })
            }
            
        {
            newItemTypeButtonClicked
            ? <><br/><label>Type: </label><input id="newItemTypeInput" onChange={updateNewItemType}></input><Button color='success' onClick={(e)=>submitNewItemType()}>Submit</Button><Button  color="warning" onClick={()=>setNewItemTypeButtonClicked(false)}>Cancel</Button></>
            : <Button color='success' onClick={clickNewItemTypeFn}>Create Item Type</Button>
        }
        </ButtonGroup>
        </div>
        <div className="three-panel-2">
            
        {
            clickedItemType
            ? <><Card className="item-list-card">
                {
                    items[0]
                    ? <CardTitle className="item-type-card-title">{items[0]?.type?.type} Items</CardTitle>
                    : <CardTitle className="item-type-card-title">Add Item(s) to New Item Type</CardTitle>

                }
                {items.map(item => {
                        {
                            editColor = "warning"
                            if(itemToEdit?.id === item.id){
                                editColor = "primary"
                            }
                        }
                return <>
                <p key={item.id} id={item.id}>{item.name} ${item.price} &nbsp; {item.active 
                    ? <>
                    <ButtonGroup><Button color={editColor} id={item.id} onClick={(e)=>clickedEditFn(parseInt(e.target.id))}>Edit</Button>
                      <Button color="danger" id={item.id} onClick={(e)=>deactivateItem(parseInt(e.target.id))}>Deactivate</Button>
                      </ButtonGroup></> 
                    : <Button id={item.id} onClick={(e)=>reactivateItem(parseInt(e.target.id))}>Reactivate</Button>}</p>
                 </>
            })}<Button color="success" id={selectedItemType} onClick={(e)=>clickNewItemFn(e.target.id)} >New Item of this Type</Button></Card></>
            : <></>
        }
        
        </div>
        <div className="three-panel-3">
            
        {
            clickedEdit
            ? (<><Card className="edit-item-card"><div>
                <CardTitle className="item-type-card-title">Editing {itemToEdit?.name}</CardTitle>
                <InputGroup onChange={(evt)=>updateItemToEdit(evt)}>
                    <InputGroupText>
                        name
                    </InputGroupText>
                    <Input id="name" value={itemToEdit?.name} />
                </InputGroup>
                <br />
                <InputGroup onChange={(evt)=>updateItemToEdit(evt)}>
                    <InputGroupText>
                        price
                    </InputGroupText>
                    <Input id="price" value={itemToEdit?.price}/>
                </InputGroup >
                <br />
                <InputGroup onChange={(evt)=>updateItemToEdit(evt)}>
                    <InputGroupText>
                        maker
                    </InputGroupText>
                    <Input id="maker" value={itemToEdit?.maker}/>
                
                </InputGroup>
                <br />
                
                <Button color='success' onClick={()=>editSubmitButton()}>Submit</Button>
                </div> </Card></>)
            : <></>
        }
        {
            clickedNewItem
            ? (<>  <Card className="edit-item-card">         
                <div>
                    <p>Creating New Item</p>
                    <InputGroup onChange={(evt)=>updateNewItem(evt)}>
                        <InputGroupText>
                            name
                        </InputGroupText>
                        <Input id="name" value={newItem?.name} />
                    </InputGroup>
                    <br />
                    <InputGroup onChange={(evt)=>updateNewItem(evt)}>
                        <InputGroupText>
                            price
                        </InputGroupText>
                        <Input id="price" value={newItem?.price}/>
                    </InputGroup >
                    <br />
                    <InputGroup onChange={(evt)=>updateNewItem(evt)}>
                        <InputGroupText>
                            maker
                        </InputGroupText>
                        <Input id="maker" value={newItem?.maker}/>
                    
                    </InputGroup>
                    <br />
                    
                    <Button color="success" onClick={()=>newItemSubmitButton()}>Submit</Button>
                </div> </Card> </>)
            : <></>
        }
        
        </div>
        </div>
    )
}


