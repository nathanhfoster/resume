import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./styles.css";

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <Container className="Template Container">
        <Row>
          <Col xs={12}>Template</Col>
        </Row>
      </Container>
    );
  }
}
export default withRouter(reduxConnect(mapStateToProps, mapDispatchToProps)(Template));
