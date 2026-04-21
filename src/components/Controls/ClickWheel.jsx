import { Component } from "react";
import styled from "styled-components";
const Ring1 = styled.div`
    position:absolute;
    width: 198px;
    height: 182px;
    border-radius: 50%;
    // border:1px solid;
    left: 17%;
    top: 61.5%;
    opacity: 1;  
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:3;

`;

const Ring2 = styled.div`
    position: relative;
    width: 85px;
    height: 80px;
    border-radius: 50%;
    // border:1px solid;
    opacity: 1;
    margin: 0;
    padding: 0;
    pointer-events: all;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    width: 55px;
    height: 51px;
    // border:1px solid;

    border-radius: 50%;
    cursor: pointer;
    
    &:active {
        background-color: rgba(135, 142, 133, 0.23); 
    }
`;

const Button1 = styled(ButtonWrapper)`
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    // border:1px solid;

`;

const Button2 = styled(ButtonWrapper)`
    top: 50%;
    left: 100%;
    transform: translate(-100%, -50%);
    // border:1px solid;

`;

const Button3 = styled(ButtonWrapper)`
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);

    // border:1px solid;


`;

const Button4 = styled(ButtonWrapper)`
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    // border:1px solid;

`;




export default class Button extends Component {
    render() {
        const { 
            onMenuClick,      // Top Button (Button1)
            onNext,           // Right Button (Button2)
            onPlayPause,      // Bottom Button (Button3)
            onPrev,           // Left Button (Button4)
            onCenterClick,    // Center Ring (Ring2)
            onWheel,          // Mouse Move on the outer ring
            isContentMode,   // To decide if wheel should be active
            
        } = this.props;
     
        return (
            /* The outer ring acts as the "Scroll Wheel". 
               We disable rotation if we are in 'CONTENT' mode (e.g., inside an app).
            */
            <Ring1 onMouseMove={!isContentMode ? onWheel : null}>
                
                {/* MENU BUTTON (Top) */}
                <Button1 onClick={onMenuClick} title="Menu" />
                
                {/* NEXT SONG / FORWARD (Right) */}
                <Button2 onClick={onNext} title="Next" />
                
                {/* PLAY-PAUSE (Bottom) */}
                <Button3 onClick={onPlayPause} title="Play/Pause" />
                
                {/* PREV SONG / BACKWARD (Left) */}
                <Button4 onClick={onPrev} title="Previous" />
                
                {/* CENTER SELECT BUTTON (Center) 
                    stopPropagation prevents the wheel logic from firing when clicking the center
                */}
                <Ring2 
                    onMouseMove={(e) => e.stopPropagation()} 
                    onClick={onCenterClick} 
                />
            </Ring1>
        );
    }
}

