import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {ErrorPage} from './ErrorPage'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    const {name, description, price, imageUrl, id} = this.props.product
    return (
      <div>
        {this.props.product.name ? (
          <div>
            <h2>{name}</h2>
            <h4>{price}</h4>
            <img src={imageUrl} />
            <p>{description}</p>
            <button>
            <Link to={`/products/${id}/update`}>UPDATE PRODUCT</Link>
        </button>
          </div>
        ) : (
          <ErrorPage error={{status: 404, message: 'Not Found'}} />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => {
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)