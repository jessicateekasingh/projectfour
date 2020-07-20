class Posted extends React.Component {
    state = {
      posts: []
    }

    componentDidMount = () => {
      axios.get('/powr').then(
        response => {
          console.log(response);
            this.setState({
              posts: response.data
            });
        }
      )
    }//end componentDidMount

    render = () => {
        return (
          <div className="posted-content">
            <ul>
              { this.renderPosts() }
            </ul>
          </div>
        );
    }//end render

    renderPosts = () => {
        return this.state.posts.map((post) => {
          return <PostShort key={post.id} post={post} />;
        });
    }
}//end class Posted

class PostShort extends React.Component {
    state = {}
    constructor(props){
      super(props)
      this.state.id=props.post.id
      this.state.author=props.post.author
      this.state.title=props.post.title
      this.state.image=props.post.image
      this.state.content=props.post.content
      this.state.is_featured=props.post.is_featured
    }//end constructor


    render = () => {
      return (
        <li>
          <div className="posted">
            <div className="image">
              <Link to={"/post/" + this.props.post.id}><img src={this.props.post.image} /></Link>
            </div>
            
            <div className="overlay">
              <h4><Link to={"/post/" + this.props.post.id}>{this.props.post.title}</Link></h4>
            </div>
          </div>//div posted ends
        </li>
      )
    }
}//end class postShort
