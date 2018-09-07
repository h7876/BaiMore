import React, {Component} from 'react';


class Slideshow extends Component {

    componentDidMount(){
        this.setCarouselImg();
    }
    constructor(){
        
        super();
        this.state = {
            images: ['https://buzzsharer.com/wp-content/uploads/2016/10/corgi-photo.jpg', 'https://collegian.com/wp-content/uploads/2017/09/093017_APOTTS_AC_TourdeCorgi-9.jpg', 'https://assets3.thrillist.com/v1/image/2444807/size/tmg-article_tall;jpeg_quality=20.jpg', 'https://uproxx.files.wordpress.com/2016/09/loki-the-corgi.jpg?quality=95&w=650', 'https://static.boredpanda.com/blog/wp-content/uploads/2018/05/funny-corgis-cute-dogs-42-5afd687db521e__700.jpg', 'http://i.imgur.com/WMlHCpH.jpg'],
            currentImage: '0'
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
    }, 5000);
    }

    render(){
        
        return(
            <div>
                <button onClick={this.moveCarouselBackward}>Back</button><img src={this.state.images[this.state.currentImage]} width="500px" height="350px" alt=""/><button onClick={this.moveCarouselForward}>Forward</button>
                <p>{this.state.currentImage}</p>
            </div>
        )
    }
}

export default Slideshow;