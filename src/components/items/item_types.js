import { useEffect,useState } from "react"
import { getItemTypes } from "../../managers/itemTypeManager.js"
import { Items } from "./items"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Card
  } from 'reactstrap';
  import PropTypes from 'prop-types';


export const ItemTypes = ({selectedTab, remoteSetSelectedTab}) => {
    const [itemTypes, setItemTypes] = useState([])
    const [selectedItemType, setSelectedItemType] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItemTypeText, setSelectedItemTypeText] = useState("Select an Item Type")

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    useEffect(()=>{
        getItemTypes().then(data => setItemTypes(data))
    }, [])

    const clickItemType = (event) => {
        setSelectedItemType(event.target.id)
        setSelectedItemTypeText(event.target.textContent)
    }


    return (<>
    <Card className="item-type-card">
    <article className="item-types">
    <div className="dropdown-container">
      <Dropdown color="primary" className="type-dropdown" isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle color="primary" className="type-dropdown" caret>{selectedItemTypeText}</DropdownToggle>
        <DropdownMenu className="type-dropdown">
        {
        itemTypes?.map(itemType => {
            return <DropdownItem className="type-dropdown" id={itemType?.id} key={itemType?.id} onClick={(e)=>clickItemType(e)} >
                {itemType?.type}
            </DropdownItem>
        })
    }

        </DropdownMenu>
      </Dropdown>
    </div>
  

    </article>
    {
        selectedItemType != null
        ? <section><Items key={'Items'} selectedItemType={selectedItemType} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></Items></section>
        : <></>
    }

</Card></>)
}

ItemTypes.propTypes = {
    direction: PropTypes.string,
  };