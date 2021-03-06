import * as React from 'react'
import { Dimensions, View, StyleSheet, ScrollView } from 'react-native'
import { Spinner, Text } from 'native-base'
import firebase from 'react-native-firebase'
import { withNavigation } from 'react-navigation'
import {
    BarChart
  } from 'react-native-chart-kit'

class StatsMoodThisWeek extends React.Component {
    /*
    Show overall mood stats for current week
    */

    state = { 
        currentUser: null,
        moods: null,
        thisWeekOverallMoodData: [],
        isLoading: false
    }

    componentDidMount() {
        // show loading spinner
        let isLoading = true;
        this.setState({ isLoading })
        // get moods from parent component to calculate stats
        const moods = this.props.moods
        // get current user
        const { currentUser } = firebase.auth()
        // hide loading spinner
        isLoading = false
        // get processed data to display overall mood for current week
        const thisWeekOverallMoodData = this.thisWeekOverallMoodData(moods)
        this.setState({ currentUser, moods, thisWeekOverallMoodData, isLoading })
    }

    /**
     * Calculate overall mood for each day current week
     * 
     * @param {*} moods 
     */
    thisWeekOverallMoodData(moods) {
        this.setState({ isLoading: true })

        const today = new Date(new Date().setHours(0,0,0,0))
        const dayNow = today.getDay()
        const daysDiff = dayNow == 0 ? 6 : dayNow - 1
        // this week starts
        const weekStarts = new Date(new Date(today).setDate(today.getDate() - daysDiff))
        // this week ends
        let weekEnds = new Date(new Date(weekStarts).setDate(weekStarts.getDate() + 6))
        weekEnds = new Date(weekEnds.setHours(23, 59, 59, 999))
        
        const data = [0,0,0,0,0,0,0] // set mood 0 for each day
        for (const mood of moods) {
            // check if date is this week
            const moodDate = new Date(mood.date.toDate())
            // check if mood date belongs to current week
            if (moodDate >= weekStarts && moodDate <= weekEnds) {
                dayOfWeek = new Date(mood.date.toDate()).getDay()
                data[dayOfWeek-1] = mood.overall_mood
            }
        }

        this.setState({ isLoading: false })

        return [{
            data
        }]
    }

    render() {
        if (this.state.isLoading || this.state.moods == null) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner color='blue' />
                </View>
            )
        }

        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return (
            <View style={styles.statsContainer}>
                <Text>Overall mood this week (5 = best, 1 = worst)</Text>

                {/* 
                    Linechart example from https://www.npmjs.com/package/react-native-chart-kit 
                    Modified by Kim Lehtinen
                */}
                <BarChart
                data={
                    {
                        labels: weekDays,
                        datasets: this.state.thisWeekOverallMoodData
                    }   
                }
                width={Dimensions.get('window').width-18}
                height={220}
                yAxisLabel=""
                chartConfig={
                    {
                        strokeWidth: 2, // optional, default 3
                        barPercentage: 0.5,
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }
                }
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                verticalLabelRotation={30}
                />
            </View>
        );
    }
}

export default withNavigation(StatsMoodThisWeek)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsContainer: {
        marginBottom: 20
    }
})
