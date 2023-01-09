import { useEffect,useState } from "react"
import { createTab, getClosedTabs, getOpenTabs, getTab, getTabs } from "../../managers/tabManager"
import { TabDetails } from "./tabDetails"
import { ItemTypes } from "../items/item_types.js"
import './tabs.css'
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    ButtonGroup,
    Collapse
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export const Tabs = () => {
    const [tabs, setTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState(null)
    const [clickedNewTab, setClickedNewTab] = useState(false)
    const [tabCounter, setTabCounter] = useState(0)
    const [clickedCloseTab, setClickedCloseTab] = useState(false)
    const [clickedATab, setClickedATab] = useState(false)



    useEffect(()=>{
        getOpenTabs().then(data => setTabs(data))
    }, [])

    const resetTabs = () => {
        getOpenTabs().then(data => setTabs(data))

    }

    const clickTab = (e) => {
        getSelectedTab(e)
        setClickedATab(true)
    }

    const getSelectedTab = (e) => {
        setClickedCloseTab(false)
        getTab(parseInt(e.target.id)).then(data => setSelectedTab(data))
    }

    const remoteSetSelectedTab = (tabId) => {
        if(tabId){
            getTab(parseInt(tabId)).then(res => setSelectedTab(res))
            getOpenTabs().then(data => setTabs(data))
        } else {
            setSelectedTab(null)
        }
    }

    const clickedCloseTabButtonFn = (e) => {
        e.preventDefault()
        setClickedCloseTab(true)
    }

    const clickBackButtonWhenClosing = (e) => {
        e.preventDefault()
        setClickedCloseTab(false)
    }

    const newTab = (e) => {
        e.preventDefault()
        createTab().then(res => remoteSetSelectedTab(res.id))
    }

    const clickedOpenTabsFn = (e) => {
        e.preventDefault()
        getOpenTabs().then(res => setTabs(res))
    }

    const clickedClosedTabsFn = (e) => {
        e.preventDefault()
        getClosedTabs().then(res => setTabs(res))
    }

        const [open, setOpen] = useState('1');
        const toggle = (id) => {
          if (open === id) {
            setOpen();
          } else {
            setOpen(id);
          }
        }
      

    // const tabCounterHelper = () => {
    //     let counter = tabCounter++
    //     setTabCounter(counter)
    //     return <>Open Tab {tabCounter}</>
    // }

    let color = "light"

    return (
    <div className="tabs-3-panel">
    <div className="three-panel-1">
      <ButtonGroup className="open-closed">
        <Button color="primary" onClick={clickedOpenTabsFn}>Open Tabs</Button>
        <Button color="primary" onClick={clickedClosedTabsFn}>Closed Tabs</Button>
      </ButtonGroup> <br></br>
        <ButtonGroup vertical className="tab-group">
          {
                tabs?.map(tab => {
                    {
                        color = "light"
                        if(selectedTab?.id === tab.id){
                            color = "primary"
                        }
                    }
                    return (<Button color={color} id={tab?.id} key={tab?.id} onClick={clickTab} >
                        {
                            tab.customer
                            ? tab.customer
                            : <>Tab {tab.id}</>
                        }</Button>)
        })
    }

         


    <Button color="success" onClick={(e)=>newTab(e)}>Open New Tab</Button>
    </ButtonGroup>
    </div>
    <div className="three-panel-2">
    {
        selectedTab != null
        ? (<><section><Collapse horizontal isOpen={clickedATab}><TabDetails key={'TabDetails'} clickedATab={clickedATab} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab} clickedCloseTabButtonFn={clickedCloseTabButtonFn} clickedCloseTab={clickedCloseTab} clickBackButtonWhenClosing={clickBackButtonWhenClosing} resetTabs={resetTabs}></TabDetails></Collapse></section>
        </>)
        : <></>
    }
    </div>
    <div>
    {
        selectedTab != null
        ? (
            selectedTab.closed
            ? <></>
            : <><div className="three-panel-3"><ItemTypes key={'ItemTypes'} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></ItemTypes></div></>)
        : <></>
    }
    </div>
    
    </div>)
}