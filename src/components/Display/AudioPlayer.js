import React, { Component } from 'react';
import styled from 'styled-components';

// Import assets (In the final structure, these go in src/assets/...)
import backwardIcon from '../../assets/images/backward.png';
import forwardIcon from '../../assets/images/forward.png';
import pauseIcon from '../../assets/images/pause.png';
import playIcon from '../../assets/images/play.png';

// Import your actual MP3 files
import song1 from '../../assets/music/atsh.mp3';

import song2 from '../../assets/music/Pasoori .mp3';
import song3 from '../../assets/music/song3.mp3'
const ProgressBar = styled.input`
    width: 75%;
    cursor: pointer;
    accent-color: #007aff; /* iPod Blue for the slider */
`;

const Icon = styled.img`
    display: inline-block;
    width: 18px;
    height: 16px;
    margin: 10px 8px 0px 8px;
    opacity: 0.8;
`;

const Audio = styled.audio`
    display: none;
`;

const Timer = styled.div`
    font-size: 0.75rem;
    font-weight: 500;
    color: #333;
    min-width: 35px;
`;

const SeekBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 5px;
`;

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            formattedTime: '0:00',
            endTime: '0:00',
        };
        this.songs = [song1 , song2 , song3];
    }

    componentDidMount() {
        const { audioRef } = this.props;
        if (audioRef.current) {
            const el = audioRef.current;
            el.addEventListener('timeupdate', this.updateCurrentTime);
            el.addEventListener('loadedmetadata', this.updateEndTime);
            el.addEventListener('durationchange', this.updateEndTime);
        }
    }

    componentWillUnmount() {
        const { audioRef } = this.props;
        if (audioRef.current) {
            const el = audioRef.current;
            el.removeEventListener('timeupdate', this.updateCurrentTime);
            el.removeEventListener('loadedmetadata', this.updateEndTime);
            el.removeEventListener('durationchange', this.updateEndTime);
        }
    }

    updateEndTime = () => {
        const { audioRef } = this.props;
        const duration = audioRef.current?.duration;
        if (duration) {
            this.setState({ endTime: this.formatTime(duration) });
        }
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    updateCurrentTime = () => {
        const { audioRef } = this.props;
        const el = audioRef.current;
        if (el && el.duration) {
            const progress = (el.currentTime / el.duration) * 100;
            this.setState({ 
                currentTime: progress, 
                formattedTime: this.formatTime(el.currentTime) 
            });
        }
    }

    handleSeekBarChange = (e) => {
        const percent = parseFloat(e.target.value);
        const { audioRef } = this.props;
        if (audioRef.current) {
            audioRef.current.currentTime = (percent * audioRef.current.duration) / 100;
        }
    }

    render() {
        const { index, audioRef, isPlaying } = this.props;
        const { currentTime, formattedTime, endTime } = this.state;
        
        // Map song based on current index
        const songSource = this.songs[index];

        return (
            <>
                {/* The invisible audio engine */}
                <Audio ref={audioRef} src={songSource} />

                <SeekBar>
                    <Timer>{formattedTime}</Timer>
                    <ProgressBar
                        onChange={this.handleSeekBarChange}
                        type='range'
                        value={currentTime}
                        min={0}
                        max={100}
                    />
                    <Timer>{endTime}</Timer>
                </SeekBar>

                <div style={{ textAlign: 'center' }}>
                    <Icon src={backwardIcon} alt='prev' />
                    <Icon 
                        src={isPlaying ? pauseIcon : playIcon} 
                        alt={isPlaying ? 'pause' : 'play'} 
                        style={{ width: '22px', height: '20px' }} // Make play/pause slightly larger
                    />
                    <Icon src={forwardIcon} alt='next' />
                </div>
            </>
        );
    }
}