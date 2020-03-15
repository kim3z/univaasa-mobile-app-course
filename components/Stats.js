import * as React from 'react'
import { Dimensions, View, StyleSheet, ScrollView } from 'react-native'
import { Spinner, Text } from 'native-base'
import firebase from 'react-native-firebase'
import { withNavigation } from 'react-navigation'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
import StatsMoodThisWeek from './StatsMoodThisWeek'
import StatsMoodThisYear from './StatsMoodThisYear'

class Stats extends React.Component {
    /*
    A page that shows stats about user moods
    */

    state = { 
        moods: null
    }

    componentDidMount() {
        // get moods from parent component that will be used for stats
        // and passed to stats child components
        const moods = this.props.moods
        this.setState({ moods })
    }

    render() {
        return (
            <>
            {
                this.state.moods &&
                <StatsMoodThisWeek moods={this.state.moods} />
            }
            {
                this.state.moods &&
                <StatsMoodThisYear moods={this.state.moods} />
            }
            </>
        );
    }
}

export default withNavigation(Stats)
