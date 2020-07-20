class Post extends React.Component {
  state = {
      edit: false
  }

  componentDidMount = () => {
    console.log(this.props);
    let id = this.props.match.params.id;
    axios.get('/powr/' + id).then(
        response => {
          console.log(response);
          let is_featured = false;
          if(response.data.is_featured == 't') {
              is_featured = true;
          }
          this.setState({
            id: response.data.id,
            title: response.data.title,
            image: response.data.image,
            author: response.data.author,
            content: response.data.content,
            is_featured: is_featured,
            history: this.props.history
          });
        }
    )
  }

  changeNewPostAuthor = (event) => {
    this.setState({
        author: event.target.value
    });
  }//end changeAuthor

  changeNewPostTitle = (event) => {
    this.setState({
        title: event.target.value
    });
  }//end changeTitle

  changeNewPostImage = (event) => {
    this.setState({
        image: event.target.value
    });//end of changeImage
  }

  changeNewPostContent = (event) => {
    this.setState({
        content: event.target.value
    });
  }//end changeContent

  changeNewPostIsFeatured = (event) => {
    this.setState({
        is_featured: event.target.checked
    });
  }//end changeFeatured

  editPost = () => {
    this.setState({
      edit: true
    })
  }//end editPost

  editNewPost = (event) => {
    event.preventDefault();
    axios.put(
      '/powr/' + this.state.id,
      {
        author: this.state.author,
        title: this.state.title,
        image: this.state.image,
        content: this.state.content,
        is_featured: this.state.is_featured
      }
    ).then(
        (response) => {
          console.log(response);
          this.setState({
            edit: false
          });
        }
    )
  }//end editNewPost//

  render = () => {
    if(this.state.edit) {
        return (
          <div className={"create-post"}>
            <h3>Edit Post</h3>
            <form onSubmit={this.editBlogPost}>
              <input onChange={event => this.changeNewPostAuthor(event)} type="text" placeholder="Author" defaultValue={this.state.author} />
              <input onChange={this.changeNewPostTitle} type="text" placeholder="Title" defaultValue={this.state.title} />
              <input onChange={this.changeNewPostPicture} type="text" placeholder="Image URL" defaultValue={this.state.image} />
              <textarea onChange={this.changeNewPostContent} type="text" placeholder="Express yourself!" defaultValue={this.state.content} />

              <div className={"checkbox"}>
                <label htmlFor="featured">Featured Post?</label>
                <input onChange={this.changeNewPostIsFeatured} type="checkbox" name={"featured"} id={"featured"} defaultChecked={this.state.is_featured} />
              </div>//end of checkbox div

              <button type="submit">Edit Post</button>
              <button type={"button"} onClick={this.deletePost}>Delete Post</button>

            </form>//end of onSubmit form//
          </div>//end of create-post div
        );
    } else {
        return (
          <div className={"post"}>

              <div className={"image"}>
                <img src={this.state.image} />
              </div>

              <div className={"title"}>
                <h2>{this.state.title}</h2>
              </div>

              <div className={"post-author"}>
                <p>Author: <span>{this.state.author}</span></p>
              </div>

              <div className={"post-content"}>
                <p>{this.state.content}</p>
              </div>

              <div className={"edit"}>
                <button onClick={this.editPost}>Edit</button>
              </div>
          </div>//end of post div//
          );
        }//end of else statement//
    }//end of render for editPost//

    deletePost = () => {
      axios.delete(
        '/powr/' + this.state.id,
      ).then(response => {
          this.props.history.push('/');
      });
    }//end deletePost//

}//end of Post class
