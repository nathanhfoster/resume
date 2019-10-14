import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect as reduxConnect } from "react-redux";
import { RouteMap } from "../../ReactRouter/routes";
import "./styles.css";
import LoginImage from "../../images/Login.jpg";

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

class BackgroundImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {
    //#fef6ea
    defaultImageGradient: "radial-gradient(circle, #fef6ea, #f7efe2, #f1e8da, #eae1d3, #e4dacb)"
  };

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

  componentDidUpdate() {}

  componentWillUnmount() {}

  renderBackgroundImageGradient = gradient => (
    <div
      className="background"
      style={{
        backgroundImage: gradient
      }}
    />
  );

  renderBackgroundImage = source => <img className="background" src={source} />;

  backgroundRouteMap = route => {
    const { defaultImageGradient } = this.props;
    const DefaultImageGradient = this.renderBackgroundImageGradient(defaultImageGradient);
    const LoginSignupImage = this.renderBackgroundImage(LoginImage);

    switch (route) {
      case RouteMap.HOME:
        return DefaultImageGradient;
      case RouteMap.LOGIN_STUDENT:
        return LoginSignupImage;
      case RouteMap.SIGN_UP:
        return LoginSignupImage;
      default:
        return DefaultImageGradient;
    }
  };

  render() {
    const { history, location, match } = this.props;
    const { pathname } = location;
    const Background = this.backgroundRouteMap(pathname);

    return <div className="BackgroundImage">{Background}</div>;
  }
}
export default withRouter(reduxConnect(mapStateToProps, mapDispatchToProps)(BackgroundImage));
