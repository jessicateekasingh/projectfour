class CreatePost extends React.Component {
  state = {
    posts: [],
    newPostIsFeatured: false
  }


  createPost = (event) => {
    event.preventDefault();
    axios.post(
      '/powr',
      {
        author:this.state.newPostAuthor,
        title:this.state.newPostTitle,
        image:this.state.newPostPicture,
        content:this.state.newPostContent,
        is_featured:this.state.newPostIsFeatured
      }
    ).then(
      (response) => {
        console.log(response);
        this.props.history.push('/post/' + response.data.id);
      }
    )
  }


  changeNewPostAuthor = (event) => {
  this.setState({
    newPostAuthor:event.target.value
  });
  // console.log(this);
}

changeNewPostTitle = (event) => {
  this.setState({
    newPostTitle:event.target.value
  });
  // console.log(this);
}

changeNewPostPicture = (event) => {
  this.setState({
    newPostPicture:event.target.value
  });
  // console.log(this);
}


  changeNewPostContent = (event) => {
  this.setState({
    newPostContent:event.target.value
  });
  // console.log(this);
}


changeNewPostIsFeatured = (event) => {
  this.setState({
    newPostIsFeatured:event.target.checked
  });
  // console.log(this);
}


render = () => {
  return <div className={"create-post"}>
  <h2>Create New Post</h2>
  <form onSubmit={this.createPost}>
  <input onKeyUp={this.changeNewPostAuthor} type="text" placeholder="Author" />
  <input onKeyUp={this.changeNewPostTitle} type="text" placeholder="Title" />
  <input onKeyUp={this.changeNewPostPicture} type="text" placeholder="Image URL" />
  <textarea onKeyUp={this.changeNewPostContent} type="text" placeholder="Express yourself.." />

  <div className={"checkbox"}>
    <label for="featured">Featured Post?</label>
    <input onChange={this.changeNewPostIsFeatured} type="checkbox" name={"featured"} id={"featured"} />
  </div>

  <button type="submit">Create Post</button>
  </form>
  </div>

  }
}
