import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, ButtonGroup, Button } from "reactstrap";
import { connect as reduxConnect } from "react-redux";
import "./styles.css";

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

class PreviousNextButtons extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  render() {
    const { previous, previousDisabled, next, nextDisabled } = this.props;
    return (
      <Row className="PreviousNextButtons">
        <Col xs={12} className="Center" tag={ButtonGroup} style={{ marginTop: 20 }}>
          <Col xs={6}>
            <Button disabled={previousDisabled} color="primary" onClick={previous} style={{ fontSize: 20 }}>
              <i className="fas fa-chevron-left" /> Previous
            </Button>
          </Col>
          <Col xs={6}>
            <Button disabled={nextDisabled} color="primary" onClick={next} style={{ fontSize: 20 }}>
              Next <i className="fas fa-chevron-right" />
            </Button>
          </Col>
        </Col>
      </Row>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(PreviousNextButtons);
