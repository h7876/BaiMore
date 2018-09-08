import React, {Component} from 'react';
// eslint-disable-next-line
import slideshow from './slideshow.css';

class Slideshow extends Component {

    componentDidMount(){
        this.setCarouselImg();
    }
    constructor(){
        
        super();
        this.state = {
            images: ['https://cdn.jane.com/content/images/retail/2018/fall/21week2-web.jpg', 'https://cdn.jane.com/content/images/giveaway/2018/2018-09-03/2018-09-03-apt2b-index.jpg', 'https://cdn.jane.com/content/images/jane/banners/slider/app/app-slider-banner-2018-09-05.jpg'],
            currentImage: 0
        }
        this.setCarouselImg = this.setCarouselImg.bind(this);
        this.moveCarouselBackward = this.moveCarouselBackward.bind(this);
        this.moveCarouselForward = this.moveCarouselForward.bind(this);
    }

    moveCarouselForward(){
        if(this.state.currentImage === this.state.images.length -1){
        this.setState({currentImage: 0})
        }
        else{
        this.setState({currentImage: this.state.currentImage + 1})
        }
    }

    moveCarouselBackward(){
        if(this.state.currentImage === 0){
            this.setState({currentImage: this.state.images.length -1})
        }
        else{
        this.setState({currentImage: this.state.currentImage - 1})
        }
    }

    setCarouselImg(){
        let i =0;
        setInterval(()=>{
        if(i !== this.state.currentImage){
            i=this.state.currentImage
            clearInterval(setInterval)
            i++
        }
        if(i === this.state.currentImage){
            i++
        }
       if(i === this.state.images.length || i > this.state.images.length){
          i=0;
         
       }
       this.setState({currentImage:i})
    }, 7000);
    }

    render(){
        
        return(
            <div>
            <div className='flex-container-carousel'>
            <div className="overlayback"></div>
                <button onClick={this.moveCarouselBackward} className="backbutton"></button>
                    <img className="overlay" alt=""/>
                    <img src={this.state.images[this.state.currentImage]} alt="" className="carouselimg"/>
                    <div className="overlayforward"></div>
                    <button onClick={this.moveCarouselForward} className="forwardbutton"></button>
                </div>
                <div className="dots-flex">
                <span class="dot1" dot-selected={this.state.currentImage === 0 ? 'on' : 'off'}></span>
                <span class="dot2" dot-selected={this.state.currentImage === 1 ? 'on' : 'off'}></span>
                <span class="dot3" dot-selected={this.state.currentImage === 2 ? 'on' : 'off'}></span>
                <span class="dot4" dot-selected={this.state.currentImage === 3 ? 'on' : 'off'}></span>
                <span class="dot5" dot-selected={this.state.currentImage === 4 ? 'on' : 'off'}></span>
                <span class="dot6" dot-selected={this.state.currentImage === 5 ? 'on' : 'off'}></span>
                <span class="dot7" dot-selected={this.state.currentImage === 6 ? 'on' : 'off'}></span>
                </div>
            
            {/* <p>{this.state.currentImage}</p> */}
            </div>
        )
    }
}

export default Slideshow;