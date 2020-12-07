import React, { Component } from 'react'
import BenchService from '../../services/benchService'


export default class EditBench extends Component {
    state = {

    }

    allBenches = new BenchService()

    componentDidMount = () => {
        // this.allBenches.editBenchGet()
        // .then(data => {
        //     console.log(data)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

   
    render() {
        return (
            <div>
                <h1>edit bench</h1>
                <h1>edit bench</h1>
                <h1>edit bench</h1>

            </div>      
        )
    }
}
