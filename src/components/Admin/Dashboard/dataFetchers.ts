import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
export const getOrderData = async ():Promise<AxiosResponse<any,any>>=>{
    
    return await axios.get("http://localhost:5000/api/orders/all",{
        headers:{
            "Authorization":`Bearer ${Cookies.get('token')}`
        }
    })
}


export const getProductsData = async ():Promise<AxiosResponse<any,any>>=>{
    return await axios.get("http://localhost:5000/api/products",{
        params:{
            limit:1000000
        }
    })
}


export const ordersDataConvertingToMap = async ():Promise<{x:string,y:number}[]>=>{
    const yearMapNumberOfOrders = new Map<string,number>()

    const {data} = await getOrderData()
    for(let order of data.result){
        
        yearMapNumberOfOrders.set(new Date(order.createdAt).toDateString(), (yearMapNumberOfOrders.get(new Date(order.createdAt).toDateString())||0)+1)
    }
    const dateMapArray=[]
    for(let item of yearMapNumberOfOrders){
        dateMapArray.push({x:item[0],y:item[1]})
    }
    dateMapArray.sort((a:any,b:any)=>{
        if(new Date(a.x).getTime() > new Date(b.x).getTime()) return 1
        else return -1
        
    })
    return dateMapArray
}

export const productsDataConvertingtoMap = async ():Promise<{x:string,y:number}[]>=>{
    const productsMapNumberOfOrders = new Map<string,number>()
    const {data} = await getOrderData()
    for(let order of data.result)
        productsMapNumberOfOrders.set(order.Products[0].name,(productsMapNumberOfOrders.get(order.Products[0].name)||0)+1)
    const productsMapArray=[]
    for(let item of productsMapNumberOfOrders){
        productsMapArray.push({x:item[0],y:item[1]})
    }
    return productsMapArray
}