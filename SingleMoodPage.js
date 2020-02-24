import React, { Component } from 'react'
import { Image } from 'react-native'
import { H2, Item, ListItem, Label, Card, CardItem, Text, Icon, Left, Body } from 'native-base'
import moodFieldsJson from './assets/moodFields.json'

export default class SingleMoodPage extends Component {
    /*
        Page Single Mood 
    */

    state = { 
        fields: null,
        mood: null
    }

    componentDidMount() {
        const fields = JSON.parse(JSON.stringify(moodFieldsJson))
        delete fields["dates"]
        delete fields["overAllFeeling"]
        const mood = this.props.navigation.state.params.mood
        this.setState({ fields, mood })
    }

    /**
     * Get emoji/icon face based on overall mood
     * 
     * @param {*} overallMood
     */
    teaserEmoji(overallMood) {
        switch (overallMood) {
            case 1:
                return (<Icon type="FontAwesome5" name="sad-cry" />)
                break
            case 2:
                return (<Icon type="FontAwesome" name="frown-o" />)
                break
            case 3:
                return (<Icon type="FontAwesome" name="meh-o" />)
                break
            case 4:
                return (<Icon type="FontAwesome" name="smile-o" />)
                break
            case 5:
                return (<Icon type="FontAwesome5" name="laugh-beam" />)
                break
            default:
        }
    }

    /**
     * Check if mood date is today
     * 
     * @param {*} moodDate 
     * @return {boolean}
     */
    isMoodToday(moodDate) {
        return new Date() === new Date(moodDate.toDate())
    }

    /**
     * This function renders the actual field.
     * It's rendered differently depending on field type.
     * 
     * @param {*} field 
     * @param {string} fieldKey
     */
    renderField(field, fieldKey) {
        if (field.type === 'radio') {
            if (field.options) {
                const options = field.options
                return (
                    <>
                    {Object.keys(options).map((optionKey) => {
                        if (this.state.mood[fieldKey] == options[optionKey].value) {
                            return (
                                <Left key={optionKey}>
                                    {this.getRadioButtonText(options[optionKey])}
                                </Left>
                            )
                        }
                    })}
                    </>
                )
            } else if (this.state.mood[fieldKey]) {
                return (
                    <Left>
                        <Text>{field.text}</Text>
                    </Left>
                )
            }
            
        }
        // textarea
        if (field.type === 'textarea') {
            return (
                <Label>
                    <Text>{this.state.mood[fieldKey]}</Text>
                </Label>
            )
        }
    }

    /**
     * A function that determines if a text or icon should be shown to describe single radio button
     * 
     * @param {*} radioButtonOption 
     */
    getRadioButtonText(radioButtonOption) {
        if (radioButtonOption.showOptionAsIcon) {
            return this.teaserEmoji(radioButtonOption.value)
        }

        return <Text>{radioButtonOption.text}</Text>
    }

    render() {
        const mood = this.props.navigation.state.params.mood

        return (
            <Card style={{flex: 0}}>
                <CardItem>
                <Left>
                    {this.teaserEmoji(mood.overall_mood)}
                    <Body>
                        <Text>{new Date(mood.date.toDate()).toDateString()}</Text>
                        {this.isMoodToday(mood.date) && <Text note>TODAY</Text>}
                    </Body>
                </Left>
                </CardItem>
                {   this.state.fields &&
                    Object.keys(this.state.fields).map((subjectKey) => {
                            return (
                                <CardItem key={subjectKey}>
                                    <Body>
                                        <H2>{this.state.fields[subjectKey].text}</H2>
                                        {Object.keys(this.state.fields[subjectKey].fields).map((fieldKey) => {
                                            return (
                                                <Item key={fieldKey}>
                                                    {this.renderField(this.state.fields[subjectKey].fields[fieldKey], fieldKey)}
                                                </Item>
                                            )
                                        })}
                                    </Body>
                                </CardItem>
                    )})
                }
            </Card>
        );
    }
}