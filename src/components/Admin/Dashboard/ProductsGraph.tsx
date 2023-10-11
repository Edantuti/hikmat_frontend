import {useEffect, useState} from 'react'
import { productsDataConvertingtoMap } from './dataFetchers'
// import {useCookies} from 'react-cookie'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory'
export default function ProductsGraph():JSX.Element{
    const [data,setData] = useState<{x:string,y:number}[]>()
    // const [cookies] = useCookies(['token'])
    
    useEffect(
        ()=>{
            productsDataConvertingtoMap().then((response:{x:string,y:number}[])=>{
                setData(response)
            })
        }
    ,[])
    return (
        <>
            <div className="md:w-[40vw] h-[98%] border rounded m-2 order-3">
                <h1 className="text-2xl text-center mt-4">Products</h1>
                <VictoryChart theme={VictoryTheme.material} height={400} width={800} padding={{top:100, left:100, bottom:100, right:100}} >
                    <VictoryAxis
                        label="Products"
                        axisLabelComponent={<VictoryLabel style={{fontSize:25}} />}
                        tickLabelComponent={<VictoryLabel dy={10} style={{opacity:0}}/>}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x)=>(`${x} units`)}
                        label={()=>["Number of units sold"]}
                        axisLabelComponent={<VictoryLabel dy={-40} style={{fontSize:15 }}/>}
                        />
                    <VictoryBar 
                        alignment="start"
                        x="x" y="y" 
                        labels={({datum})=>datum.xName}
                        style={{labels:{fill:"black"}, data:{fill:"black"}}} 
                        data={data} />
                </VictoryChart>

            </div>
        </>
    )
}