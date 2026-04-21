import React, { Component, createRef } from "react";
import Button from "./Controls/ClickWheel";
import Display from "./Display/Screen";
import ipodImage from '../assets/images/ipod.png'; // Ensure this path is correct
import { menuData } from "../Data/menuData";
import { calculateAngle } from "../utils/navigationHelper";
import styles from '../Styles/ipod.module.css'

class Ipod extends Component {
    constructor() {
        super();
        this.state = {
            //Navigate 
            menuStack: [menuData],//stack of menu options for "back" functionality
            cursor: 0,//current highlighted menu item

            //View
            screenMode: "MENU",
            activeContent: null,

            //Media States
            isPlaying: false,
            currentSongIndex:0,
            totalSongs: 3,

            //Interaction
            prevAngle: 0
        };
        this.audio = createRef();
    }

    componentDidMount() {
        this.setState({
            list: this.options,
            data: { title: '', content: null }
        });

    }
    handleWheelMove = (e) => {

        const { prevAngle, screenMode, menuStack, cursor } = this.state;

        if (screenMode !== "MENU") return; //mouse wheel work only in list mode

        const wheelElm = e.currentTarget;
        const currentAngle = calculateAngle(e.clientX, e.clientY, wheelElm);

        let delta = currentAngle - prevAngle;


        //+ve delta => clockwise movement , curser move down(upto 180 deg)
        //-ve delta => anti-clockwise movement curser move up (upto 180 deg)
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const threshold = 35
        const currentMenu = menuStack[menuStack.length - 1];
        const listLength = currentMenu.children.length;
        if (Math.abs(delta) > threshold) {
            if (delta > 0) {
                //cw
                this.setState({
                    cursor: (cursor + 1) % listLength,
                    prevAngle: currentAngle
                })
            }
            else {
                //acw
                this.setState({
                    cursor: (cursor - 1 + listLength) % listLength,
                    prevAngle: currentAngle
                })
            }
        }

    };


    // This is the handler for the CENTER (Select) button
    handleClick = () => {
        const { screenMode, menuStack, cursor } = this.state;

        // CASE A: We are in the Player/App - Center button behaves as Play/Pause
        if (screenMode === "CONTENT") {
            this.handlePlayPause();
            return;
        }

        // CASE B: We are in a Menu - Center button navigates
        const currentMenu = menuStack[menuStack.length - 1];
        const selectedItem = currentMenu.children[cursor];

        // If the list is empty or item doesn't exist, show the "Empty/Loader" state
        if (!selectedItem || (selectedItem.type === "list" && selectedItem.children.length === 0)) {
            this.setState({
                screenMode: "CONTENT",
                activeContent: "empty" // You can render a logo or loader here
            });
            return;
        }

        if (selectedItem.type === "list") {
            this.setState({
                menuStack: [...menuStack, selectedItem],
                cursor: 0
            });
        } else if (selectedItem.type === "content") {
            this.setState({
                screenMode: "CONTENT",
                activeContent: selectedItem.content
            });
        }
    };

    //top button navigation
    handleMenuButton = () => {
        const { screenMode, menuStack } = this.state;

        // If in App/Empty state, go back to the current menu
        if (screenMode === "CONTENT") {
            this.setState({ screenMode: "MENU" });
        }
        // If in a Sub-menu, go back to the Parent menu
        else if (menuStack.length > 1) {
            const newStack = [...menuStack];
            newStack.pop();
            this.setState({ menuStack: newStack, cursor: 0 });
        }
    };

    //right button navigation
    handleForward = () => {
        if (this.state.screenMode === "CONTENT") {
            if (this.state.activeContent === "music") {
                this.nextSong(); // Only works if we are in the player
            }
            return;
        }
    };

    //left button navigation
    handleBackward = () => {


        if (this.state.screenMode === "CONTENT") {
            if (this.state.activeContent === "music") {
                this.prevSong();

            }
            return;
        }
    };

