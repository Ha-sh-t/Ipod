
export const calculateAngle = (clientX , clientY , wheelElm)=>{

    //get center of wheel
    const rect = wheelElm.getBoundingClientRect();

    const wheelX = rect.left + rect.width/2;
    const wheelY = rect.top + rect.height/2;


    //calculating coordinates relative to wheel center
    const x = clientX-wheelX;
    const y = clientY - wheelY;

    //using atan2 , since it can handle division by zero
    let angle = Math.atan2(-y, x) * (180 / Math.PI); //-y because in browser moving down y mag increase but in -ve

    //normalize angle
    if(angle < 0) angle += 360;

    return angle;
}