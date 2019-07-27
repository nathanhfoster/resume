import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect as reduxConnect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { RouteMap } from "./routes";
import "./styles/index.css";
import NavBar from "./components/NavBar";
import BackgroundImage from "./components/BackgroundImage";
import Footer from "./components/Footer";
import Settings from "./views/Settings";
import Home from "./views/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PageNotFound from "./views/PageNotFound";
import { saveState } from "./store/persist";
import { setWindow } from "./actions/App";
import { GetUserSettings } from "./actions/Settings";
import { RouterLinkPush } from "./helpers/routing";

const mapStateToProps = ({ User }) => ({ User });

const mapDispatchToProps = { setWindow, GetUserSettings, saveState };

export class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    User: PropTypes.object,
    setWindow: PropTypes.func.isRequired,
    GetUserSettings: PropTypes.func.isRequired
  };

  static defaultProps = {
    setWindow,
    GetUserSettings,
    saveState
  };

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {
    const { User, GetUserSettings } = this.props;
    window.addEventListener("resize", this.updateWindowDimensions);
    this.updateWindowDimensions();

    if (User.token) GetUserSettings(User.token, User.id);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { saveState } = props;
    // saveState();
    this.setState({});
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  renderRedirectOrComponent = (shouldRedirect, route, Component) => {
    const { history } = this.props;
    return shouldRedirect ? () => <Redirect push to={RouterLinkPush(history, route)} /> : Component;
  };

  routeItems = props => {
    const { User, history } = props;
    const { state } = history.location;
    return [
      {
        path: [RouteMap.SETTINGS],
        component: this.renderRedirectOrComponent(!User.token, RouteMap.HOME, Settings)
      },
      { path: [RouteMap.HOME], component: Home },
      { path: [RouteMap.PRIVACY_POLICY], component: PrivacyPolicy }
    ];
  };

  renderRouteItems = props =>
    this.routeItems(props).map((k, i) => {
      const { path, component } = k;
      return <Route exact key={i} path={path} component={component} />;
    });

  updateWindowDimensions = () => {
    const { setWindow } = this.props;
    const { innerHeight, innerWidth } = window;
    const isMobile = innerWidth < 768;
    setWindow({ innerHeight, innerWidth, isMobile });
    this.setState({ height: innerHeight, width: innerWidth, isMobile });
  };

  render() {
    const { User, history } = this.props;
    const { pathname } = history.location;
    const { isMobile } = this.state;
    const { Settings } = User;
    const { show_footer } = Settings;
    const routeOverlayPosition = isMobile ? "var(--navBarHeightMobile)" : "var(--navBarHeight)";
    return pathname === "/" ? (
      <Redirect to="/home" />
    ) : (
      <div className="App">
        <NavBar />
        <BackgroundImage />
        <div className="routeOverlay" style={{ bottom: show_footer ? routeOverlayPosition : 0 }}>
          <Switch>
            {this.renderRouteItems(this.props)}
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(reduxConnect(mapStateToProps, mapDispatchToProps)(App));
