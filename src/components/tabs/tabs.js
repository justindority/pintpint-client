import { useEffect,useState } from "react"
import { createTab, getTab, getTabs } from "../../managers/tabManager"
import { TabDetails } from "./tabDetails"
import { ItemTypes } from "../items/item_types.js"
import './tabs.css'


export const Tabs = () => {
    const [tabs, setTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState(null)
    const [clickedNewTab, setClickedNewTab] = useState(false)
    const [tabCounter, setTabCounter] = useState(0)


    useEffect(()=>{
        getTabs().then(data => setTabs(data))
    }, [])



    const getSelectedTab = (e) => {
        getTab(parseInt(e.target.id)).then(data => setSelectedTab(data))
    }

    const remoteSetSelectedTab = (tabId) => {
        if(tabId){
            getTab(parseInt(tabId)).then(res => setSelectedTab(res))
            getTabs().then(data => setTabs(data))
        } else {
            setSelectedTab(null)
        }
    }

    const newTab = (e) => {
        e.preventDefault()
        createTab().then(res => remoteSetSelectedTab(res.id))
    }

    // const tabCounterHelper = () => {
    //     let counter = tabCounter++
    //     setTabCounter(counter)
    //     return <>Open Tab {tabCounter}</>
    // }

    return (<div className="tabs-3-panel">
    <div className="three-panel-1">
    {
        tabs?.map(tab => {
            return <section>
                <p id={tab?.id} onClick={(e)=>getSelectedTab(e)}>
                {
                    tab.customer
                    ? tab.customer
                    : <>Tab {tab.id}</>
                }</p>
            </section>
        })
    }
    <button onClick={(e)=>newTab(e)}>Open New Tab</button>
    </div>
    <div className="three-panel-2">
    {
        selectedTab != null
        ? (<><section><TabDetails selectedTab={selectedTab} remoteSetSelectedTab={remoteSetSelectedTab}></TabDetails></section>
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