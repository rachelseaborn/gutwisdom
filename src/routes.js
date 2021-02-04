import react from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
// import Auth from "./Components/Auth/Auth";
// import Subscribe from "./Components/Subscribe/Subscribe";
import TopicDashboard from "./Components/TopicDashboard/TopicDashboard";
import Messaging from "./Components/Messaging/Messaging";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    {/* <Route path="/auth" component={Auth} />
    <Route path="/subscribe" component={Subscribe} /> */}
    <Route path="/dashboard" component={TopicDashboard} />
    <Route path="/messaging" component={Messaging} />
  </Switch>
);
