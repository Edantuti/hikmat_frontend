import { useState, useEffect, useReducer,Fragment, useMemo } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeAuthentication } from '../../../slice/AuthSlice';
import { useFetch } from '../../../hooks/fetch';

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ExpandedState,
  getExpandedRowModel,
  Row,
} from '@tanstack/react-table';

// const OrderListing = () => {
//   const { data, isLoading } = useFetch<any[]>(`${import.meta.env.VITE_BACKEND}/api/orders/all`)
//   const [orderData, setData] = useState<Order[]>([])
//   console.log(data)

//   useEffect(()=>{
//     if(!data) return
//     const newData:Order[] = data.map((info)=>
//       ({
//         order_id:info.id,
//         product:{
//           name:info.Products[0].name,
//           price:info.amount,
//           quantity:info.quantity,
//         },
//         address:{
//           street:info.address,
//           city:info.city,
//           pincode:info.pincode,
//           state:info.state
//         },
//         deliver:{
//           id:info.dtdcid,
//         },
//         placed_time:{
//           date:info.createdAt
//         }
//       })
//       )
//       setData(newData)
//   },[])

//   const table = useReactTable({
//     orderData,
//     columns,
//     getCoreRowModel:getCoreRowModel()
//   })
//   if (isLoading) {
//     return <h1 className="flex items-center justify-center text-xl">Loading...</h1>
//   }
//   return (
//     <>
//       <section className="m-2">
//         <h1 className="m-2 underline text-xl">Orders:</h1>
//         {/* {data && data.map((order: any) => (
//           <OrderComponent key={order.id} {...order} />
//         ))} */}
//       </section>
//     </>
//   )
// }

// function OrderComponent(props: any) {
//   const [deliverStatus, setDeliverStatus] = useState<boolean>(props.delivered)
//   const [dtdc, setDTDC] = useState<string>(props.dtdcid)
//   const dispatch = useDispatch()

//   async function changeDeliveredStatus(id: string) {
//     const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND}/api/orders/delivered`, { delivered: !deliverStatus }, {
//       params: {
//         id: id
//       },
//       headers: {
//         "Authorization": `Bearer ${Cookies.get("token")}`
//       }
//     })
//     if (data.status === "SUCCESS")
//       setDeliverStatus(!deliverStatus)

//   }
//   function changeDTDC(e: any) {
//     setDTDC(e.target.value)
//   }
//   function submitDTDC(id: string) {
//     axios.patch(`${import.meta.env.VITE_BACKEND}/api/orders/`, { dtdcid: dtdc }, {
//       params: {
//         id: id
//       },
//       headers: {
//         "Authorization": `Bearer ${Cookies.get("token")}`
//       }
//     }).catch((error) => {
//       console.error(error)
//       if (error.response.status === 401) {
//         dispatch(changeAuthentication(false))
//         Cookies.remove("token")
//       }
//     })
//   }
//   return (
//     // <div key={props.id} className={`h-full border my-2 mx-1 p-2 rounded xl:grid grid-cols-[16%_16%_16%_16%_16%_16%] ${props.cancelled && "bg-red-200 "} ${deliverStatus && "bg-green-400"}`}>

//     //   <h1 className="col-span-6">Order id: {props.id}</h1>
//     //   <div className="p-2">
//     //     <p>Product Name: {props.Products[0].name}</p>
//     //     <p>Quantity: {props.quantity}</p>
//     //     <p className="flex items-center my-2"> Price: <FaRupeeSign />{props.amount}</p>
//     //   </div>
//     //   <div className="p-2">
//     //     <p>Contact details</p>
//     //     <p>First Name:{props.User.firstName}</p>
//     //     <p>Email: {props.User.email}</p>
//     //     <p>Mobile: {props.User.phone}</p>
//     //   </div>

//     //   <div className="p-2">
//     //     <p>Address</p>
//     //     <p>{props.address}</p>
//     //     <p>City:{props.city}</p>
//     //     <p>Pincode:{props.pincode}</p>
//     //     <p>State:{props.state}</p>
//     //   </div>
//     //   <div className="">
//     //     <h2>Status:</h2>
//     //     <div>Payment: {props.paymentId}</div>
//     //     <div>Delivered: <input type="checkbox" checked={deliverStatus} disabled={props.cancelled} onChange={() => changeDeliveredStatus(props.id)} /></div>
//     //     <div>Cancelled: <input type="checkbox" defaultChecked={props.cancelled} disabled /></div>
//     //   </div>
//     //   <div className="">
//     //     <h2>DTDC ID:</h2>
//     //     <input type="text" className="inputField w-44" placeholder={dtdc ? dtdc : "Enter the dtdcid"} onChange={(e) => changeDTDC(e)} disabled={props.cancelled} />
//     //     <button type="button" onClick={() => submitDTDC(props.id)} className="bg-white px-2 py-1 mt-1 rounded border hover:bg-gray-200 transition-colors" disabled={props.cancelled}>Submit</button>
//     //   </div>
//     //   <p className="col-span-1">Order placed on: {new Date(props.createdAt).toDateString()}</p>

