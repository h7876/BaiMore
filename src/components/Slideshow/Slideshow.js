import React, {Component} from 'react';


class Slideshow extends Component {
    
    componentDidMount(){
        this.setCarouselImg();
    }
    constructor(){
        super();
        this.state = {
            images: ['https://buzzsharer.com/wp-content/uploads/2016/10/corgi-photo.jpg', 'https://collegian.com/wp-content/uploads/2017/09/093017_APOTTS_AC_TourdeCorgi-9.jpg', 'https://assets3.thrillist.com/v1/image/2444807/size/tmg-article_tall;jpeg_quality=20.jpg'],
            currentImage: '0'
        }
        this.setCarouselImg = this.setCarouselImg.bind(this);
    }


    setCarouselImg(){
        let i =0;
        setInterval(()=>{
            i++;
       if(i === 3){
          i=0;
       }
       this.setState({currentImage:i})
    }, 5000);
    }

    render(){
        
        return(
            <div>
                <img src={this.state.images[this.state.currentImage]} width="500px" height="350px" alt=""/>
            </div>
        )
    }
}

export default Slideshow;