import React, { Component } from "react";
import styled from 'styled-components';
import Menu from "./Menu";

const MenuBox = styled.div`
  position: relative;
  height: 100%;
  width: 50%; /* Standard iPod menu width */
  background-color: white;
  padding: 0;
  margin: 0;
  border-radius: 10px 0 0 10px;
  border-right: 1px solid #d1d1d1;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.h1`
  font-size: 1.2rem;
  padding: 10px;
  margin: 0;
  background: linear-gradient(to bottom, #f3f3f3, #dcdcdc);
  border-bottom: 1px solid #b5b5b5;
`;

const OptionsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export default class MenuList extends Component {
  render() {
    const { title, items, activeIndex } = this.props;

    return (
      <MenuBox>
        {/* Dynamic Header based on the menu title (e.g., "iPod" or "Music") */}
        <MenuHeader>{title || "iPod"}</MenuHeader>
        
        <OptionsWrapper>
          {items.map((item, index) => (
            <Menu 
              key={index} 
              option={item.title} 
              /* Highlight the item if its index matches the cursor (activeIndex)
              */
              active={activeIndex === index} 
            />
          ))}
        </OptionsWrapper>
      </MenuBox>
    );
  }
}