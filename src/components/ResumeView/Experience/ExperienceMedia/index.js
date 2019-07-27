import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import "./styles.css";

class ExperienceMedia extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    media: PropTypes.array.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string
  };

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  render() {
    const { media } = this.props;
    return (
      <Container className="ExperienceMedia Container">
        <Row>
          <Col xs={12}>ExperienceMedia</Col>
        </Row>
      </Container>
    );
  }
}
export default ExperienceMedia;
