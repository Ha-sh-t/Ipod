import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';
import styled from 'styled-components';
import coverFlowImage from './../../assets/images/coverFlow.png';
import gameImage from './../../assets/images/game.png';
import settingImage from '../../assets/images/settings.png'
import albumImage from '../../assets/images/album.png'
import MusicPlayer from './MusicPlayer';



export default class Content extends Component {
    render() {
        const { 
            activeContent, 
            audioRef, 
            currentSongIndex, 
            isPlaying,
        } = this.props;


        // 1. Handle the Music Player App
        if (activeContent === 'music') {
            return (
                <MusicPlayer 
                    audioRef={audioRef} 
                    currentSongIndex={currentSongIndex} 
                    isPlaying={isPlaying} 
                    toggleAudioIcon = {this.props.toggleAudioIcon}
                />
            );
        }

        // 2. Handle the "Static" Apps (Games, Settings, Coverflow)
        let imageSrc;
        let title;

        switch (activeContent) {
            case 'coverFlow':
                imageSrc = coverFlowImage;
                title = "Coverflow";
                break;
            case 'game':
                imageSrc = gameImage;
                title = "Games";
                break;
            case 'setting':
                imageSrc = settingImage;
                title = "Settings";
                break;
            case 'empty':
                title = "No Content";
                break;
            case 'album':
                imageSrc=albumImage;
                title="Albums";
                break;
            default:
                imageSrc = null;
        }

        return (
            <Image>
                {imageSrc ? (
                    <>
                        <Img src={imageSrc} alt={title} />
                        <BarLoader color="#031d17" width={55} speedMultiplier={2} />
                        <Title>{title}</Title>
                    </>
                ) : (
                    <Title>{title}</Title>
                )}
            </Image>
        );
    }
}

const Image = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  background-color:white;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  display:inline-block;
  margin-bottom:10px;
`;

const Title = styled.p`
text-align:center;
font-size:larger;
font-weight:700;
margin:0;
padding:0;
margin-top:10px;

`