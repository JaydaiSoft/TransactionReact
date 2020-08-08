import React from "react";
import { Jumbotron } from 'reactstrap';



class Home extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
              <Jumbotron>
                <h1 className="display-3">Transaction Service</h1>
                <p className="lead">simplifies e-commerce and m-commerce payments for merchants everyday.</p>
              </Jumbotron>
            </div>
          );
    }
}

export default Home;