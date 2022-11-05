

import React from "react";
import { Fade } from "react-reveal";


function Features() {

    return (
        <div>
            <div className='container'>
                <div className="text_side">
                  <div className="main_text">
                        <h1>A better way
                        <br></br>
                        to stay <br></br>connected</h1>
                    </div>
                    <div className= "small_text2">
                        <Fade top duration={1500}>
                          <p>Messenger brings you <br></br>closer to your favourite people.</p>
                        </Fade>
                    </div>
                </div>
                <div className="image_sidem">
                    <Fade right duration={1500}>
                        <img src='' />
                    </Fade>
                </div>
            </div>

            <div className="container">
                <div className="image_side2">
                    <Fade left duration={1500} delay={300}>
                        <img src='' />
                    </Fade>
                </div>
                <div className="text_side2">
                    <div className="min-text">
                        <h3>Custom Reactions</h3>
                    </div>
                    <div className="main_text2  main_text2_light">
                        <h1>Say it with
                        <br></br>
                        any <span style={{ color: 'rgb(133, 29, 186)' }}>emoji</span></h1>
                    </div>
                    <div className="small_text2">
                        <Fade top duration={1500} delay={300}>
                          <p>Customize your REACTIONS. <br></br> Why write when you have so many emojis to choose from. Including 🎉 and 🔥 </p>
                        </Fade>
                    </div>
                </div>
            </div>


            <div className="container_light">
                <div className="text_side">
                    <div className="min-text">
                        <h3>Chat Themes</h3>
                    </div>
                    <div className="main_text2  main_text2_light">
                        <h1>Your <span style={{ color: 'rgb(133, 29, 186)' }}>chats</span>
                            <br></br>
                         Your way</h1>
                    </div>
                    <div className="small_text2">
                        <Fade top duration={1500} delay={300}>
                          <p>What do you choose? Light or Dark <br></br> Comfort you eyes with the NEW Dark theme. Switch anytime.  ❤️ 🏳️‍🌈</p>
                        </Fade>
                    </div>
                </div>
                <div className="image_side7">
                    <Fade right duration={1500} delay={300}>
                        <img src='' />
                    </Fade>
                </div>
                <div className="image_side7_2">
                    <Fade right duration={1500} delay={300}>
                        <img src='' />
                    </Fade>
                </div>
            </div>

            <div className='container'>
                <div className="image_side2">
                    <Fade left duration={1500} delay={300}>
                        <img src=''/>
                    </Fade>
                </div>
                <div className="text_side2">
                    <div className="min-text">
                        <h3>Voice Input</h3>
                    </div>
                    <div className="main_text2 main_text2_light">
                        <h1>Stop typing,
                        <br></br>
                      Start <span style={{ color: 'rgb(133, 29, 186)' }}>talking!</span></h1>
                    </div>
                    <div className="small_text2">
                        <Fade top duration={1500} delay={300}>
                          <p>Why bother to type when you can talk? <br></br> Try the vioice input NOW 🔥 </p>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;