/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ListBoxType, ListBoxSize } from './ListBoxPropTypes';
import { usePrefix } from '../../internal/usePrefix';
import ListBoxField from './ListBoxField';
import ListBoxMenu from './ListBoxMenu';
import ListBoxMenuIcon from './ListBoxMenuIcon';
import ListBoxMenuItem from './ListBoxMenuItem';
import ListBoxSelection from './ListBoxSelection';
import { FormContext } from '../FluidForm';

const handleOnKeyDown = (event) => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
};

const handleClick = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * `ListBox` is a generic container component that handles creating the
 * container class name in response to certain props.
 */
const ListBox = React.forwardRef(function ListBox(
  {
    children,
    className: containerClassName,
    disabled,
    type,
    size,
    invalid,
    invalidText,
    warn,
    warnText,
    light,
    isOpen,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const showWarning = !invalid && warn;

  const className = cx({
    [containerClassName]: !!containerClassName,
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--${size}`]: size,
    [`${prefix}--list-box--inline`]: type === 'inline',
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
    [`${prefix}--list-box--expanded`]: isOpen,
    [`${prefix}--list-box--invalid`]: invalid,
    [`${prefix}--list-box--warning`]: showWarning,
  });
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        {...rest}
        className={className}
        ref={ref}
        onKeyDown={handleOnKeyDown}
        onClick={handleClick}
        data-invalid={invalid || undefined}>
        {children}
      </div>
      {isFluid && <hr className={`${prefix}--list-box__divider`} />}
      {invalid ? (
        <div className={`${prefix}--form-requirement`}>{invalidText}</div>
      ) : null}
      {showWarning ? (
        <div className={`${prefix}--form-requirement`}>{warnText}</div>
      ) : null}
    </>
  );
});

ListBox.displayName = 'ListBox';
ListBox.propTypes = {
  /**
   * Provide the contents of your ListBox
   */
  children: PropTypes.node,

  /**
   * Specify a class name to be applied on the containing list box node
   */
  className: PropTypes.string,

  /**
   * Specify whether the ListBox is currently disabled
   */
  disabled: PropTypes.bool.isRequired,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify the text to be displayed when the control is invalid
   */
  invalidText: PropTypes.node,

  /**
   * Specify if the control should render open
   */
  isOpen: PropTypes.bool,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: PropTypes.bool,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSize,

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type: ListBoxType.isRequired,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

ListBox.defaultProps = {
  disabled: false,
  type: 'default',
};

ListBox.Field = ListBoxField;
ListBox.Menu = ListBoxMenu;
ListBox.MenuIcon = ListBoxMenuIcon;
ListBox.MenuItem = ListBoxMenuItem;
ListBox.Selection = ListBoxSelection;

export default ListBox;
