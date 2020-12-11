import React, { useState, useEffect } from "react";
import BenchService from "../../services/benchService";

export default function EditBench(props) {
    let allBenches = new BenchService();

    let id = props.match.params.id

    const giveMeBench = () => {
        allBenches.oneBenchGet(id)
        .then(data => {
            console.log(data)
            console.log(data.location)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        giveMeBench()
    }, [])



    console.log(props)
    console.log(props.match.params.id)


    return (
        <div>
            <p>{props.match.params.id}</p>
        </div>
    )
}
