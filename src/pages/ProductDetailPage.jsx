import { useParams } from 'react-router-dom'

function ProductDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
      <div>
        <p>Product images, description, and specifications will be displayed here</p>
      </div>
    </div>
  )
}

export default ProductDetailPage
