import React from "react";
import "./homepage.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";


const Homepage = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <section className='contact-form' id="Achieve">
            <h1 class="heading">
                <span>C</span>
                <span>H</span>
                <span>I</span>
                <span>T</span>
                <span className="space"></span>
                <span>C</span>
                <span>H</span>
                <span>A</span>
                <span>T</span>
                <span className="space"></span>
                <span>A</span>
                <span>P</span>
                <span>P</span>

            </h1>

            <div className="project-us-container" >


            <div className="project-us-detail">


<div className="image1">
    <img src="/images/chatui.jpg" alt="a"  data-aos="fade-left"></img>

</div>




<div className="project-myself">
    <div className="title_flex" data-aos="zoom-in-down" >
       
     
        <h1 style={{backgroundImage: "linear-gradient(83.84deg,#08f -6.87%,#a033ff 26.54%,#ff5c87 58.58%)",webkitBackgroundClip: "text"
            ,webkitTextFillColor:"transparent",fontSize:'60px'}}>
         A Better 
         <br></br>
          Way 
          <br></br>
          to get Connected
        
            </h1>
            <p style={{fontSize:'25px'}}>Share messages with friend<br></br> and<br></br> enjoy chats freely</p>
    </div>

</div>



</div>
                <div className="project-us-detail" >


                    <div className="image"   >
                        <img src="/images/emoji.jpg" alt="a" data-aos="fade-right"></img>

                    </div>





                    <div className="project-myself">
                        <div className="title_flex" data-aos="zoom-in-down" >
                            <h1 className="heading">
                                <span>C</span>
                                <span>U</span>
                                <span>S</span>
                                <span>T</span>
                                <span>O</span>
                                <span>M</span>
                                <span className="space"></span>
                                <span>R</span>
                                <span>E</span>
                                <span>A</span>
                                <span>C</span>
                                <span>T</span>
                                <span>I</span>
                                <span>O</span>
                                <span>N</span>
                            </h1>

                            <h1>Say it with
                                any
                                <br></br>
                                <span style={{ color: 'rgb(133, 29, 186)' }}>emoji</span>
                                </h1>
                            <p style={{ fontSize: '30px' }}>

                                Customize your REACTIONS.
                                Why write when you have so many emojis to choose from. Including 🎉 and 🔥</p>
                        </div>

                    </div>



                </div>
                <div className="project-us-detail">


                    <div className="image1">
                        <img src="/images/chatui.jpg" alt="a" data-aos="fade-left"></img>

                    </div>




                    <div className="project-myself">
                        <div className="title_flex" data-aos="zoom-in-down" >
                           
                            <h1 className="heading">
                                <span>V</span>
                                <span>O</span>
                                <span>I</span>
                                <span>C</span>
                                <span>E</span>
                                <span>I</span>
                                <span className="space">  </span>
                                <span>N</span>
                                <span>P</span>
                                <span>U</span>
                                <span>T</span>
                                <span>T</span>
                                
                            </h1>
                            <h1>
                            Stop typing,
                                Start
                                <br></br> 
                              
                            <span style={{ color: 'rgb(133, 29, 186)' }}>talking</span>
                            </h1>
                        
                            <p style={{fontSize: '30px'}}>
              
                                Why bother to type when you can talk?
                           
                                Try the vioice input NOW 🔥</p>
                               
                        </div>

                    </div>



                </div>

                <div className="project-us-detail">


<div className="image1">
    <img src="/images/search_user.jpg" alt="a" data-aos="fade-left"></img>

</div>




<div className="project-myself">
    <div className="title_flex" data-aos="zoom-in-down" >
       
    <h1 className="heading">
                                <span>S</span>
                                <span>E</span>
                                <span>A</span>
                                <span>R</span>
                                <span>C</span>
                                <span>H</span>
                                <span className="space">  </span>
                                <span>U</span>
                                <span>S</span>
                                <span>E</span>
                                <span>R</span>
                            
                                
                                
                            </h1>
        <h1 style={{backgroundImage: "linear-gradient(83.84deg,#08f -6.87%,#a033ff 26.54%,#ff5c87 58.58%)",webkitBackgroundClip: "text"
            ,webkitTextFillColor:"transparent",fontSize:'60px'}}>
        Search 
         <br></br>
        
        for a user 
        
            </h1>
            <p style={{fontSize:'25px'}}>Talk in realtime and send <br></br> messages, video images<br></br> and many features</p>
    </div>

</div>



</div>
          
<div className="project-us-detail">


<div className="image1">
    <img src="/images/desktop_view.jpg" alt="a" data-aos="fade-left"></img>

</div>




<div className="project-myself">
    <div className="title_flex" data-aos="zoom-in-down" >
       
    <h1 className="heading">
                                <span>S</span>
                                <span>T</span>
                                <span>O</span>
                                <span>R</span>
                                <span>A</span>
                                <span>G</span>
                                <span className="space">  </span>
                                <span>E</span>
                                
                                
                            </h1>
        <h1 style={{backgroundImage: "linear-gradient(83.84deg,#08f -6.87%,#a033ff 26.54%,#ff5c87 58.58%)",webkitBackgroundClip: "text"
            ,webkitTextFillColor:"transparent",fontSize:'60px'}}>
        Saving of data
         <br></br>
        of User
          <br></br>
         
        
            </h1>
            <p style={{fontSize:'25px'}}>User can access data anytime<br></br> until<br></br> user delete his profile</p>
    </div>

</div>



</div>
          
                






            </div>
        </section>

    )
}
export default Homepage;