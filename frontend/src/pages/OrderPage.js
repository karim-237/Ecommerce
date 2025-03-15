import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment from 'moment'


const OrderPage = () => {

  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    }
    )

    const responseData = await response.json()
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
                <p className='font-semibold text-lg '>{moment(item.createdAt).format('LL')}</p>
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
                                  <p>Quantity: {product.quantity} piece(s)</p>
                                </div>
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
                        <p className='ml-1'>Payment Status: {item.paymentDetails.payment_status}</p>
                      </div>

                    </div>
                  </div>
                  <div className='font-semibold ml-auto w-fit lg:text-lg'>
                    Total Amount : {item.totalAmount} FCFA
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default OrderPage
