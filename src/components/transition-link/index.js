import React, { useContext, useCallback } from 'react'
import { Link } from 'gatsby'

import { LayoutContext } from '../../layouts/layoutContext'
import { TRANSITION_STATES } from '../../utils/constants'

const TransitionLink = ({ to, children, ...props }) => {
  const { dispatch } = useContext(LayoutContext);

  const handleClick = useCallback(e => {
        e.preventDefault();

        const location = window.location.pathname;
        if (location === path) return;

        dispatch({
          type: 'transition.changePage',
          transitionState: TRANSITION_STATES[`leaving`],
          transitionPath: to,
          inTransition: true,
        })
      },
      [dispatch, path]
  );

  return (
    <Link to={path} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}

export default TransitionLink;
