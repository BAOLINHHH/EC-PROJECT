import React from 'react'
import SidebarUser from './SidebarUser';
const AddressScreen = () => {
  return (
    <>
      <section className="py-3">
        <div className="container ">
        <div className=" flex gap-[60px]">
                <div className="w-[280px] shadow-[1px_1px_7px_rgba(#00000029)] ">
                    <SidebarUser/>
                </div>
                <div className=" border-solid border-[1px] rounded-[6px] w-full bg-[#fff] shadow-[1px_1px_7px_rgba(#00000029)] ">
                  <div className="px-[10px] py-[5px]">
                        <div className='w-full mb-[10px] flex items-center justify-between'>
                            <h1 className="font-[600] text-[20px] p-[10px]"> Sổ địa chỉ giao hàng</h1>
                            <span className="cursor-pointer text-[#6131db]">
                              +
                              <span className="pl-2 text-[17px] ">
                                Thêm dịa chỉ mới
                              </span>
                            </span>
                        </div>
                        <div className="px-3 flex justify-between">
                          <div >
                            <div className="flex mb-[4px]">
                            <span className="font-[600]">Doan bao linh</span>
                            <div className="border-solid border-r-[2px] border-[#ddd] mx-[8px]"></div>
                            <span className="font-[600]">0328548518</span>
                            </div>
                            <div>
                            <span>khu pho 1</span>
                            </div>
                            <div>
                            <span>thi tran vam lang, huyen go cong dong, tinh tien giang</span>
                            </div>
                          </div>
                          <p className='text-[16px] text-[#c03427]'> Sửa</p>
                        </div>
                        <hr className="mt-[10px] mb-[5px]"/>
                  </div>
                        {/* <div className="row flex justify-evenly">
                                  <div className="card col-4 p-4  "> */}
                                      {/* <div className=" border-[1px] border-solid rounded-[5px] flex flex-row items-center">
                                        <Radio size="small"/>
                                        <span className="pr-2"><img className="w-[19px]" src={logoHome} /></span>
                                        <p className="text-[19px] leading-[28px] capitalize"> Nhà </p>
                                      </div> */}
                                      {/* <address className="my-2">
                                        <strong className="text-[17px] leading-[28px]"> bao linh</strong>
                                        <p className="text-[17px] leading-[28px]">khu pho</p>
                                        <p className="text-[17px] leading-[28px]">thi tran vam lang</p>
                                        <p className="text-[17px] leading-[28px]">huynh go cong dong</p>
                                        <p className="text-[17px] leading-[28px]">tienh tien giang</p>
                                        <p className="text-[17px] leading-[28px]">03582555222</p>
                                      </address>
                                      <div className="flex gap-x-5">
                                        <span className="text-[#21313c] "  type='button'>Chỉnh sửa</span>
                                        <span className="text-danger "  type='button'>Xóa</span>
                                      </div>
                                  </div> */}
                                  {/* <div className="card col-4 p-4 "> */}
                                      {/* <div className=" border-[1px] border-solid rounded-[5px] flex flex-row items-center">
                                        <Radio size="small"/>
                                        <span className="mr-2"><img className="w-[18px]" src={logoOffice} /></span>
                                        <p className="text-[18px] leading-[28px] capitalize"> Văn phòng </p>
                                      </div> */}
                                      {/* <address className="my-2">
                                        <strong className="text-[17px]  capitalize leading-[28px]"> bao linh</strong>
                                        <p className="text-[17px] leading-[28px]">khu pho</p>
                                        <p className="text-[17px] leading-[28px]">thi tran vam lang</p>
                                        <p className="text-[17px] leading-[28px]">huynh go cong dong</p>
                                        <p className="text-[17px] leading-[28px]">tienh tien giang</p>
                                        <p className="text-[17px] leading-[28px]">03582555222</p>
                                      </address>
                                      <span className='text-danger' type='button'>Sua</span>
                                  </div>
                                </div> */}
                </div>

        </div>
          
        </div>
        </section>
    </>
  )
}

export default AddressScreen