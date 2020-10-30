import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button, Label, Input, Dropdown,
ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'; 
import {connect} from 'react-redux';
import {getLifts, deleteLift, getLiftCategories} from '../actions/liftActions';
import {loadUser} from "../actions/authActions";
import PropTypes from 'prop-types';



class LiftList extends Component {
    state = {
        dropDown: false,
        type: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }
    componentDidMount(){
        const {isAuthenticated, user} = this.props.auth;
        if(user !== null){
            this.props.getLifts(user.email);
        }        
    }
    types = ["Filter", "Bench", "Push ups", "Squats", "Deadlift"];


    onDeleteClick = (id) => {
        this.props.deleteLift(id);
    }
    toggle = () => {
        this.setState({
            dropDown: !this.state.dropDown
        }); 
    }
    onChange = e => {
        const test = e.target.value;
        this.state.type = test;
        console.log(this.state.type);
        const {isAuthenticated, user} = this.props.auth; 
        this.props.getLiftCategories(user.email, this.state.type)

    }

    render () {
        const {lifts} = this.props.lift;   
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

        const renderLiftList = (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {lifts.map(({_id, lift, weight, rep}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button 
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>
                                    {" "}
                                    {lift}
                                    {" "}
                                    
                                    {weight}
                                    
                                    {" x "}
                                    {rep}
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
                {isAuthenticated ? renderLiftList : null }
            </div>
            
            
        );
    }
}

LiftList.propTypes = {
    getLifts: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    deleteLift: PropTypes.func.isRequired,
    lift: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    lift: state.lift,
    auth: state.auth, 
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps, 
    {getLifts, deleteLift, loadUser, getLiftCategories})
    (LiftList);