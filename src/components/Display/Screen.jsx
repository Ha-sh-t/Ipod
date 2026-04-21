import React, { Component } from "react";
import styled from 'styled-components';
import MenuList from "./MenuList";
import Content from "./Content"; // This will act as your "App Router"
import bgImage from "../../assets/images/backbround.jpeg"
const DisplayDiv = styled.div`
position:relative;
    width: 258px;
    height: 284px;
    position: absolute;
    border: 1px solid #000;
    top: 3%;
    left:7%;
    border-radius: 11px;
    background-color: #fff;
    background-image: url(${props => props.bgImage || 'none'});
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden; /* Ensure content doesn't spill out of rounded corners */
    z-index:2;
`;

export default class Display extends Component {
    render() {
        const { 
            screenMode, 
            menuTitle, 
            list, 
            cursor, 
            activeContent, 
            audioRef, 
            currentSongIndex, 
            isPlaying 
        } = this.props;
        return (
            <DisplayDiv bgImage={bgImage}>
                {/* 1. MENU MODE: Show the list-based navigation 
                */}
                {screenMode === "MENU" && (
                    <MenuList 
                        title={menuTitle} 
                        items={list} 
                        activeIndex={cursor} 
                    />
                )}

                {/* 2. CONTENT MODE: Show the App/Player 
                */}
                {screenMode === "CONTENT" && (
                    <Content 
                        activeContent={activeContent}
                        audioRef={audioRef}
                        currentSongIndex={currentSongIndex}
                        isPlaying={isPlaying}
                        toggleAudioIcon = {this.props.toggleAudioIcon}
                    />
                )}
            </DisplayDiv>
        );
    }
}