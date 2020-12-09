import React, { Component } from "react";
import BenchService from "../../services/benchService";

export default class EditBench extends Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       id: this.props.match.params.id,
//       bench: null
//     };
//     allBenches = new BenchService();
//   }
  state = {
    id: this.props.match.params.id,
    bench: null
  };
  allBenches = new BenchService();
 

 

  giveMeBench = (id) => {
    console.log("did mount")
    this.allBenches
    //  .oneBenchGet(this.state.id)
    .oneBenchGet(this.state.id)
      .then((data) => {
        console.log(data);
        this.setState({
            bench: data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount = () => {
    this.giveMeBench(this.state.id)
  };

  render() {
    console.log(this.props);
  console.log(this.state.bench)

    return <div>
        <p>{this.state.id}</p>
       
        {/* <p>{this.state.bench}</p> */}
    </div>;
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