import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { optionCurrency,transform } from './money';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();
    console.log(products)
    return isLoading ? null : error ? (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
      <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.bookImage} alt={product.bookName} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2 className='text-black text-right'>
                  {product.bookName} ({transform(product.bookPrice,optionCurrency)})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    );
}

export default ProductCarousel