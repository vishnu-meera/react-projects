import React , {useState}from 'react';
import {Grid,Header,Button,Form,Segment,Message,Icon} from "semantic-ui-react"
import {Link} from 'react-router-dom';
import firebase from '../../Firebase';

function Login (){
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const [errArray,setErrArray] = useState([]);
    const [loading,setLoading] = useState(false);

    const handleCHnage = (event)=>{
        let userObject = JSON.parse(JSON.stringify(user));
        userObject[event.target.name] = event.target.value;
        setUser(userObject);
    };

    const isFormValid =  ({email,password})=> email && password;

    const handleSubmit = (event)=>{
        let errArray = [];
        event.preventDefault();
        if(isFormValid(user)){
            setErrArray([]);
            setLoading(true);
            firebase.auth()
            .signInWithEmailAndPassword(user.email,user.password)
            .then(signInUser=>{
                console.log("Signin user : ",signInUser);
                setLoading(false);
            })
            .catch(err=>{
                setErrArray(errArray.concat(err));
                setLoading(false);
            })
        }    
    };

    const displayErrors = errors => errors.map((error,i)=><p key={i}>{error.message}</p>)

    return(<Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth:450}}>
            <Header as="h2" icon color="orange" textAlign="center">
                <Icon name="code branch" color="orange"/>
                Login to Slack Chat
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input fluid name="email" icon="mail" 
                        iconPosition="left" placeholder="Email"
                        onChange={handleCHnage} type="email" value={user.email}/>     
                    <Form.Input fluid name="password" icon="lock" 
                        iconPosition="left" placeholder="Password"
                        onChange={handleCHnage} type="password" value={user.password}/>        
                    <Button color="orange" size="large" fluid
                        className={loading?'loading':''}
                        disabled={loading}
                    >Submit</Button>              
                </Segment>
            </Form>
            {errArray.length > 0 ? (<Message error>{displayErrors(errArray)}</Message>) : null}
            <Message>Don't have an account, then please register !!!<Link to="/register">Register</Link></Message>
        </Grid.Column>
    </Grid>);
}

export default Login;