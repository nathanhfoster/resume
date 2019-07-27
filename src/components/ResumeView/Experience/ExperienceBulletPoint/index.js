import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./styles.css";

class ExperienceBulletPoint extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    bullet_points: PropTypes.array.isRequired,
    title: PropTypes.string
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
    const { title } = this.props;
    return <li className="ExperienceBulletPoint">{title}</li>;
  }
}
export default ExperienceBulletPoint;
