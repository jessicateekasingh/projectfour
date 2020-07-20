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
    }
}
