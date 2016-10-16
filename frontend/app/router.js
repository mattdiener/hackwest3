import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login', {path:'login/:token'});
  this.route('account', function() {
    this.route('new');
  });

  this.resource('board', function() {
    this.route('new');
    this.route('view', {path:'view/:token'});
  });
});

export default Router;