    //bottom button navigation
    handlePlayPauseButton = () => {

        // This button works globally or specifically in content mode
        if(this.state.screenMode === "CONTENT"){
            if(this.state.activeContent === "music"){
            this.handlePlayPause();

            }
        }
        return
    };

handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (this.audio.current) {
        if (isPlaying) {
            this.audio.current.pause();
        } else {
            this.audio.current.play();
        }
        
        // Just flip the boolean
        this.toggleAudioIcon();
    }
}
    toggleAudioIcon = (action='')=>{
    const { isPlaying } = this.state;

        if(action){
            this.setState({isPlaying:false});
        }
        else{
        this.setState({ isPlaying: !isPlaying });

        }
    }

    buttonClick = () => {
        this.setState({
            list: this.options,
            show: false,
            disableMouseMove: false,
            data: { title: '', content: null }
        });
    }

    // AUDIO PLAYER
    playAudio = () => {

        if (this.audio.current) {
            this.audio.current.play();
        }
        this.setState({
            isPlaying:true
        })
    }



    stopAudio = () => {
        if (this.audio.current) {
            this.audio.current.pause();
            this.audio.current.currentTime = 0;//reset song time
        }
        this.setState({
            isPlaying: false,
            currentSongIndex:0//reset the player , jump back to first song
        });
    }
    nextSong = () => {
        this.setState((prevState) => ({
            // Wrap around logic: (0 + 1) % 3 = 1; (2 + 1) % 3 = 0
            currentSongIndex: (prevState.currentSongIndex + 1) % prevState.totalSongs,
            isPlaying: true
        }), () => {
            // Callback: Play the new song immediately after state update
            if (this.audio.current) {
                this.audio.current.play();
            }
        });
    }

    prevSong = () => {
        this.setState((prevState) => ({
            // Wrap around logic for backward: (0 - 1 + 3) % 3 = 2
            currentSongIndex: (prevState.currentSongIndex - 1 + prevState.totalSongs) % prevState.totalSongs,
            isPlaying: true
        }), () => {
            // Callback: Play the new song immediately
            if (this.audio.current) {
                this.audio.current.play();
            }
        });
    }


getCurrentMenu = () => {
    const { menuStack } = this.state;
    return menuStack[menuStack.length - 1]; // Returns the current active menu object
};



render() {
    const { 
        cursor, 
        screenMode, 
        activeContent, 
        isPlaying, 
        currentSongIndex, 
        totalSongs 
    } = this.state;

    const currentMenu = this.getCurrentMenu();

    return (
        <div className={styles.ipod}>
            {/* The physical body of the iPod */}
            <img src={ipodImage} alt="ipod" className={styles["ipod-image"]} />
            <img src={ipodImage} alt="ipod-reflection" className={styles["reflection-image"]} />

            {/* 1. DISPLAY COMPONENT: The "Eyes" */}
            <Display
                screenMode={screenMode}      // "MENU" or "CONTENT"
                menuTitle={currentMenu.title} // e.g., "Music" or "Settings"
                list={currentMenu.children}  // The current sub-menu array
                cursor={cursor}              // Highlighted index
                activeContent={activeContent}// e.g., 'music', 'game', 'empty'
                
                // Media props
                isPlaying={isPlaying}
                toggleAudioIcon = {this.toggleAudioIcon}
                currentSongIndex={currentSongIndex}
                totalSongs={totalSongs}
                audioRef={this.audio}
            />

            {/* 2. BUTTONS/CLICKWHEEL: The "Hands" */}
            <Button
                // Navigation
                onMenuClick={this.handleMenuButton}
                onCenterClick={this.handleClick}
                onWheel={this.handleWheelMove}
                
                // Media Controls
                onPlayPause={this.handlePlayPauseButton}
                onNext={this.handleForward}
                onPrev={this.handleBackward}
                
                // Context-awareness (to disable wheel in content mode)
                isContentMode={screenMode === "CONTENT"}
            />
        </div>
    );
}
}

export default Ipod;
