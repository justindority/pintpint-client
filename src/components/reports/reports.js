import { useState, useEffect } from "react"
import { getClosed } from "../../managers/tabManager"
import { Tabs } from "../tabs/tabs"
import { Chart } from 'react-chartjs-2'
import {Button} from 'reactstrap'
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const barGraphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Sales by Item',
      },
    },
  };

  export const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Sales by Item',
      },
    },
  };

  
  
 




export const Reports = () => {

    const [clickedPreviousWeekSales, setClickedPreviousWeekSales] = useState()
    const [allItems, setAllItems] = useState()
    const [itemNames, setItemNames] = useState()

    useEffect(()=>{

        getClosed().then(res => {
            let items = []
            let itemNames = new Set()
            for (const tab of res) {
                for (const item of tab.items) {
                        items.push(item)
                        itemNames.add(item.name)
                    }
                }

            setItemNames(Array.from(itemNames))
            
            let sameNameArray = Array.from(itemNames).map(itemName => {
                return items.filter(item => itemName === item.name)
            })

            let finalArray = []
            for (const itemArray of sameNameArray) {
                let item = itemArray[0]
                item.count = itemArray.length
                finalArray.push(item)
            }

            setAllItems(finalArray)

    })}, [])

    const clickPreviousWeekSalesFn = () => {
            setClickedPreviousWeekSales(true)
        }

    const labels = itemNames;


    const barGraphData = {
        labels,
        datasets: [
                {
                label: 'Number of Item Sold',
                data: allItems?.map(item => item.count),
                backgroundColor: 'rgb(12, 110, 253)',
                }
            ],
        };

        const getMyColor = () => {
            let n = (Math.random() * 0xfffff * 1000000).toString(16);
            return '#' + n.slice(0, 6);
          };
    
        const pieData = {
            labels: itemNames?.map(item => item),
            datasets: [
              {
                label: "Gross Sales ($)",
                data: allItems?.map(item => {
                    return parseInt(item.price) * item.count

                }),
                backgroundColor: itemNames?.map(getMyColor),
                borderColor: [
                  'gray'
                ],
                borderWidth: 1,
              },
            ],
          };


    return (
        <div>
        <div>
        <Button color="primary" onClick={clickPreviousWeekSalesFn}>Total Sales by Item Report</Button>
        </div>
        <div className="reports">
            {
                clickedPreviousWeekSales
                ? <>        <div className="bar-chart" ><Bar options={barGraphOptions} data={barGraphData} /></div>
                            <br/><br/>
                            <div className="pie-chart" ><Pie className="pie-chart" data={pieData} /></div>                 
                  </>
                : <></>
            }
        </div>
        </div>

    )


}