import { HashLoader } from 'react-spinners';
import AudioPlayer from './AudioPlayer';
import React, { Component } from 'react';
import styled from 'styled-components';
import headingStyle from '../../Styles/ipod.module.css';
import { songList } from '../../Data/song';


const MusicContainer = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:${(props) => props.loading ? 'center' : 'space-between'};
background-color:white;
padding:0;
margin:0;
    border-radius: 11px;

`
const Body = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;

    margin: 12px 0 0 0;
`
const Left = styled.div`
    background-size: cover;
    width: 48%;
    height: 95%;
    background-color: green;
    margin: 3px 0px 0px 6px;
    background-image: url(${(props) => props.url});
    background-position: center;
 box-shadow: 0 0px 19px 1px;
    
`

const Right = styled.div`
    width: 40%;
    height: 95%;
    // background-color: red;

    margin: 3px 6px 0 0px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:2px;
`
const Footer = styled.div`
width:100%;
height:20%;

display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
`
const Heading = styled.h2`
margin:0;
padding:0;
`

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { loading:true };
    }

    componentDidMount() {
        // Simulate initial loading
        this.timer = setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.props.toggleAudioIcon('pause');
    }

    render() {
        const { audioRef, currentSongIndex, isPlaying } = this.props;
        // Safety check to ensure index doesn't go out of bounds of your songList
        const song = songList[currentSongIndex] || songList;

        if (this.state.loading) {
            return (
                <MusicContainer loading={true}>
                    <HashLoader color="#a28484" speedMultiplier={2} />
                </MusicContainer>
            );
        }

        return (
            <MusicContainer loading={false}>
                <Heading>Now Playing</Heading>
                <Body>
                    <Left url={song.poster} />
                    <Right>
                        <h4 className={headingStyle.marginPadding}>{song.name}</h4>
                        <p className={headingStyle.marginPadding}>{song.artist}</p>
                    </Right>
                </Body>
                <Footer>
                    {/* Pass the index and playing state to your visualizer/seekbar */}
                    <AudioPlayer 
                        index={currentSongIndex} 
                        audioRef={audioRef} 
                        isPlaying={isPlaying}  
                    />
                </Footer>
            </MusicContainer>
        );
    }
}