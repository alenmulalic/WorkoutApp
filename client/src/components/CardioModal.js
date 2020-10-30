import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
    Alert,
    Container
} from 'reactstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChartLine } from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import {addCardio} from '../actions/cardioActions';
import PropTypes from 'prop-types';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class CardioModal extends Component {
    state = {
        modal: false,
        analytics: false,
        type: '',
        duration: '',
        intensity: '',
    }
    graphData = {
        title: {
            text: "Cardio graph"
        },
        data: [{				
            type: "column",
            dataPoints: [
                { label: "Apple",  y: 10  },
                { label: "Orange", y: 15  },
                { label: "Banana", y: 25  },
                { label: "Mango",  y: 30  },
                { label: "Grape",  y: 28  }
            ]
        }]
    }

    types = ["Select Activity", "Running", "Biking", "Swimming"];
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        }); 
    }
    toggleAnalytics = () => {
        this.updateGraphData(this.graphData); 
        this.setState({
            analytics: !this.state.analytics
        })
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value}); 
    }
   updateGraphData = (graphData) => {
        const {cardios} = this.props.cardio; 
        const dataArray = []; 
        for(let i = 0; i < cardios.length; i++){
            const data = {
                label: cardios[i].type,
                y: parseInt(cardios[i].duration)
            }
            dataArray.push(data);
        }
        graphData.data[0].dataPoints = dataArray; 
    }


    onSubmit = (e) => {
        e.preventDefault();
        const {isAuthenticated, user} = this.props.auth;
        console.log("This is the user name" + user.name);
        const newWorkout = {
            user: user.email,
            type: this.state.type,
            duration: this.state.duration,
            intensity: this.state.intensity
        }


        //Add cardio
        this.props.addCardio(newWorkout);

        //Close modal
        this.toggle(); 
    }

    dropDownOnClick = (e) => {
        this.setState({
            dropdownBool: !this.state.dropdownBool
        }); 
    }

    render() {
        const {cardios} = this.props.cardio;         
       
        const renderButtonGroup = (
            <ButtonGroup size="md">
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}                
                >
                <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggleAnalytics}                
                ><FontAwesomeIcon icon={faChartLine}/>
                </Button>
                
            </ButtonGroup>
        )
        const items = this.types.map(function(item){
            return <option>{item}</option>
        })


        const toggleAnalytics = (
            <Container>
                <CanvasJSChart options = {this.graphData}
             />
            </Container>
            
        )
        const loginAlert = (
            <Alert>Please Login or Sign Up to Access Features!</Alert>
        )
        const cardioAddModal = (
            <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add Workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label>Select Activity</Label>
                                <Input type="select" name="type" onChange={this.onChange}>
                                    {items}
                                </Input>
                                <Label>Duration of Activity</Label>
                                <Input
                                    type="number"
                                    name="duration"
                                    id="weight"
                                    placeholder="in Minutes"
                                    onChange={this.onChange}                                
                                 />
                                 <Label>Intensity of Workout</Label>
                                 <Input type="select" name="intensity" onChange={this.onChange}>
                                    <option>Select Intensity</option>
                                    <option>Light</option>
                                    <option>Moderate</option>
                                    <option>Vigorous</option>
                                 </Input>
                                
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Workout</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
        )
       

        return (
            <div>
                {this.props.isAuthenticated ?  renderButtonGroup : 
                loginAlert}

                {this.state.analytics ?  
                 toggleAnalytics: null }
       
                {cardioAddModal}
            </div>
        )
    }
}

CardioModal.propTypes = {
    cardio: PropTypes.object.isRequired, 
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool    
}

const mapStateToProps = (state) => ({
    cardio: state.cardio,
    item: state.item, 
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});


export default connect(mapStateToProps, {addCardio})(CardioModal);