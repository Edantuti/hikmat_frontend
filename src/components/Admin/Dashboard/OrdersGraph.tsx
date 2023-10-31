import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory'
import { ordersDataConvertingToMap } from './dataFetchers.ts'
import { useEffect, useState } from "react";



export default function OrdersGraph(): JSX.Element {
  const [data, setData] = useState<{ x: string, y: number }[]>()

  useEffect(
    () => {
      ordersDataConvertingToMap().then((response: { x: string, y: number }[]) => {
        setData(response)
      })
    }
    , [])

  return (
    <>
      <div className="md:w-[40vw] max-h-screen min-h-full border rounded m-2 order-1">
        <h1 className=" mt-4 text-2xl text-center">Orders</h1>
        <VictoryChart theme={VictoryTheme.material} height={500} width={1000} padding={{ top: 50, left: 160, right: 100, bottom: 100 }}>
          <VictoryAxis
            tickValues={data?.map((obj: { x: string, y: number }, index: number) => {
              obj;
              return index + 1;
            })}
            tickFormat={data?.map((obj: { x: string, y: number }) => {
              return `${obj.x}`
            })}
            style={
              {
                axisLabel: {
                  fontSize: 20
                }
              }
            }
            label="Orders for the corresponding dates"
            axisLabelComponent={<VictoryLabel dy={30} style={{ fontSize: 25 }} />}
            tickLabelComponent={<VictoryLabel dy={5} />}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x} units`)}
            label={() => ["Number of units", " on that particular date"]}
            style={{
              tickLabels: { fill: "#000000", fontSize: 15 }
            }}
            axisLabelComponent={<VictoryLabel dy={-70} style={{ fontSize: 25 }} />}

          />
          <VictoryLine x="x" y="y" style={{ data: { stroke: "#000000", } }} data={data} />
        </VictoryChart>
      </div>
    </>
  )
}
