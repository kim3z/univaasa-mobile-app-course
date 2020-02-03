import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'
import { 
    Container, 
    Header, 
    Body,
    Content, 
    Form, 
    Item, 
    Input, 
    Button, 
    Text,
    Title,
    Label,
    H1
} from 'native-base'

export default class LoginPage extends React.Component {
    state = { 
        email: '', 
        password: '', 
        authError: null 
    }
    
    loginUser = () => {
        const { email, password } = this.state
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('HomePage'))
          .catch(error => this.setState({ authError: error.message }))
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('./assets/clouds.jpg')} style={styles.bg}>
                    <View style={styles.opacityBg}>
                        <Header style={styles.loginHeader}>
                            <Body style={styles.loginTitle}>
                                <Title>Easy Weather App</Title>
                            </Body>
                        </Header>
                        <Content padder>
                            <View style={styles.loginSubtitle}>
                                <H1 style={styles.textWhite}>Login</H1>
                            </View>
                            <Form>
                                <Item floatingLabel>
                                    <Label style={styles.textWhite}>Email</Label>
                                    <Input
                                    style={styles.textWhite} 
                                    onChangeText={email => this.setState({ email })}
                                    value={this.state.email}
                                    />
                                </Item>
                                <Item floatingLabel last>
                                    <Label style={styles.textWhite}>Password</Label>
                                    <Input 
                                    style={styles.textWhite}
                                    secureTextEntry
                                    placeholder="Password"
                                    onChangeText={password => this.setState({ password })}
                                    value={this.state.password}
                                    />
                                </Item>
                                <Button
                                onPress={this.loginUser} 
                                full primary rounded
                                style={styles.loginButton}
                                >
                                <Text>Login</Text>
                                </Button>
                                <Button 
                                onPress={() => this.props.navigation.navigate('RegisterPage')}
                                full light rounded
                                style={styles.registerButton}
                                >
                                <Text>Don't have an account? Register here</Text>
                                </Button>
                            </Form>
                        </Content>
                    </View>
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
    },
    opacityBg: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
    },
    loginHeader: {
        backgroundColor: 'transparent'
    },
    textWhite: {
        color: 'white',
    },
    loginTitle: {
        alignItems: 'center',
        flex: 1,  
        justifyContent: 'center',
    },
    loginSubtitle: {
        alignItems: 'center',
        flex: 1,  
        justifyContent: 'center',
        marginTop: 20,
    },
    loginButton: {
        marginTop: 40,
    },
    registerButton: {
        marginTop: 10
    },
})