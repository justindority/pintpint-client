import { useState } from "react"
import { getClosed } from "../../managers/tabManager"
import { Tabs } from "../tabs/tabs"

export const Reports = () => {

    const [clickedPreviousWeekSales, setClickedPreviousWeekSales] = useState()
    const [previousWeekTabs, setPreviousWeekTabs] = useState()
    const [weekTotal, setWeekTotal] = useState()

    const clickPreviousWeekSalesFn = () => {
        let response
        getClosed().then(res => {
            let weekTotal = 0
            for (const tab of res) {
                let subtotal = 0
               for (const item of tab.items) {
                subtotal += parseFloat(item.price)
               } 
               tab.subtotal = subtotal
               weekTotal += subtotal
               if(tab.customer){
                tab.customer = `${tab.customer}'s Tab`
               } else {
                tab.customer = `Tab ${tab.id}`
               }
            }
            setPreviousWeekTabs(res)
            setWeekTotal(weekTotal)
            setClickedPreviousWeekSales(true)
        })
    }

    return (
        <div>
        <div>
        <button onClick={clickPreviousWeekSalesFn}>Previous Week Sales Report</button>
        </div>
        <div>
            {
                clickedPreviousWeekSales
                ? <>
                    {
                        previousWeekTabs.map(tab => {
                            return <>
                            <p>{tab.customer}</p>
                           <p>Subtotal: ${tab.subtotal}</p>
                           </>
                        }
                           
                        )
                    }
                    <p>Report Total: ${weekTotal}</p>
                  </>
                : <></>
            }
        </div>
        </div>

    )


}