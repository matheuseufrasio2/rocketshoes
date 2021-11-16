import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Image from 'next/image'

import styles from '../styles/pages/home.module.scss'

import { MdAddShoppingCart } from 'react-icons/md'

import api from '../services/api';
import { formatPrice } from '../utils/format';
import * as CartActions from '../store//modules/cart/actions';

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get("products");

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))

    this.setState({ products: data });
  }

  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id)
  }

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ul className={styles.productList} >
        {
          products.map(product => (
            <li key={product.id}>
              <Image
                src={product.image}
                alt={product.title}
                width={1000}
                height={1000}
                priority
              />

              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
                <div>
                  <MdAddShoppingCart size={16} color="#fff" /> {amount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          ))
        }

      </ul>
    )
  }
}

const mapStateToProps = state => ({
  amount: state.cart.length > 0 ? (state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})) : 0
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)