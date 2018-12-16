import React from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'

import styles from './NavigationItem.module.css'

export default function NavigationItem(props) {
  return (
    <NavItem>
      <NavLink tag={RRNavLink} to={props.link} activeClassName={styles.active} exact={props.exact}>
        {props.children}
      </NavLink>
    </NavItem>
  )
}
