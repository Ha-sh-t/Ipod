import React, { Component } from "react";
import styled from "styled-components";

// The individual row in the menu list
const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  width: 100%;
  box-sizing: border-box;
  
  /* Change appearance based on the 'active' prop */
  background-color: ${(props) => (props.active ? "#007aff" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "500")};
  
  /* Subtle border to separate items */
  border-bottom: 1px solid #f0f0f0;

  span {
    font-size: 14px;
  }
`;

const Arrow = styled.span`
  font-weight: bold;
  /* Only show the arrow if it's the selected item */
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
`;

export default class Menu extends Component {
  render() {
    const { option, active } = this.props;

    return (
      <MenuItem active={active}>
        <span>{option}</span>
        {/* The classic '>' arrow on the right side of the selected menu item */}
        <Arrow active={active}>&gt;</Arrow>
      </MenuItem>
    );
  }
}