import React, { Component } from "react";
import BenchService from "../../services/benchService";

export default class EditBench extends Component {

  state = {
    id: this.props.match.params.id,
    bench: null,
  };

  allBenches = new BenchService();

  giveMeBench = () => {
    console.log("did mount");
    console.log(this.props.match.params.id)
    this.allBenches
      .oneBenchGet(this.props.match.params.id)
      .then((data) => {
        console.log(data);
        this.setState({
          bench: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.giveMeBench();
  };

  render() {
    console.log(this.props);
    console.log(this.state.bench);
    console.log(this.props.match.params.id)
    if (this.state.bench < 1) {
        return <h2>Loading...</h2>;
      }
    return (
      <div>
        {/* <p>{this.state.id}</p> */}
        {/* {this.state.bench.location.map(item => (
             <p>{item.lat}</p>
        )
            
        )} */}
        <h4>Add more information</h4>
      <p>Latitude is: {this.state.bench.location.lat}</p>
      <p>Langtitue is: {this.state.bench.location.lng} </p>

        {/* <p>{this.state.bench}</p> */}
      </div>
    );
  }
}

// import React, { Component } from "react";
// import BenchService from "../../services/benchService";
// import { useParams } from "react-router-dom";

// export default class EditBench extends Component {
//  state = {

//  }

//  allBenches = new BenchService();

//   componentDidMount = () => {
//    // const id = this.props.match.params.id

//     let { id } = useParams();
//     console.log(id)
//     // this.allBenches
//     //   .editBenchGet(this.props.match.params.id)
//     //   .then((data) => {
//     //     console.log(data);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   };

//   render() {
//     console.log(this.props)
//     return (
//       <div>
//         <h1>edit bench</h1>
//         <h1>edit bench</h1>
//         <h1>edit bench</h1>
//       </div>
//     );
//   }
// }

// import React, { Component } from "react";
// import { useParams } from "react-router-dom";

// export default function EditBench() {
//     const { id } = useParams()
//     console.log(id)

//     componentDidMount = () => {
//     console.log(this.props)
//     // this.allBenches
//     //   .editBenchGet(this.props.match.params.id)
//     //   .then((data) => {
//     //     console.log(data);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   };
//     return (
//         <div>
//             yo
//         </div>
//     )
// }

// import React from "react";
// import { useParams } from "react-router-dom";

// class EditBench extends React.Component {
//     componentDidMount() {
//         let { id } = useParams();
//         this.fetchData(id);
//     }

//     fetchData = id => {
//         console.log('test')
//     };

//     render() {
//         return <div>Yo</div>;
//     }
// }

// export default EditBench;

// import React from 'react'
// import { useParams } from "react-router-dom";

// export default function EditBench() {

//     componentDidMount = () =>  {
//         let { id } = useParams()
//         console.log(id)
//        // this.fetchData(id);
//     }
//     return (
//         <div>
//             test
//         </div>
//     )
// }
