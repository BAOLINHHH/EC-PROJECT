import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { optionCurrency,transform } from './money';
import slider1 from '../imageshome/slider1.jpg'
import slider2 from '../imageshome/slider2.jpg'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductCarousel = () => {
  
    // const { data: products, isLoading, error } = useGetTopProductsQuery();
    // return isLoading ? null : error ? (
    //   <Message variant='danger'>{error?.data?.message || error.error}</Message>
    // ) : (
    //   <Carousel pause='hover' className='bg-primary mb-4'>
    //     {products.map((product) => (
    //       <Carousel.Item key={product._id}>
    //         <Link to={`/product/${product._id}`}>
    //           <Image src={product.bookImage} alt={product.bookName} fluid />
    //           <Carousel.Caption className='carousel-caption'>
    //             <h2 className='text-black text-right'>
    //               {product.bookName} ({transform(product.bookPrice,optionCurrency)})
    //             </h2>
    //           </Carousel.Caption>
    //         </Link>
    //       </Carousel.Item>
    //     ))}
    //   </Carousel>
    // );
    return (
      <>
      <section className="my-9">
        <div className="container">
        <Swiper navigation={true}  modules={[Navigation]}>
          <SwiperSlide>
          <div className="relative">
          <Image src={slider1}/>
            <div className=" absolute top-[25%] left-[10%]  " >
              <h1 className="text-[40px] capitalize leading-[1.5] text-[#ffff]">Đa dạng các loại sách</h1>
              
              <p className="text-[20px] mt-3 capitalize leading-[1.2] font-[400] "> Giá cả ưu đãi chỉ từ 55.000 đ</p>
              <div className="mt-3 text-[#ffff] border-[2px] border-[#d6681b] border-solid rounded-[5px] h-[50px] w-[90px] flex justify-around bg-[#f07c29] hover:bg-[#0a0909]">
                <button>Mua Ngay</button>
              </div>
            </div>
          </div>  
          </SwiperSlide>
          <SwiperSlide>
          <div className="relative">
          <Image src={slider2}/>
            <div className=" absolute top-[25%] left-[10%]  " >
              <h1 className="text-[40px] capitalize leading-[1.5] text-[#ffff]">Đa dạng các loại bìa sách </h1>
              <p className="text-[20px] mt-3 capitalize leading-[1.2] font-[400] "> Dễ dàng đặt hàng</p>
              <div className="mt-3 text-[#ffff] border-[2px] border-[#d6681b] border-solid rounded-[5px] h-[50px] w-[90px] flex justify-around bg-[#f07c29] hover:bg-[#0a0909]">
                <button>Mua Ngay</button>
              </div>
            </div>
          </div>
          </SwiperSlide>
        </Swiper>
        </div>
      </section>
      </>
    )
}

export default ProductCarousel