import React from 'react'; //type rfc
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { Home, Contact, About, Inventory, SignIn, SignOut, SignUp } from './components'
import './style.css'
// import { firebaseConfig } from './firebaseConfig';
// import 'firebase/auth';
import { Provider } from 'react-redux';
import {store } from './redux/store';


let myTitle = "Ivan's Whiskey Shop"


ReactDOM.render(
  <React.StrictMode>
  {/* <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}> */}
  <Provider store={store}>
    <Router>
      <Switch>

      <Route exact path="/">
        <Home title={myTitle} />
      </Route>
      <Route path='/phonebook'>
        <Inventory></Inventory>
      </Route>
      <Route path='/contact'>
        <Contact></Contact>
      </Route>
      <Route path='/about'>
        <About></About>
      </Route>
      <Route path='/signin'>
        <SignIn></SignIn>
      </Route>
      <Route path='/signout'>
        <SignOut></SignOut>
      </Route>
      <Route path='/signup'>
        <SignUp></SignUp>
      </Route>

      </Switch>
    </Router>
    </Provider>
    {/* </FirebaseAppProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

