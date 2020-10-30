import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faDumbbell, faRunning } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router } from "react-router-dom";
import LiftList from './components/LiftList';
import ItemModal from './components/ItemModal';
import CardioModal from './components/CardioModal'
import CardioList from './components/CardioList';
import {Container, Button, ButtonGroup} from 'reactstrap';

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopBar from './components/content/TopBar';




class App extends Component{ 
  state = {
    lifts: false,
    cardio: false
  }

  componentDidMount(){
    store.dispatch(loadUser()); 
  }
  onClickLifts = () => {
    if(this.state.cardio === true){
      this.setState({
        cardio: !this.state.cardio
      });
    }
    this.setState({
      lifts: !this.state.lifts
    }); 
  }
  onClickCardio = () => {
    if(this.state.lifts === true){
      this.setState({
        lifts: !this.state.lifts
      }); 
    }
    this.setState({
      cardio: !this.state.cardio
    }); 
  }

  render(){
    const itemModal = (
      <Container>
        <ItemModal></ItemModal>
        <LiftList></LiftList>
      </Container>
      
    )
    const cardioModal = (
      <Container>
        <CardioModal></CardioModal>
        <CardioList></CardioList>
      </Container>      
    )


    return (
      <Router>
        <Provider store={store}>         
            <TopBar/>
            <Container>
              <ButtonGroup size="lg">
                <Button 
                    className="large"
                    color="dark"
                    style={{marginBottom: '2rem'}} 
                    onClick={this.onClickLifts}>
                    <FontAwesomeIcon icon={faDumbbell} />
                  </Button>
                <Button color="dark"
                    style={{marginBottom: '2rem'}} 
                    onClick={this.onClickCardio}>
                    <FontAwesomeIcon icon={faRunning} />
                </Button>
              </ButtonGroup>
              {this.state.lifts ? itemModal : null}
              {this.state.cardio? cardioModal : null}
            </Container>         
        </Provider>
      </Router>
      
    );
  }
}

export default App;
