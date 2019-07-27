import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Col, ButtonGroup, Button } from "reactstrap";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ChangeUser } from "../../actions/User";
import "./styles.css";

const mapStateToProps = ({ User }) => ({ User });

const mapDispatchToProps = { ChangeUser };

class TravelerOrUniversityButtons extends PureComponent {
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
    const { is_traveler } = props.User;
    this.setState({ is_traveler });
  };

  render() {
    const { ChangeUser } = this.props;
    const { is_traveler } = this.state;
    return (
      <Col xs={12} className="Center">
        <span style={{ fontSize: 20 }}>You are a </span>
        <ButtonGroup style={{ marginLeft: 20 }}>
          <Button outline={!is_traveler} color="primary" onClick={() => ChangeUser({ is_traveler: true })}>
            Traveler
          </Button>
          <Button outline={is_traveler} color="primary" onClick={() => ChangeUser({ is_traveler: false })}>
            University
          </Button>
        </ButtonGroup>
      </Col>
    );
  }
}
export default withRouter(reduxConnect(mapStateToProps, mapDispatchToProps)(TravelerOrUniversityButtons));
