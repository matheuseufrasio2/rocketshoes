import Image from 'next/image'
import Link from 'next/link'

import { connect } from 'react-redux'

import { MdShoppingBasket } from 'react-icons/md'

import styles from "./styles.module.scss"

import logo from "../../assets/img/logo.svg"

function Header({ cartSize }) {
  return (
    <div className={styles.container}>
      <Link passHref href="/">
        <a>
          <Image src={logo} alt="RocketShoes" />
        </a>
      </Link>

      <Link href="/cart">
        <a className={styles.cart}>
          <div>
            <strong>Meu carrinho</strong>
            <span>{cartSize} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#fff" />
        </a>
      </Link>
    </div>
  );
}

export default connect(state => ({
  cartSize: state.cart.length
}))(Header)