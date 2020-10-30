import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'; 
import {connect} from 'react-redux';
import {getCardio, deleteCardio, getCardioType} from '../actions/cardioActions';
import PropTypes from 'prop-types';

class CardioList extends Component {
    state = {
        dropDown: false,
        type: ''
    }

    componentDidMount(){
        const {isAuthenticated, user} = this.props.auth;
        if(user !== null) 
            this.props.getCardio(user.email);
    }

    onDeleteClick = (id) => {
        this.props.deleteCardio(id);
    }

    types = ["Filter", "Running", "Biking", "Swimming"];

    onChange = e => {
        const test = e.target.value;
        this.state.type = test;
        console.log(this.state.type);
        const {isAuthenticated, user} = this.props.auth; 
        this.props.getCardioType(user.email, this.state.type)

    }

    render () {
        const {cardios} = this.props.cardio; 
        const {isAuthenticated, user} = this.props.auth;

        const items = this.types.map(function(item){
            return <option>{item}</option>
        })

        const renderDropDown = (
            <Container>
                <Input type="select" onChange={this.onChange}>
                    {items}
                </Input>
            </Container>          
        )

        const renderCardioList = (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {cardios.map(({_id, type, duration, intensity}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button 
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>
                                    
                                    {type}
                                    {" Duration "}
                                    
                                    {duration}
                                    {" Intensity "}
                                    {intensity}
                                </ListGroupItem>                               
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
        return (
            <div>
                {isAuthenticated ? renderDropDown : null}   
                {isAuthenticated ? renderCardioList : null}
            </div>      
        );
    }
}

CardioList.propTypes = {
    getCardio: PropTypes.func.isRequired,
    cardio: PropTypes.object.isRequired, 
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool    
}

const mapStateToProps = (state) => ({
    cardio: state.cardio,
    auth: state.auth, 
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    {getCardio, deleteCardio, getCardioType})
    (CardioList);