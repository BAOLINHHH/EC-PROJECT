import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { optionCurrency,transform } from "./money"
const Product = ({product}) => {
  return (
    <Card className="  my-3 p-3 rounded">
        <Link to={ `/product/${product._id}`}>
            <Card.Img src={product.bookImage} variant="top" />
        </Link>
        <Card.Body>
            <Link to={ `/product/${product._id}`}>
                <Card.Title as='div' className="product-title">
                    <strong>{product.bookName} </strong>
                </Card.Title>
            </Link>
            <Card.Text as='h3'>
                {transform(product.bookPrice,optionCurrency)}
            </Card.Text>
            <Card.Text as='div'>
                    <Rating value={product.rating} text={`(${product.bookQuaranty})`} />
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product