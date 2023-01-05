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
    ButtonGroup
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export const Tabs = () => {
    const [tabs, setTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState(null)
    const [clickedNewTab, setClickedNewTab] = useState(false)
    const [tabCounter, setTabCounter] = useState(0)
    const [clickedCloseTab, setClickedCloseTab] = useState(false)



    useEffect(()=>{
        getOpenTabs().then(data => setTabs(data))
    }, [])

    const resetTabs = () => {
        getOpenTabs().then(data => setTabs(data))

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

    return (<div className="tabs-3-panel">
    <div className="three-panel-1">
    <div>
      <ButtonGroup>
        <Button onClick={clickedOpenTabsFn}>Open Tabs</Button>
        <Button onClick={clickedClosedTabsFn}>Closed Tabs</Button>
      </ButtonGroup> <br></br>
        <ButtonGroup vertical>
          {
                tabs?.map(tab => {
                    return <Button id={tab?.id} onClick={(e)=>getSelectedTab(e)} >
                        {
                            tab.customer
                            ? tab.customer
                            : <>Tab {tab.id}</>
                        }</Button>
        })
    }

         


    <Button onClick={(e)=>newTab(e)}>Open New Tab</Button>
    </ButtonGroup>
    </div>
    </div>
    <div className="three-panel-2">
    {
        selectedTab != null
        ? (<><section><TabDetails key={clickedCloseTab} selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab} clickedCloseTabButtonFn={clickedCloseTabButtonFn} clickedCloseTab={clickedCloseTab} clickBackButtonWhenClosing={clickBackButtonWhenClosing} resetTabs={resetTabs}></TabDetails></section>
        </>)
        : <></>
    }
    </div>
    <div>
    {
        selectedTab != null
        ? (<><div className="three-panel-3"><ItemTypes selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></ItemTypes></div></>)
        : <></>
    }
    </div>
    
    </div>)
}