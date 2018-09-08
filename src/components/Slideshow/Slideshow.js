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
            images: ['https://buzzsharer.com/wp-content/uploads/2016/10/corgi-photo.jpg', 'https://collegian.com/wp-content/uploads/2017/09/093017_APOTTS_AC_TourdeCorgi-9.jpg', 'https://assets3.thrillist.com/v1/image/2444807/size/tmg-article_tall;jpeg_quality=20.jpg', 'https://uproxx.files.wordpress.com/2016/09/loki-the-corgi.jpg?quality=95&w=650', 'https://static.boredpanda.com/blog/wp-content/uploads/2018/05/funny-corgis-cute-dogs-42-5afd687db521e__700.jpg', 'http://i.imgur.com/WMlHCpH.jpg', 'http://www.bravotv.com/sites/nbcubravotv/files/styles/blog-post--mobile/public/field_blog_image/2018/04/unleashed-corgi-people-promo.jpg?itok=mKp8i56f&timestamp=1524257239'],
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
                <button onClick={this.moveCarouselBackward} className="backbutton"></button>
                    <img className="overlay"/>
                    <img src={this.state.images[this.state.currentImage]} alt="" className="carouselimg"/>
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