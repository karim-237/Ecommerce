import React, { useEffect, useState } from 'react'
import new_badge from '../assest/new_badge.gif'
import delivery from '../assest/delivery.gif'
import SummaryApi from '../common'
import moment from 'moment'
import ROLE from '../common/role'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




const OrderPageAdmin = () => {

   const navigate = useNavigate()

  const handleconfirm = async (e, id) => {
    e.preventDefault()

    const response = await fetch(SummaryApi.updateOrder.url, {
      method: SummaryApi.updateOrder.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        { _id: id }
      )


    })

    const responseData = await response.json()
    
        if(responseData.success){
            toast.success(responseData.message)
            window.location.reload(false)

        }
    
        if(responseData.error){
            toast.error(responseData.message)
        }
    
    
        return responseData

        
  }


  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: 'include'
    }
    )

    const responseData = await response.json()

    console.log("order-list", responseData)

    setData(responseData.data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])
  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available</p>
        )
      }
      <div className='p-4 w-full'>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId + index}>
                <p className='font-semibold text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded'>
                  <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='grid gap-1'>
                      {
                        item?.productDetails.map((product, index) => {
                          return (


                            <div key={product.productId + index} className='flex gap-3 bg-slate-100'>

                              <img
                                src={product.image[0]}
                                className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                              />

                              {
                                item?.seen === ROLE.SEEN && (
                                  <div className='-ml-12 -mt-3'>
                                    <img
                                      src={new_badge}
                                      width={50}
                                      height={40}

                                    />
                                  </div>
                                )
                              }

                              <div className=''>
                                <div
                                  className='font-medium text-lg text-ellipsis line-clamp-1 flex'
                                >
                                  {product.name}
                                </div>

                                <div className='flex items-center gap-5 mt-1'>
                                  <div className='text-lg text-red-500'>
                                    {product.price} FCFA
                                  </div>
                                  <p>Quantity: {product.quantity},</p>
                                </div>
                                <p className='font-semibold text-lm'>Customer Name: {item.name},</p>
                                <p className='font-semibold text-lm'>Customer Email: {item.email}</p>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>

                    <div className='flex flex-col lg:flex-row gap-4 p-2 min-w-[300px]'>
                      <div>
                        <div className='text-lg font-medium'>
                          Payment Details :
                        </div>
                        <p className='ml-1'>Payment Method: {item.paymentDetails.payment_method_type[0]}</p>

                      </div>

                    </div>
                  </div>

                  <div className='w-fit ml-auto mr-10 -mt-10'>
                    {
                      item?.seen === !ROLE.SEEN && (
                        <div className=''>
                          <img
                            src={delivery}
                            width={80}
                            height={60}

                          />
                        </div>
                      )
                    }
                  </div>
                  <div className='font-semibold ml-auto w-fit lg:text-lg'>

                    Total Amount : {item.totalAmount} FCFA
                  </div>
                  {
                    item?.seen === ROLE.SEEN && (
                      <div className='font-semibold ml-auto w-fit p-2'>
                        <button className=' px-3 py-1  text-white bg-green-500 hover:bg-green-700 mr-10' onClick={(e) => handleconfirm(e, item?._id)}>Confirm & Delivery</button>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default OrderPageAdmin
