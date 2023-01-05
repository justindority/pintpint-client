import { useEffect,useState } from "react"
import { getItemTypes } from "../../managers/itemTypeManager.js"
import { Items } from "./items"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
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
    <article className="item-types">
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>{selectedItemTypeText}</DropdownToggle>
        <DropdownMenu>
        {
        itemTypes?.map(itemType => {
            return <DropdownItem id={itemType?.id} onClick={(e)=>clickItemType(e)} >
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
        ? <section><Items selectedItemType={selectedItemType} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></Items></section>
        : <></>
    }

    </>)
}

ItemTypes.propTypes = {
    direction: PropTypes.string,
  };