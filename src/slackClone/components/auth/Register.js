import React , {useState}from 'react';
import {Grid,Header,Button,Form,Segment,Message,Icon} from "semantic-ui-react"
import {Link} from 'react-router-dom';
import firebase from '../../Firebase';
import md5 from 'md5';

function Register (){
    const [user,setUser] = useState({
        username:'',
        email:'',
        password:'',
        passwordConfirm:''
    });
    const [errArray,setErrArray] = useState([]);
    const [loading,setLoading] = useState(false);
    const [usersRef, setUsersRef] = useState(firebase.database().ref('users'));

    const handleCHnage = (event)=>{
        let userObject = JSON.parse(JSON.stringify(user));
        userObject[event.target.name] = event.target.value;
        setUser(userObject);
    };

    const handleSubmit = (event)=>{
        let errArray = [];
        event.preventDefault();
        if(isFormValid()){
            setErrArray([]);
            setLoading(true);
            firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
            .then(createdUser=>{
                createdUser.user.updateProfile({
                    displayName:user.username,
                    photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                }).then(()=>{
                    saveUser(createdUser).then(()=>{
                        console.log("User Saved");
                        setLoading(false);
                    });
                }).catch(err=>{
                    setErrArray(errArray.concat(err));
                    setLoading(false);
                });
            })
            .catch(err=>{
                setErrArray(errArray.concat(err));
                setLoading(false);
            })
        }    
    };

    const saveUser = (createdUser)=>{
        return usersRef.child(createdUser.user.uid).set({
            name:createdUser.user.displayName,
            avatar:createdUser.user.photoURL
        });
    };

    const displayErrors = errors => errors.map((error,i)=><p key={i}>{error.message}</p>)

    const isFormValid = ()=>{
        if(isFormEmpty(user)){
            return false;
        }else if(isPasswordNotMatch(user)){
            return false;
        }else
            return true;
    };

    const isFormEmpty = ({username,email,password,passwordConfirm})=>{
        let err = [];
        let retValue =(!username.length || !email.length || !password.length || !passwordConfirm.length);
        if(retValue) setErrArray(err.concat({"message":"Please fill the fields."}));
        return retValue
    };

    const isPasswordNotMatch = ({password,passwordConfirm})=>{
        let retValue = false;
        let err = [];
        if(password.length <7 && passwordConfirm.length <7){
            setErrArray(err.concat({"message":"Given passwords has different length."}));
            retValue = true;
        }else if(password !== passwordConfirm){
            setErrArray(err.concat({"message":"Given passwords are not same."}));
            retValue =  true;
        }
        return retValue;
    };

    return(<Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth:450}}>
            <Header as="h2" icon color="black" textAlign="center">
                <Icon name="puzzle piece" color="black"/>
                Register for Chat
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input fluid name="username" icon="user" 
                        iconPosition="left" placeholder="User Name"
                        onChange={handleCHnage} type="text" value={user.username}/>
                    <Form.Input fluid name="email" icon="mail" 
                        iconPosition="left" placeholder="Email"
                        onChange={handleCHnage} type="email" value={user.email}/>     
                    <Form.Input fluid name="password" icon="lock" 
                        iconPosition="left" placeholder="Password"
                        onChange={handleCHnage} type="password" value={user.password}/>        
                    <Form.Input fluid name="passwordConfirm" icon="lock" 
                        iconPosition="left" placeholder="Password Confirmation"
                        onChange={handleCHnage} type="password" value={user.passwordConfirm}/> 
                    <Button color="black" size="large" fluid
                        className={loading?'loading':''}
                        disabled={loading}
                    >Submit</Button>              
                </Segment>
            </Form>
            {errArray.length > 0 ? (<Message error>{displayErrors(errArray)}</Message>) : null}
            <Message>Already a user ? <Link to="/login">Login</Link></Message>
        </Grid.Column>
    </Grid>);
}

export default Register;