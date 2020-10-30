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
    Alert,
    ButtonGroup,
    Container
} from 'reactstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChartLine } from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import {addLift} from '../actions/liftActions';
import PropTypes from 'prop-types';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ItemModal extends Component {
    state = {
        modal: false,
        analytics: false,
        lift: '',
        weight: '',
        rep: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }
    graphData = {
        title: {
            text: "Lift graph (total Volume)"
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


    types = ["Select Activity", "Bench", "Push ups", "Squats", "Deadlift"];


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        }); 
    }

    toggleAnalytics = () => {
        this.updateGraphData(this.graphData); 
        this.setState({
            analytics: !this.state.analytics
        }); 
    }
    updateGraphData = (graphData) => {
        const {lifts} = this.props.lifts; 
        const dataArray = []; 
        for(let i = 0; i < lifts.length; i++){
            const data = {
                label: lifts[i].lift,
                y: parseInt(lifts[i].weight) * parseInt(lifts[i].rep)
            }
            dataArray.push(data);
        }
        console.log(dataArray);
        graphData.data[0].dataPoints = dataArray; 
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value}); 
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {isAuthenticated, user} = this.props.auth;

        const newLift = {
            user: user.email,
            lift: this.state.lift,
            weight: this.state.weight,
            rep: this.state.rep
        }      

        //Add lift via addLift action
        this.props.addLift(newLift);

        //Close modal
        this.toggle(); 
    }

    dropDownOnClick = (e) => {
        this.setState({
            dropdownBool: !this.state.dropdownBool
        }); 
    }
    

    render() {
        const items = this.types.map(function(item){
            return <option>{item}</option>
        })
        const renderButtonGroup = (
            <ButtonGroup>
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
                    >
                    <FontAwesomeIcon icon={faChartLine}/>
                </Button>
            </ButtonGroup>          
        )
        const analyticsAlert = (
            <Container>
                <CanvasJSChart options = {this.graphData}
             />
            </Container>
        )
        const loginAlert = (
            <Alert>Please Login or Sign up to Access Features!</Alert>
        )

        const addLiftModal = (
            <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add Workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="selectItem">Select Lift</Label>
                                <Input type="select" name="lift" onChange={this.onChange}>
                                    {items}
                                </Input>
                                <Label>Weight Lifted</Label>

                                <Input
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    placeholder="in kg or lbs"
                                    onChange={this.onChange}                                
                                 />
                                <Label>Total Reps Lifted</Label>

                                 <Input 
                                    type="number"
                                    name="rep"
                                    id="reps"
                                    placeholder="Reps"
                                    onChange={this.onChange}
                                 />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Lift</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
        )

        return (
            <div>
                {this.props.isAuthenticated ? renderButtonGroup  : 
                loginAlert}

                {this.state.analytics ? analyticsAlert : null}
                
               {addLiftModal}
                
            </div>
        )
    }
}

ItemModal.propTypes = {
    lifts: PropTypes.object.isRequired, 
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool    
}


const mapStateToProps = (state) => ({
    lifts: state.lift,
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});


export default connect(mapStateToProps, { addLift})(ItemModal);