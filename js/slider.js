class Slider extends React.Component {
    state = {
        featuredPosts: [],
        currentSlide: 0
    };

    componentDidMount = () => {
      console.log('test');
      this.getFeaturedPosts();
    }

    render = () => {
        return(
          <div className={"slider"}>
            <div className={"controls"}>
              <div className={"left"}>
                <a href="#" onClick={this.prevSlide}><</a>// < arrow for previous
              </div>
              <div className={"right"}>
                <a href="#" onClick={this.nextSlide}>></a>// > arrow for next
              </div>
            </div>//end of controls div
            <div className={"current-slide"}>
              { this.renderSlide() }
            </div>
          </div>
        )
    };//end of render

    getFeaturedPosts = () => {
      axios.get('/powr/featured').then(
        response => {
          console.log(response);
            this.setState({
              featuredPosts: response.data
            });
            console.log(this.state.featuredPosts);
        }
      )
    }//end of getFeaturedPosts


    renderSlide = () => {
      if(this.state.featuredPosts.length) {
        return (
          <Slide slide={this.state.featuredPosts[this.state.currentSlide]} />
        );
      } else {
        const post = {
          author: 'test',
          title: 'test',
          image: 'test',
          content: 'test',
          is_featured: 'test',
          id: 0
        };
        return <div></div>;
      }
    }//end of renderSlide

    nextSlide = (event) => {
      event.preventDefault();
      if(this.state.currentSlide < this.state.featuredPosts.length - 1) {
        const nextSlide = this.state.currentSlide + 1;
        this.setState({
          currentSlide: nextSlide
        });
      } else {
        this.setState({
          currentSlide: 0
        });
      }
    }//end of nextSlide


    prevSlide = (event) => {
      event.preventDefault();
      if(this.state.currentSlide === 0) {
        this.setState({
          currentSlide: this.state.featuredPosts.length - 1
        });
      } else {
        const prevSlide = this.state.currentSlide - 1;
        this.setState({
          currentSlide: prevSlide
        });
      }
    }//end of prevSlide
}//end of class Slider

class Slide extends React.Component {
  state = {}
  constructor(props){
    super(props)
    this.state.id=props.slide.id
    this.state.author=props.slide.author;
    this.state.title=props.slide.title;
    this.state.image=props.slide.image;
    this.state.content=props.slide.content;
    this.state.is_featured=props.slide.is_featured;
    console.log(props);
  }//end of constructor

  render = () => {
    return(
      <div className={"slide"}>
        <div className={"image"}>
          <Link to={"/post/" + this.props.slide.id}><img src={this.props.slide.image} /></Link>
        </div>
        <div className={"overlay"}>
          <button Link to={"/post/" + this.props.slide.id}>Learn More</button>
        </div>
      </div>
    )
  }//end of render
}//end of class Slide
