const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

class Powow extends React.Component {
  state = {
    addPost: false
  }
  render = () => {
      return (
        <Router>
            <div className={"pow-wow"}>
                <div className={"nav"}>
                  <Link to={"/"} className={"logo"}>POWOW</Link>
                  <Link to="/add-post">New Post</Link>
                  <Link to="/">Sign Up</Link>
                  <Link to="/">Home</Link>
                </div>//end of nav div

                <Switch>
                  <Route path={"/post/:id"} component={Post}></Route>
                  <Route path={"/add-post"} component={CreatePost}></Route>
                  <Route path={"/"}>
                      <div className={"posts"}>
                        <Slider />
                        <Posted />
                      </div>
                    </Route>
                </Switch>

            </div>//end of pow-wow div
        </Router>

      )//end of return//

  }//end of render//

  showPosts = () => {
      this.setState({
          addPost: false
      });
  }


  createPost = () => {
      this.setState({
          addPost: true
      })
  }


}//end of class Powow//