//     // </div>
//     <table>

//     </table>
//   )
// }

type Address = {
  street: string;
  city: string;
  pincode: number;
  state: string;
}

type ProductL = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  product: ProductL
  address: Address,
  deliver: {
    id: string;
  };
  placed_time: {
    date: string;
  };
};
const orderDummy: Order[] = [
  {
    id: 'testing',
    product: {
      name: 'li',
      quantity: 10,
      price: 10,
    },
    address: {
      street: 'something',
      city: 'something',
      pincode: 100,
      state: 'something',
    },
    deliver: {
      id: 'life',
    },
    placed_time: {
      date: 'life doda',
    },
  },
  {
    id: 'testing',
    product: {
      name: 'li',
      quantity: 10,
      price: 10,
    },
    address: {
      street: 'something',
      city: 'something',
      pincode: 100,
      state: 'something',
    },
    deliver: {
      id: 'life',
    },
    placed_time: {
      date: 'life doda',
    },
  },
];
const OrderListing = () => {
  const rerender = useReducer(() => ({}), {})[1]
  const [data, _] = useState(()=>orderDummy)
  const col = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        id: 'orderid',
        cell: (info) => <span className="px-2">{info.getValue<string>()}</span>,
        header: () => <span className='px-2'>OrderID</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'product',
        id: 'Product',
        header: ({ table }) => {
          return (
            <span className='flex items-center gap-2 px-2'>
              <IoIosArrowDown
                onClick={table.getToggleAllRowsExpandedHandler()}
                className={`${table.getIsAllRowsExpanded() && 'rotate-180'}`}
              />{' '}
              Product
            </span>
          );
        },
        cell: ({ row, getValue }) => {
          return (
            <span className='flex items-center gap-2 px-2'>
              <IoIosArrowDown
                onClick={()=>{row.toggleExpanded()}}
                className={`${row.getIsExpanded() && 'rotate-180'}`}
              />
              {' '} {getValue<ProductL>().name}
            </span>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'address',
        id: 'Address',
        header: ({ table }) => {
          return (
            <span className='flex items-center gap-2 px-2'>
              <IoIosArrowDown
                onClick={table.getToggleAllRowsExpandedHandler()}
                className={`${table.getIsAllRowsExpanded() && 'rotate-180'}`}
              />{' '}
              Address
            </span>
          );
        },
        cell: ({ row, getValue }) => {
          return (
            <span className='flex items-center gap-2 px-2'>
              <IoIosArrowDown
                onClick={()=>{row.toggleExpanded()}}
                className={`${row.getIsExpanded() && 'rotate-180'}`}
              />{' '}
              {getValue<Address>().city}
            </span>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'deliver.id',
        id: 'Delivery',
        header: () => (
          <span className='flex items-center gap-2 px-2'>Delivery</span>
        ),
        cell: (info) => <span className="px-2">{info.getValue<string>()}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'placed_time.date',
        id: 'Placed',
        header: () => (
          <span className='flex items-center gap-2 px-2'>Ordered At</span>
        ),
        cell: (info) => <span className="px-2">{info.getValue<string>()}</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const table = useReactTable<Order>({
    data: data,
    columns: col,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  return (
    <div className=''>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row=>{
              return (
                <Fragment key={row.id}>
                  <tr>
                    {row.getVisibleCells().map(cell=>{
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell,cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr>
                      {/* <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({row})}
                      </td> */}
                      <DemoOrderSubComponent row={row}/>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

const DemoOrderSubComponent = ({ row }: { row: Row<Order> }) =>{
  return (
    <td className="flex gap-10" colSpan={row.getVisibleCells().length}>
      <div>
        <h1 className="text-lg">Product Details</h1>
        <div className="text-sm/6">
          <p>Name:<span>{row.original.product.name}</span></p>
          <p>Quantity:<span>{row.original.product.quantity}</span></p>
          <p>Price:<span>{row.original.product.price}</span></p>
        </div>
      </div>
      <div>
      <h1 className="text-lg">Address Details</h1>
      <div className="text-sm/6">
          <p>Street:<span>{row.original.address.street}</span></p>
          <p>City:<span>{row.original.address.city}</span></p>
          <p>State:<span>{row.original.address.pincode}</span></p>
          <p>Pincode:<span>{row.original.address.pincode}</span></p>
        </div>
      </div>
      <div>
      <h1 className="text-lg">Delivery Details</h1>
      <div className="text-sm/6">
          <p>Delivery ID:<span>{row.original.deliver.id}</span></p>
        </div>
      </div>
      <div>
      <h1 className="text-lg">Time Placed</h1>
      <div className="text-sm/6">
          <p>Date: <span>{row.original.placed_time.date}</span></p>
        </div>
      </div>
    </td>
  )
}

export default OrderListing;
