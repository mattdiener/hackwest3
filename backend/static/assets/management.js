"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define("management/app", ["exports", "ember", "management/resolver", "ember-load-initializers", "management/config/environment"], function (exports, _ember, _managementResolver, _emberLoadInitializers, _managementConfigEnvironment) {

  var App = undefined;

  _ember["default"].MODEL_FACTORY_INJECTIONS = true;

  App = _ember["default"].Application.extend({
    modulePrefix: _managementConfigEnvironment["default"].modulePrefix,
    podModulePrefix: _managementConfigEnvironment["default"].podModulePrefix,
    Resolver: _managementResolver["default"]
  });

  (0, _emberLoadInitializers["default"])(App, _managementConfigEnvironment["default"].modulePrefix);

  exports["default"] = App;
});
define('management/authenticators/drsauth', ['exports', 'ember-simple-auth/authenticators/base', 'ember'], function (exports, _emberSimpleAuthAuthenticatorsBase, _ember) {
  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    serverLoginEndpoint: '/api/account/login',
    serverLogoutEndpoint: '/api/account/logout',
    loggedIn: false,
    clientId: null,

    restore: function restore() {
      return new RSVP.Promise(function (resolve) {
        // Not needed
        resolve();
      });
    },
    authenticate: function authenticate(identification, password) {
      var _this = this;

      var scope = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new RSVP.Promise(function (resolve, reject) {
        var data = { username: identification, password: password };
        var serverLoginEndpoint = _this.get('serverLoginEndpoint');
        var scopesString = _ember['default'].makeArray(scope).join(' ');
        if (!_ember['default'].isEmpty(scopesString)) {
          data.scope = scopesString;
        }
        _this.makeRequest(serverLoginEndpoint, data).then(function (response) {
          if (response.status === 200) {
            _this.set("loggedIn", true);
            _this.set("clientId", response.clientId);
            resolve(response);
          } else {
            run(null, reject, response.responseJSON || response.responseText);
          }
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },
    invalidate: function invalidate() {
      var _this2 = this;

      var serverLogoutEndpoint = this.get('serverLogoutEndpoint');

      function success(resolve) {
        resolve();
      }

      return new RSVP.Promise(function (resolve, reject) {
        if (!_this2.get("loggedIn") || _this2.clientId == null) {
          success.apply(_this2, [resolve]);
        } else {
          _this2.makeRequest(serverLogoutEndpoint, {
            'clientId': _this2.clientId
          }).then(function (response) {
            run(function () {
              if (response.status === 200) {
                _this2.set("loggedIn", false);
                _this2.set("clientId", null);
                success.apply(_this2, [resolve]);
              } else {
                reject();
              }
            });
          }, function (xhr) {
            run(null, reject, xhr.responseJSON || xhr.responseText);
          });
        }
      });
    },

    makeRequest: function makeRequest(url, data) {
      var options = {
        url: url,
        data: data,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json'
      };

      var clientIdHeader = this.get('_clientIdHeader');
      if (!isEmpty(clientIdHeader)) {
        options.headers = clientIdHeader;
      }

      return _ember['default'].$.ajax(options);
    }
  });
});
define('management/authorizers/drsauth', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend({});
});
define('management/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'management/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _managementConfigEnvironment) {

  var name = _managementConfigEnvironment['default'].APP.name;
  var version = _managementConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('management/components/click-to-edit', ['exports', 'ember-cli-click-to-edit/components/click-to-edit'], function (exports, _emberCliClickToEditComponentsClickToEdit) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliClickToEditComponentsClickToEdit['default'];
    }
  });
});
define('management/components/dynamic-link', ['exports', 'ember', 'dynamic-link/components/dynamic-link'], function (exports, _ember, _dynamicLinkComponentsDynamicLink) {
  exports['default'] = _dynamicLinkComponentsDynamicLink['default'];
});
define('management/components/ember-inline-edit', ['exports', 'ember-inline-edit/components/ember-inline-edit'], function (exports, _emberInlineEditComponentsEmberInlineEdit) {
  exports['default'] = _emberInlineEditComponentsEmberInlineEdit['default'];
});
define('management/components/notification-container', ['exports', 'ember-cli-notifications/components/notification-container'], function (exports, _emberCliNotificationsComponentsNotificationContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliNotificationsComponentsNotificationContainer['default'];
    }
  });
});
define('management/components/notification-message', ['exports', 'ember-cli-notifications/components/notification-message', 'management/config/environment'], function (exports, _emberCliNotificationsComponentsNotificationMessage, _managementConfigEnvironment) {

  var config = _managementConfigEnvironment['default']['ember-cli-notifications'] || {};

  exports['default'] = _emberCliNotificationsComponentsNotificationMessage['default'].extend({
    icons: config.icons || 'font-awesome'
  });
});
define('management/components/slick-slider', ['exports', 'ember-cli-slick/components/slick-slider'], function (exports, _emberCliSlickComponentsSlickSlider) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSlickComponentsSlickSlider['default'];
    }
  });
});
define('management/components/ui-accordion', ['exports', 'semantic-ui-ember/components/ui-accordion'], function (exports, _semanticUiEmberComponentsUiAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiAccordion['default'];
    }
  });
});
define('management/components/ui-checkbox', ['exports', 'semantic-ui-ember/components/ui-checkbox'], function (exports, _semanticUiEmberComponentsUiCheckbox) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiCheckbox['default'];
    }
  });
});
define('management/components/ui-dimmer', ['exports', 'semantic-ui-ember/components/ui-dimmer'], function (exports, _semanticUiEmberComponentsUiDimmer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiDimmer['default'];
    }
  });
});
define('management/components/ui-dropdown', ['exports', 'semantic-ui-ember/components/ui-dropdown'], function (exports, _semanticUiEmberComponentsUiDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiDropdown['default'];
    }
  });
});
define('management/components/ui-embed', ['exports', 'semantic-ui-ember/components/ui-embed'], function (exports, _semanticUiEmberComponentsUiEmbed) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiEmbed['default'];
    }
  });
});
define('management/components/ui-modal', ['exports', 'semantic-ui-ember/components/ui-modal'], function (exports, _semanticUiEmberComponentsUiModal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiModal['default'];
    }
  });
});
define('management/components/ui-nag', ['exports', 'semantic-ui-ember/components/ui-nag'], function (exports, _semanticUiEmberComponentsUiNag) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiNag['default'];
    }
  });
});
define('management/components/ui-popup', ['exports', 'semantic-ui-ember/components/ui-popup'], function (exports, _semanticUiEmberComponentsUiPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiPopup['default'];
    }
  });
});
define('management/components/ui-progress', ['exports', 'semantic-ui-ember/components/ui-progress'], function (exports, _semanticUiEmberComponentsUiProgress) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiProgress['default'];
    }
  });
});
define('management/components/ui-radio', ['exports', 'semantic-ui-ember/components/ui-radio'], function (exports, _semanticUiEmberComponentsUiRadio) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiRadio['default'];
    }
  });
});
define('management/components/ui-rating', ['exports', 'semantic-ui-ember/components/ui-rating'], function (exports, _semanticUiEmberComponentsUiRating) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiRating['default'];
    }
  });
});
define('management/components/ui-search', ['exports', 'semantic-ui-ember/components/ui-search'], function (exports, _semanticUiEmberComponentsUiSearch) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiSearch['default'];
    }
  });
});
define('management/components/ui-shape', ['exports', 'semantic-ui-ember/components/ui-shape'], function (exports, _semanticUiEmberComponentsUiShape) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiShape['default'];
    }
  });
});
define('management/components/ui-sidebar', ['exports', 'semantic-ui-ember/components/ui-sidebar'], function (exports, _semanticUiEmberComponentsUiSidebar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiSidebar['default'];
    }
  });
});
define('management/components/ui-sticky', ['exports', 'semantic-ui-ember/components/ui-sticky'], function (exports, _semanticUiEmberComponentsUiSticky) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberComponentsUiSticky['default'];
    }
  });
});
define('management/helpers/in-arr', ['exports', 'ember-inline-edit/helpers/in-arr'], function (exports, _emberInlineEditHelpersInArr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberInlineEditHelpersInArr['default'];
    }
  });
  Object.defineProperty(exports, 'inArr', {
    enumerable: true,
    get: function get() {
      return _emberInlineEditHelpersInArr.inArr;
    }
  });
});
define('management/helpers/lookup-module-styles', ['exports', 'ember-css-modules/helpers/lookup-module-styles'], function (exports, _emberCssModulesHelpersLookupModuleStyles) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesHelpersLookupModuleStyles['default'];
    }
  });
  Object.defineProperty(exports, 'lookupModuleStyles', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesHelpersLookupModuleStyles.lookupModuleStyles;
    }
  });
});
define('management/helpers/map-value', ['exports', 'semantic-ui-ember/helpers/map-value'], function (exports, _semanticUiEmberHelpersMapValue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberHelpersMapValue['default'];
    }
  });
  Object.defineProperty(exports, 'mapValue', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberHelpersMapValue.mapValue;
    }
  });
});
define('management/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('management/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('management/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'management/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _managementConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_managementConfigEnvironment['default'].APP.name, _managementConfigEnvironment['default'].APP.version)
  };
});
define('management/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('management/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('management/initializers/ember-css-modules', ['exports', 'ember-css-modules/initializers/ember-css-modules'], function (exports, _emberCssModulesInitializersEmberCssModules) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesInitializersEmberCssModules['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesInitializersEmberCssModules.initialize;
    }
  });
});
define('management/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('management/initializers/ember-simple-auth', ['exports', 'ember', 'management/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _managementConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _managementConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _managementConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('management/initializers/export-application-global', ['exports', 'ember', 'management/config/environment'], function (exports, _ember, _managementConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_managementConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _managementConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_managementConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('management/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('management/initializers/notifications', ['exports', 'ember', 'ember-cli-notifications/services/notification-messages-service'], function (exports, _ember, _emberCliNotificationsServicesNotificationMessagesService) {
    exports['default'] = {
        name: 'notification-messages-service',

        initialize: function initialize() {
            var application = arguments[1] || arguments[0];
            if (_ember['default'].Service) {
                application.register('service:notification-messages', _emberCliNotificationsServicesNotificationMessagesService['default']);
                application.inject('component:notification-container', 'notifications', 'service:notification-messages');
                application.inject('component:notification-message', 'notifications', 'service:notification-messages');
                return;
            }
            application.register('notification-messages:service', _emberCliNotificationsServicesNotificationMessagesService['default']);

            ['controller', 'component', 'route', 'router', 'service'].forEach(function (injectionTarget) {
                application.inject(injectionTarget, 'notifications', 'notification-messages:service');
            });
        }
    };
});
define('management/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('management/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("management/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('management/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('management/mixins/base', ['exports', 'semantic-ui-ember/mixins/base'], function (exports, _semanticUiEmberMixinsBase) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _semanticUiEmberMixinsBase['default'];
    }
  });
});
define('management/pods/account/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({});
});
define('management/pods/account/new/controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    actions: {
      createAccount: function createAccount() {
        var _getProperties = this.getProperties('identification', 'password', 'passwordConfirm');

        var identification = _getProperties.identification;
        var password = _getProperties.password;
        var passwordConfirm = _getProperties.passwordConfirm;

        if (password !== passwordConfirm) {
          this.set('errorMessage', "Passwords do not match!");
          return;
        }
        var passwordRegex = /(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$/;
        if (!passwordRegex.test(password)) {
          this.set('errorMessage', 'Your password must have at least one number, one uppercase, one lowercase, and one special character');
          return;
        }
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(identification)) {
          this.set("errorMessage", "That email is invalid");
          return;
        }

        var options = {
          url: '/api/account/new',
          data: {
            identification: identification,
            password: password
          },
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json'
        };

        _ember['default'].$.ajax(options).then(function (response) {
          console.log(response);
        });
      }
    }
  });
});
define('management/pods/account/new/route', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {});
});
define("management/pods/account/new/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 31,
              "column": 18
            },
            "end": {
              "line": 33,
              "column": 18
            }
          },
          "moduleName": "management/pods/account/new/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "errorMessage", ["loc", [null, [32, 25], [32, 41]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 6
          }
        },
        "moduleName": "management/pods/account/new/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "login");
        dom.setAttribute(el1, "class", "fullscreen");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui middle aligned center aligned grid");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "column panel");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        dom.setAttribute(el4, "class", "ui teal image header");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("img");
        dom.setAttribute(el5, "src", "/images/logo-60x60.png");
        dom.setAttribute(el5, "class", "image");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "content");
        var el6 = dom.createTextNode("\n                    Create Account\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "ui large form");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui stacked segment");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "field");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "ui left icon input");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "user icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "field");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "ui left icon input");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "lock icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "field");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "ui left icon input");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "lock icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "ui fluid large teal submit button");
        var el7 = dom.createTextNode("Login");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui error message");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1, 3]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3, 1]), 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [5, 1]), 3, 3);
        morphs[4] = dom.createMorphAt(element1, 9, 9);
        return morphs;
      },
      statements: [["element", "action", ["createAccount"], ["on", "submit"], ["loc", [null, [10, 18], [10, 56]]], 0, 0], ["inline", "input", [], ["id", "identification", "type", "text", "name", "email", "placeholder", "Enter E-mail address", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [15, 120], [15, 134]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [15, 26], [15, 136]]], 0, 0], ["inline", "input", [], ["id", "password", "placeholder", "Enter Password", "type", "password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [21, 99], [21, 107]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [21, 26], [21, 109]]], 0, 0], ["inline", "input", [], ["id", "passwordConfirm", "placeholder", "Confirm Password", "type", "password", "value", ["subexpr", "@mut", [["get", "passwordConfirm", ["loc", [null, [27, 108], [27, 123]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [27, 26], [27, 125]]], 0, 0], ["block", "if", [["get", "errorMessage", ["loc", [null, [31, 24], [31, 36]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [31, 18], [33, 25]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('management/pods/account/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("management/pods/account/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "management/pods/account/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/application/controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    classNames: ["fullscreen"],

    init: function init() {
      console.log(this.session);
    },

    actions: {}
  });
});
define("management/pods/application/route", ["exports", "ember", "ember-simple-auth/mixins/application-route-mixin"], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports["default"] = _ember["default"].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin["default"], {

    actions: {
      invalidateSession: function invalidateSession() {
        this.session.invalidate();
      }
    }
  });
});
define("management/pods/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "management/pods/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/board/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({});
});
define('management/pods/board/new/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("management/pods/board/new/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "management/pods/board/new/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("new board");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/board/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("management/pods/board/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "management/pods/board/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "board");
        dom.setAttribute(el1, "class", "background");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 2], [2, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/board/view/controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    notifications: _ember['default'].inject.service('notification-messages'),
    theModel: null,
    topicElement: null,
    currentSelectedTopicId: null,
    newSuggestion: null,
    currentBoardToken: null,
    currentPlaceDetail: null,
    showRightPanel: false,
    userId: null,

    // SUPER BAD, HACKY TACKY
    interval: 5000,
    url: null,
    timer: null,

    init: function init() {
      var _this = this;

      var self = this;
      _ember['default'].$(document).ready(function () {
        self.initModel();
        _ember['default'].$.getScript('/js/embedTlkio.js');

        var accordion = _ember['default'].$('.topics-accordion').accordion({
          onChange: function onChange() {
            self.set('currentSelectedTopicId', this.getAttribute('data-id'));
          }
        });
        if (accordion) {
          self.set("topicElement", accordion);
        }
      });

      _ember['default'].run.later(function () {
        _this.startPolling(_this.get('interval'));
      }, 10000);
    },

    schedulePollEvent: function schedulePollEvent(event, interval) {
      var _this2 = this;

      var eventInterval = 5000;
      return _ember['default'].run.later(function () {
        event.apply(_this2);
        _this2.set('timer', _this2.schedulePollEvent(event));
      }, eventInterval);
    },

    startPolling: function startPolling(interval) {
      this.set('timer', this.schedulePollEvent(this.get('onPollEvent'), 5000));
    },

    stopPolling: function stopPolling() {
      _ember['default'].run.cancel(this.get('timer'));
    },

    onPollEvent: function onPollEvent() {
      var _this3 = this;

      //make request
      console.log(this.get('url'));
      var opts = {
        url: this.get('url'),
        type: "GET",
        contentType: 'application/json'
      };
      var self = this;
      return _ember['default'].$.ajax(opts).then(function (res) {
        _this3.get('updateView')(res, self);
      });
    },
    initModel: function initModel() {
      var model = this.get("model");
      if (model && model.status === 200) {
        this.set('theModel', model);
        this.set('currentBoardToken', model.boardId);
        this.set('userId', JSON.parse(localStorage.boardUsers)[this.get('model.boardId')]);
        this.set('url', '/boards/' + this.get('model.boardId'));
        console.log("ok");
      }
    },

    updateView: function updateView(newModel, self) {
      console.log("updateView called");
      var model = self.get("model");

      if (model.board.name != newModel.board.name) {
        self.set("model.board.name", newModel.board.name);
      }

      for (var i = 0; i < newModel.board.topics.length; i++) {
        var matchingTopic = null;
        for (var j = 0; j < model.board.topics.length; j++) {
          if (newModel.board.topics[i].topicId == model.board.topics[j].topicId) {
            matchingTopic = model.board.topics[j];
            break;
          }
        }
        if (!matchingTopic) {
          self.get("model.board.topics").pushObject(newModel.board.topics[i]);
        } else {
          for (var k = 0; k < newModel.board.topics[i].suggestions.length; k++) {
            var matchingSuggestion = null;
            for (var l = 0; l < matchingTopic.suggestions.length; l++) {
              if (newModel.board.topics[i].suggestions[k].suggestionId == matchingTopic.suggestions[l].suggestionId) {
                matchingSuggestion = newModel.board.topics[i].suggestions[k];
                break;
              }
            }
            if (!matchingSuggestion) {
              //Ember.pushObject(matchingTopic, 'suggestions', k);
              matchingTopic.suggestions.pushObject(newModel.board.topics[i].suggestions[k]);
            } else {
              // HACK to update vote count
              _ember['default'].$('#vote_' + newModel.board.topics[i].suggestions[k].suggestionId).text(newModel.board.topics[i].suggestions[k].voteCount);
              _ember['default'].set(matchingSuggestion, 'voteCount', newModel.board.topics[i].suggestions[k].voteCount);
              _ember['default'].set(matchingSuggestion, 'votes', newModel.board.topics[i].suggestions[k].votes);
              // matchingSuggestion.voteCount.set(newModel.board.topics[i].suggestions[k].voteCount);
              // matchingSuggestion.votes.set(newModel.board.topics[i].suggestions[k].votes);
            }
          }
        }
      }
    },

    //
    willDestroy: function willDestroy() {
      this._super();
      this.stopPolling();
    },

    actions: {

      launchPlaceDetail: function launchPlaceDetail(detail) {
        console.log(detail);
        this.set('showRightPanel', true);
        this.set('currentPlaceDetail', detail);
      },

      changeValue: function changeValue(val) {
        var _this4 = this;

        if (val === "") {
          console.log("what the fk");
          return;
        }
        console.log(val);
        var opts = {
          url: '/boards/' + this.get('currentBoardToken'),
          type: 'PUT',
          // dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ name: val })
        };
        var self = this;
        _ember['default'].$.ajax(opts).then(function (result) {
          _this4.get('notifications').success('Title changed!', {
            autoClear: true,
            clearDuration: 1200
          });
          self.set('model.name', result.board.name);
        }, function (xhr) {
          _this4.get('notifications').error('Error changing topic!', {
            autoClear: true,
            clearDuration: 1200
          });
        });
      },

      addTopic: function addTopic() {
        var _this5 = this;

        console.log(this.newTopic);
        if (!this.newTopic) {
          return;
        }
        var opts = {
          url: '/boards/' + this.get('currentBoardToken') + "/topics",
          type: 'POST',
          // dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ name: this.newTopic })
        };
        console.log(this.get('model.topics'));
        var self = this;
        _ember['default'].$.ajax(opts).then(function (result) {
          _this5.get('notifications').success('Topic added!', {
            autoClear: true,
            clearDuration: 1200
          });
          // Add this new topic into
          self.get('model.board.topics').pushObject(result);
          self.set('newTopic', "");
        }, function (xhr) {
          _this5.get('notifications').error('Error adding topic!', {
            autoClear: true,
            clearDuration: 1200
          });
        });
      }
    }
  });
});
define('management/pods/board/view/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    url: null,

    model: function model(params, trans) {
      var url = '/boards/' + params.token;
      this.set("url", url);
      // list of topics
      // chat url
      //

      if (localStorage.boardUsers) {
        var currentBoardUsers = JSON.parse(localStorage.boardUsers);
        if (!currentBoardUsers[params.token]) {
          this.transitionTo('login', params.token);
        }
      } else {
        localStorage.boardUsers = "{}";
        this.transitionTo('login', params.token);
      }

      console.log(params);
      console.log(trans);
      return _ember['default'].$.getJSON(url);
      /*
      return {
        token: "kkk",
        status: 200,
        board: {
          name: "My trip to New York",
          topics: [{
            name: "Breakfast at restaurant 1",
            topicId: "123",
            boardId:"lolo",
            suggestions: [{
              name: "Restaurante specialize",
              suggestionId: "434234",
              voteCount: 6
            }, {
              name: "Bakers Dohn0ts",
              suggestionId: "4223",
              voteCount: 2
            }]
          }, {
            name: "Lunch at restaurant 2",
            topicId: "432",
            boardId:"poop",
            suggestions: [{
              name: "Burgers r Us",
              suggestionId: "6546",
              voteCount: 2
            }, {
              name: "Sandwhiches Woah",
              suggestionId: "534",
              voteCount: 7
            }]
          }],
          chatToken: "aksh"
        }
      };*/
    }
  });
});
/*
afterModel: function (model, transition) {
  this.get('poll').setup({
    name: 'boardPoll', // a poll name should be unique
    resource_name: 'board', // a resource name
    url: this.url // url to fetch resource
  });
},
actions: {
  willTransition: function (transition) {
    this._super(transition);
    this.get('poll').removePoll('boardPoll'); // remove the resource from polling
  },
}
*/
define("management/pods/board/view/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 38,
                  "column": 30
                },
                "end": {
                  "line": 40,
                  "column": 30
                }
              },
              "moduleName": "management/pods/board/view/template.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                                ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "board-topic", [], ["topic", ["subexpr", "@mut", [["get", "topic", ["loc", [null, [39, 52], [39, 57]]], 0, 0, 0, 0]], [], [], 0, 0], "action", "launchPlaceDetail"], ["loc", [null, [39, 32], [39, 86]]], 0, 0]],
            locals: ["topic"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 37,
                "column": 28
              },
              "end": {
                "line": 41,
                "column": 28
              }
            },
            "moduleName": "management/pods/board/view/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.board.topics", ["loc", [null, [38, 38], [38, 56]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [38, 30], [40, 39]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 6
            },
            "end": {
              "line": 67,
              "column": 6
            }
          },
          "moduleName": "management/pods/board/view/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "ui container");
          dom.setAttribute(el1, "id", "menu-container");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "ui secondary menu");
          dom.setAttribute(el2, "id", "top-menu");
          var el3 = dom.createTextNode("\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "item");
          dom.setAttribute(el3, "id", "board-title");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("p");
          dom.setAttribute(el4, "class", "ui form pseudo-h2");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "item");
          dom.setAttribute(el3, "id", "board-title");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("p");
          dom.setAttribute(el4, "class", "ui form pseudo-h2");
          var el5 = dom.createTextNode("\n                        http://GetOut.site/board/view/");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "ui equal height grid");
          dom.setAttribute(el1, "id", "main-ui");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "three column row");
          var el3 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "five wide column chat full-height");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "id", "tlkio-cover");
          var el5 = dom.createTextNode("Chat");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "id", "tlkio");
          dom.setAttribute(el4, "style", "width:100%;height:100%;");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("                  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "six wide column full-height");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "ui raised segments suggestion full-height");
          var el5 = dom.createTextNode("\n                          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "ui segment");
          dom.setAttribute(el5, "id", "topic-view");
          var el6 = dom.createTextNode("\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("                          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "ui secondary segment");
          dom.setAttribute(el5, "id", "topic-input");
          var el6 = dom.createTextNode("\n                              ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "add-topic");
          var el7 = dom.createTextNode("\n                                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "topic-input");
          var el8 = dom.createTextNode("\n                                      ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "ui input the-topic");
          var el9 = dom.createTextNode("\n                                        ");
          dom.appendChild(el8, el9);
          var el9 = dom.createComment("");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                                      ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "topic-add-input");
          var el8 = dom.createTextNode("\n                                      ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("button");
          dom.setAttribute(el8, "class", "ui button add-button");
          var el9 = dom.createTextNode("\n                                          ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("i");
          dom.setAttribute(el9, "class", "plus icon");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                              ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "five wide column info");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "id", "places-details");
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "rightDetailPanel fullscreen");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var element1 = dom.childAt(fragment, [3, 1]);
          var element2 = dom.childAt(element1, [1, 4]);
          var element3 = dom.childAt(element1, [3, 1]);
          var element4 = dom.childAt(element3, [3, 1]);
          var element5 = dom.childAt(element4, [3, 1]);
          var morphs = new Array(8);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1]), 1, 1);
          morphs[2] = dom.createAttrMorph(element2, 'data-channel');
          morphs[3] = dom.createAttrMorph(element2, 'data-nickname');
          morphs[4] = dom.createMorphAt(dom.childAt(element3, [1]), 1, 1);
          morphs[5] = dom.createMorphAt(dom.childAt(element4, [1, 1]), 1, 1);
          morphs[6] = dom.createAttrMorph(element5, 'onclick');
          morphs[7] = dom.createMorphAt(dom.childAt(element1, [5, 3]), 1, 1);
          return morphs;
        },
        statements: [["inline", "ember-inline-edit", [], ["class", "field", "value", ["subexpr", "@mut", [["get", "model.board.name", ["loc", [null, [12, 30], [12, 46]]], 0, 0, 0, 0]], [], [], 0, 0], "onClose", ["subexpr", "action", ["changeValue", ["get", "model.board.name", ["loc", [null, [13, 54], [13, 70]]], 0, 0, 0, 0]], [], ["loc", [null, [13, 32], [13, 71]]], 0, 0]], ["loc", [null, [10, 24], [13, 73]]], 0, 0], ["content", "model.board.boardId", ["loc", [null, [19, 54], [19, 77]]], 0, 0, 0, 0], ["attribute", "data-channel", ["concat", [["get", "model.board.chatToken", ["loc", [null, [30, 54], [30, 75]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "data-nickname", ["concat", [["get", "userId", ["loc", [null, [30, 96], [30, 102]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["block", "ui-accordion", [], ["class", "styled topics-accordion"], 0, null, ["loc", [null, [37, 28], [41, 45]]]], ["inline", "input", [], ["id", "the-topic", "type", "text", "placeholder", "Enter new topic", "value", ["subexpr", "@mut", [["get", "newTopic", ["loc", [null, [47, 111], [47, 119]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [47, 40], [47, 121]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["addTopic"], [], ["loc", [null, [null, null], [51, 104]]], 0, 0], 0, 0, 0, 0], ["inline", "google-place", [], ["place", ["subexpr", "@mut", [["get", "currentPlaceDetail", ["loc", [null, [62, 45], [62, 63]]], 0, 0, 0, 0]], [], [], 0, 0], "display", ["subexpr", "@mut", [["get", "showRightPanel", ["loc", [null, [62, 72], [62, 86]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [62, 24], [62, 88]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 67,
              "column": 6
            },
            "end": {
              "line": 76,
              "column": 6
            }
          },
          "moduleName": "management/pods/board/view/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "five wide column chat");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "six wide column");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "ui segment");
          var el3 = dom.createTextNode("\n                  No topics found, are you sure the token you entered was correct?\n              ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "five wide column info");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 79,
            "column": 0
          }
        },
        "moduleName": "management/pods/board/view/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "main-board");
        dom.setAttribute(el1, "class", "full height");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui");
        dom.setAttribute(el2, "id", "boxything");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "notification-container", [], ["position", "top-right"], ["loc", [null, [1, 0], [1, 47]]], 0, 0], ["block", "if", [["get", "theModel", ["loc", [null, [5, 12], [5, 20]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [5, 6], [76, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('management/pods/components/board-suggestion/component', ['exports', 'ember'], function (exports, _ember) {
  var _this = this;

  exports['default'] = _ember['default'].Component.extend({
    notifications: _ember['default'].inject.service('notification-messages'),
    suggestionId: _ember['default'].computed('suggestion', function () {
      return _this.get('suggestion.suggestionId');
    }),
    disableYes: false,
    disableNo: false,
    userId: '',
    uniqueKey: null,

    didInsertElement: function didInsertElement() {
      this.set('userId', JSON.parse(localStorage.boardUsers)[this.get('suggestion.boardId')]);
      this.set('uniqueKey', "vote_" + this.get('suggestion.suggestionId'));
      var voters = this.get('suggestion.votes');
      if (voters) {
        for (var i = 0; i < voters.length; i++) {
          // TODO: change userId once we got this right
          if (voters[i].name === this.userId) {
            localStorage[this.get('suggestion.suggestionId')] = voters[i].vote;
            break;
          }
        }
      }
    },
    willRender: function willRender() {
      var votedForThis = localStorage[this.get('suggestion.suggestionId')];
      if (votedForThis) {
        console.log("found voted for this ", votedForThis);
        if (votedForThis === "1") {
          // true case
          this.set("disableYes", true);
          this.set("disableNo", false);
        } else if (votedForThis === "0") {
          this.set("disableYes", false);
          this.set("disableNo", true);
        }
      }
    },

    actions: {
      loadPlaceDetails: function loadPlaceDetails(placeId) {
        var placedetail = new google.maps.places.PlacesService(document.getElementById("places-details"));
        var self = this;
        placedetail.getDetails({ placeId: placeId }, function (result, status) {
          // Propoate this up to controller
          self.sendAction('action', result);
        });
        // this.sendAction('action', 'poop');
      },

      vote: function vote(yes) {
        var _this2 = this;

        var urlToPut = "/boards/" + this.get('suggestion.boardId') + "/topics/" + this.get('suggestion.topicId') + "/suggestions/" + this.get('suggestion.suggestionId') + "/vote";
        var opts = {
          url: urlToPut,
          type: 'PUT',
          // dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            name: this.userId,
            vote: yes ? 1 : 0
          })
        };

        var self = this;
        _ember['default'].$.ajax(opts).then(function (result) {
          _this2.get('notifications').success('Vote submitted!', {
            autoClear: true,
            clearDuration: 1200
          });
          // Add this new topic into
          localStorage[_this2.get('suggestion.suggestionId')] = yes ? 1 : 0;
          self.set("suggestion.voteCount", result.voteCount);
          console.log(result.voteCount);
          _this2.willRender();
        }, function (xhr) {
          _this2.get('notifications').error('Error voting!', {
            autoClear: true,
            clearDuration: 1200
          });
          /*
          localStorage[this.get('suggestion.suggestionId')] = yes ? 1 : 0;
          let currentVote = self.get('suggestion.voteCount');
          const increment =  yes ? self.get('disableNo') ? 2 : 1 : self.get("disableYes") ? -2 : -1;
          currentVote += increment;
          self.set("suggestion.voteCount", currentVote);
          */
        });
      }
    }
  });
});
define("management/pods/components/board-suggestion/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "management/pods/components/board-suggestion/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui horizontal clearing segment");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui suggestion-vote");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "ui vertical buttons");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "ui button suggestion-button suggestion-up");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "arrow up icon");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "ui button suggestion-button suggestion-down");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "arrow down icon");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui suggestion-ok");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "green check icon");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui suggestion-name");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1, 1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var element4 = dom.childAt(element0, [3, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element0, 'data-id');
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createAttrMorph(element2, 'disabled');
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createAttrMorph(element3, 'disabled');
        morphs[5] = dom.createElementMorph(element3);
        morphs[6] = dom.createAttrMorph(element4, 'id');
        morphs[7] = dom.createMorphAt(element4, 0, 0);
        morphs[8] = dom.createMorphAt(dom.childAt(element0, [5, 1]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "data-id", ["concat", [["get", "suggestion.suggestionId", ["loc", [null, [3, 55], [3, 78]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["loadPlaceDetails", ["get", "suggestion.placeId", ["loc", [null, [3, 110], [3, 128]]], 0, 0, 0, 0]], [], ["loc", [null, [3, 82], [3, 130]]], 0, 0], ["attribute", "disabled", ["get", "disableYes", ["loc", [null, [6, 98], [6, 108]]], 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["vote", true], [], ["loc", [null, [6, 64], [6, 86]]], 0, 0], ["attribute", "disabled", ["get", "disableNo", ["loc", [null, [7, 101], [7, 110]]], 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["vote", false], [], ["loc", [null, [7, 66], [7, 89]]], 0, 0], ["attribute", "id", ["get", "uniqueKey", ["loc", [null, [11, 17], [11, 26]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "suggestion.voteCount", ["loc", [null, [11, 29], [11, 53]]], 0, 0, 0, 0], ["content", "suggestion.name", ["loc", [null, [15, 10], [15, 29]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/components/board-topic/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend(_ember['default'].Evented, {

    notifications: _ember['default'].inject.service('notification-messages'),
    uniqueTextBox: (function () {
      return "places-autcomplete" + "_" + this.get('topic.topicId');
    }).property('topic'),
    currentPlaceId: null,

    didInsertElement: function didInsertElement() {
      var self = this;
      // self.set('autoCompleteElement', Ember.$('.places-autocomplete'));
      // var k = Ember.$("")
      console.log(document.getElementById(this.get('uniqueTextBox')));
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.get('uniqueTextBox')), { types: ['establishment'] });
      // self.set('googleAutocompleter', autocomplete);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace().place_id;
        console.log(place);
        self.set('currentPlaceId', place);
        var p = document.getElementById("places-details");
        console.log(p);
        var placedetail = new google.maps.places.PlacesService(document.getElementById("places-details"));
        placedetail.getDetails({ placeId: place }, function (result, status) {
          console.log(result, status);
          self.sendAction('action', result);
        });
      });
      // });
    },

    actions: {

      launchPlaceDetail: function launchPlaceDetail(param) {
        // propogate event up to controller
        this.sendAction('action', param);
      },

      addSuggestion: function addSuggestion() {
        var _this = this;

        console.log(this.currentSelectedTopicId);
        console.log(this.newSuggestion);
        var boardId = this.get("topic.boardId");
        var topicId = this.get('topic.topicId');
        var placeId = this.get('currentPlaceId');
        // this.set("newSuggestion", Ember.$("#the-suggestion").text());
        console.log(this.newSuggestion, boardId);
        if (!boardId || !topicId || !this.newSuggestion) {
          console.log('hi');
          return;
        }

        var urlToPost = "/boards/" + boardId + "/topics/" + topicId + "/suggestions";
        console.log(urlToPost);
        var opts = {
          url: urlToPost,
          type: 'POST',
          // dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ name: this.newSuggestion, placeId: placeId })
        };

        var self = this;
        _ember['default'].$.ajax(opts).then(function (result) {
          _this.get('notifications').success('Suggestion added!', {
            autoClear: true,
            clearDuration: 1200
          });
          // clear text box then add notification
          self.set('newSuggestion', "");
          _this.get('topic.suggestions').pushObject(result);
        }, function (xhr) {
          _this.get('notifications').error('Error adding suggestion!', {
            autoClear: true,
            clearDuration: 1200
          });
          console.log(_this.get('topic.suggestions'));
        });
      }
    }

  });
});
define("management/pods/components/board-topic/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 4
              },
              "end": {
                "line": 9,
                "column": 4
              }
            },
            "moduleName": "management/pods/components/board-topic/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "board-suggestion", [], ["action", ["subexpr", "@mut", [["get", "action", ["loc", [null, [8, 34], [8, 40]]], 0, 0, 0, 0]], [], [], 0, 0], "suggestion", ["subexpr", "@mut", [["get", "suggestion", ["loc", [null, [8, 52], [8, 62]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [8, 8], [8, 64]]], 0, 0]],
          locals: ["suggestion"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "management/pods/components/board-topic/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "topic.suggestions", ["loc", [null, [7, 12], [7, 29]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [7, 4], [9, 13]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "management/pods/components/board-topic/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      No suggestions found, start by entering one below\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "management/pods/components/board-topic/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "content");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "add-suggestion");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "suggestion-input");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui input the-suggestion");
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "suggestion-add-input");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "ui button add-button");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "plus icon");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element0, 'data-id');
        morphs[2] = dom.createMorphAt(element0, 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 1, 1);
        morphs[4] = dom.createAttrMorph(element2, 'onclick');
        return morphs;
      },
      statements: [["content", "topic.name", ["loc", [null, [3, 2], [3, 16]]], 0, 0, 0, 0], ["attribute", "data-id", ["concat", [["get", "topic.topicId", ["loc", [null, [5, 32], [5, 45]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "topic.suggestions", ["loc", [null, [6, 8], [6, 25]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [6, 2], [12, 9]]]], ["inline", "input", [], ["type", "text", "id", ["subexpr", "@mut", [["get", "uniqueTextBox", ["loc", [null, [16, 37], [16, 50]]], 0, 0, 0, 0]], [], [], 0, 0], "placeholder", "Enter new suggestion", "value", ["subexpr", "@mut", [["get", "newSuggestion", ["loc", [null, [16, 93], [16, 106]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [16, 14], [16, 108]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["addSuggestion"], [], ["loc", [null, [null, null], [20, 83]]], 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('management/pods/components/google-place/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['fullscreen'],
    display: false,
    photos: _ember['default'].computed('place.photos@each', function () {
      if (!this.get('place') || !this.get('place.photos')) {
        return;
      }
      console.log(this.get('place.photos'));
      return this.get('place.photos').map(function (photo) {
        console.log(_ember['default'].$(photo.html_attributions[0]).attr('href'));
        return {
          'url': _ember['default'].$(photo.html_attributions[0]).attr('href')
        };
      });
    }),

    uiSetup: (function () {}).on('didInsertElement').observes('place'),

    getType: (function () {
      var place = this.get('place');
      if (place && place.types) {
        var type = place.types[0];
        var icon = "";
        if (type === 'logding') {
          icon = "<i class='hotel icon'></i>";
        } else if (type === 'food') {
          icon = "<i class='food icon'></i>";
        }
        type = type.charAt(0).toUpperCase() + type.slice(1);
        type = type.replace(/_/g, " ");
        console.log(type + "  + icon");
        return new _ember['default'].Handlebars.SafeString(type + " " + icon);
      }
      return false;
    }).property('place.types'),

    showReviews: (function () {
      var place = this.get('place');
      if (place && place.reviews) {
        console.log(place.reviews);
        var reviewOne = place.reviews[0];
        var reviewTwo = undefined;
        var reviews = [reviewOne];
        if (place.reviews.length > 1) {
          reviewTwo = place.reviews[1];
          reviews.push(reviewTwo);
        }
        return reviews;
      }
      return [];
    }).property('places.reviews'),

    actions: {}
  });
});
define("management/pods/components/google-place/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 18
              },
              "end": {
                "line": 9,
                "column": 18
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "getType", ["loc", [null, [8, 20], [8, 31]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 10
              },
              "end": {
                "line": 23,
                "column": 10
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place-name ui center");
            var el2 = dom.createElement("h2");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0]), 0, 0);
            return morphs;
          },
          statements: [["content", "place.name", ["loc", [null, [22, 52], [22, 66]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 24,
                "column": 10
              },
              "end": {
                "line": 26,
                "column": 10
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place-adress");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "pin icon");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("i");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
            return morphs;
          },
          statements: [["content", "place.formatted_address", ["loc", [null, [25, 67], [25, 94]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 10
              },
              "end": {
                "line": 30,
                "column": 10
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place-country");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "text telephone icon");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("i");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
            return morphs;
          },
          statements: [["content", "place.formatted_phone_number", ["loc", [null, [28, 79], [28, 111]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 10
              },
              "end": {
                "line": 33,
                "column": 10
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place-rating");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "star icon");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" / 5");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "place.rating", ["loc", [null, [32, 65], [32, 81]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child5 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 39,
                "column": 20
              },
              "end": {
                "line": 43,
                "column": 20
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "item review-item");
            var el2 = dom.createTextNode("\n                          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "hours", ["loc", [null, [41, 26], [41, 35]]], 0, 0, 0, 0]],
          locals: ["hours"],
          templates: []
        };
      })();
      var child6 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 47,
                "column": 16
              },
              "end": {
                "line": 50,
                "column": 16
              }
            },
            "moduleName": "management/pods/components/google-place/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n                    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "target", "_blank");
            var el2 = dom.createTextNode("Full Details");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [4]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'href');
            return morphs;
          },
          statements: [["attribute", "href", ["get", "place.url", ["loc", [null, [49, 46], [49, 55]]], 0, 0, 0, 0], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 57,
              "column": 0
            }
          },
          "moduleName": "management/pods/components/google-place/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "google-places");
          dom.setAttribute(el1, "class", "ui segments fullscreen");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "ui segment");
          dom.setAttribute(el2, "style", "height:100%;");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "top-section");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "floated right");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("iframe");
          dom.setAttribute(el4, "width", "100%");
          dom.setAttribute(el4, "height", "40%");
          dom.setAttribute(el4, "frameborder", "0");
          dom.setAttribute(el4, "style", "border:0");
          dom.setAttribute(el4, "allowfullscreen", "");
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "ui horizontal segments reviews-section-wrapper");
          dom.setAttribute(el3, "style", "height:40%;");
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "ui segment reviews-section");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("h5");
          var el6 = dom.createTextNode("Hours");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "ui list");
          var el6 = dom.createTextNode("\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("                  ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "ui segment reviews-section");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("              ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 1]);
          var element2 = dom.childAt(element1, [3, 1]);
          var element3 = dom.childAt(element1, [10]);
          var morphs = new Array(8);
          morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 1, 1);
          morphs[1] = dom.createAttrMorph(element2, 'src');
          morphs[2] = dom.createMorphAt(element1, 5, 5);
          morphs[3] = dom.createMorphAt(element1, 6, 6);
          morphs[4] = dom.createMorphAt(element1, 7, 7);
          morphs[5] = dom.createMorphAt(element1, 8, 8);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1, 3]), 1, 1);
          morphs[7] = dom.createMorphAt(dom.childAt(element3, [3]), 1, 1);
          return morphs;
        },
        statements: [["block", "if", [["get", "place.types", ["loc", [null, [7, 24], [7, 35]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [7, 18], [9, 25]]]], ["attribute", "src", ["concat", ["https://www.google.com/maps/embed/v1/place?key=AIzaSyC5FOY5oJRLhMF5OzY2A__zM8gM47MXfYg&zoom=15&q=place_id:", ["get", "place.place_id", ["loc", [null, [17, 137], [17, 151]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "place.name", ["loc", [null, [21, 16], [21, 26]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [21, 10], [23, 17]]]], ["block", "if", [["get", "place.formatted_address", ["loc", [null, [24, 16], [24, 39]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [24, 10], [26, 17]]]], ["block", "if", [["get", "place.formatted_phone_number", ["loc", [null, [27, 16], [27, 44]]], 0, 0, 0, 0]], [], 3, null, ["loc", [null, [27, 10], [30, 17]]]], ["block", "if", [["get", "place.rating", ["loc", [null, [31, 16], [31, 28]]], 0, 0, 0, 0]], [], 4, null, ["loc", [null, [31, 10], [33, 17]]]], ["block", "each", [["get", "place.opening_hours.weekday_text", ["loc", [null, [39, 28], [39, 60]]], 0, 0, 0, 0]], [], 5, null, ["loc", [null, [39, 20], [43, 29]]]], ["block", "if", [["get", "place.url", ["loc", [null, [47, 22], [47, 31]]], 0, 0, 0, 0]], [], 6, null, ["loc", [null, [47, 16], [50, 23]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5, child6]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 0
          }
        },
        "moduleName": "management/pods/components/google-place/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "display", ["loc", [null, [1, 6], [1, 13]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [57, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('management/pods/components/top-nav/component', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'top-nav',
    classNames: ['top-nav'],
    sideBarElement: null,

    didInsertElement: function didInsertElement() {
      this.set("sideBarElement", this.$(".ui.simple.sidebar.menu"));
    },

    actions: {
      toggle: function toggle(el) {
        console.log(el);
        this.sideBarElement.sidebar('toggle');
        // this.$(".ui.fixed.main.menu").sidebar('toggle');
      }
    }
  });
});
define("management/pods/components/top-nav/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 6
          }
        },
        "moduleName": "management/pods/components/top-nav/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui fixed inverted main menu");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "launch icon item");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "content icon");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "item");
        var el4 = dom.createTextNode("\n            Management\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "right menu");
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "vertically fitted borderless item");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("iframe");
        dom.setAttribute(el5, "class", "github");
        dom.setAttribute(el5, "src", "http://ghbtns.com/github-btn.html?user=semantic-org&repo=semantic-ui&type=watch&count=true");
        dom.setAttribute(el5, "allowtransparency", "true");
        dom.setAttribute(el5, "frameborder", "0");
        dom.setAttribute(el5, "scrolling", "0");
        dom.setAttribute(el5, "width", "100");
        dom.setAttribute(el5, "height", "20");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui simple sidebar inverted vertical menu left");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "item");
        var el3 = dom.createTextNode("Item 1");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "item");
        var el3 = dom.createTextNode("Item 2");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "item");
        var el3 = dom.createTextNode("Item 3");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["toggle"], [], ["loc", [null, [3, 36], [3, 55]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/index/controller', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		boardToken: null,
		boardName: null,

		boardURI: _ember['default'].computed('boardToken', function () {
			return "board/view/" + this.get('boardToken');
		}),

		init: function init() {
			_ember['default'].$(document).ready(function () {
				console.log("ready!");
				// fix menu when passed
				_ember['default'].$('.masthead').visibility({
					once: false,
					onBottomPassed: function onBottomPassed() {
						_ember['default'].$('.fixed.menu').transition('fade in');
					},
					onBottomPassedReverse: function onBottomPassedReverse() {
						_ember['default'].$('.fixed.menu').transition('fade out');
					}
				});
				_ember['default'].$('.huge.primay.button').api({
					action: ' sign in',
					on: 'onclick'
				});

				// create sidebar and attach to menu open
				_ember['default'].$('.ui.sidebar').sidebar('attach events', '.toc.item');
			});
		},

		// Get Token?
		session: _ember['default'].inject.service('session'),
		actions: {

			goToBoard: function goToBoard() {
				var token = this.get('boardToken');
				if (token) {
					this.send('goToBoardRoute', token);
				}
			},

			createBoard: function createBoard() {
				var _this = this;

				var urlToPost = "/boards";
				var token = this.get('boardName');
				var opts = {
					url: urlToPost,
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({ name: this.get('boardName') })
				};
				var self = this;
				_ember['default'].$.ajax(opts).then(function (results) {
					_this.transitionToRoute('board.view', results.board.boardId);
				});
			}
		}

		/* UI
  $('.ui.sticky')
    .sticky({
  	context: '#login'
    })*/

	});
});
define('management/pods/index/route', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {

		actions: {
			goToBoardRoute: function goToBoardRoute(slug) {
				this.transitionTo('board.view', slug);
			}
		}

	});
});
define("management/pods/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 52,
            "column": 0
          }
        },
        "moduleName": "management/pods/index/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Page Contents ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "pusher");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui inverted vertical masthead center aligned segment");
        var el3 = dom.createTextNode("\n\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "ui vertical masthead center aligned segment");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui 2 column row  grid");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui black inverted four wide column");
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "ui container");
        var el7 = dom.createTextNode("\n				");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h1");
        dom.setAttribute(el7, "class", "ui inverted header");
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("img");
        dom.setAttribute(el8, "src", "/images/plane.png");
        dom.setAttribute(el8, "class", "ui small image");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					GetOut.site\n				");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "ui blue inverted stacked two wide segment");
        var el7 = dom.createTextNode("\n\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "ui left icon input");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "diamond icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "class", "ui button");
        var el8 = dom.createTextNode("Login");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						or\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "ui left icon input");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "user icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("button");
        dom.setAttribute(el7, "class", "ui button");
        var el8 = dom.createTextNode("Create Planning Board");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui inverted twelve wide column");
        var el6 = dom.createTextNode("\n\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", " ui vertical segment");
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", " ui segment");
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("img");
        dom.setAttribute(el8, "class", "ui fluid image");
        dom.setAttribute(el8, "src", "/images/images.png");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", " ui  top segment");
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h1");
        dom.setAttribute(el8, "class", "ui blue  header");
        var el9 = dom.createTextNode(" Organize Your Travel Plans ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h2");
        var el9 = dom.createTextNode(" GetOut.site offers travellers a way to easily communicate, share events and plan");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h1");
        dom.setAttribute(el8, "class", "ui blue  header");
        var el9 = dom.createTextNode("Easy Communication");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h2");
        var el9 = dom.createTextNode(" The votte feature allows users to vote about events, accomadations, restaurants and more");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n				");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1, 1, 1, 3]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [11]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[1] = dom.createAttrMorph(element1, 'href');
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [9]), 1, 1);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "name", "token", "placeholder", "Enter Token", "value", ["subexpr", "@mut", [["get", "boardToken", ["loc", [null, [18, 72], [18, 82]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [18, 7], [18, 84]]], 0, 0], ["attribute", "href", ["concat", [["get", "boardURI", ["loc", [null, [21, 35], [21, 43]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "input", [], ["type", "text", "name", "name", "placeholder", "Name of Trip", "value", ["subexpr", "@mut", [["get", "boardName", ["loc", [null, [26, 74], [26, 83]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [26, 7], [26, 85]]], 0, 0], ["element", "action", ["createBoard"], [], ["loc", [null, [29, 33], [29, 57]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('management/pods/login/controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      login: function login() {
        var _getProperties = this.getProperties('identification');

        var identification = _getProperties.identification;

        var currentBoardUsers = JSON.parse(localStorage.boardUsers);

        console.log(identification);
        console.log(this.get('model'));

        currentBoardUsers[this.get('model')] = identification;
        localStorage.boardUsers = JSON.stringify(currentBoardUsers);

        this.transitionToRoute('board.view', this.get('model'));
      }
    }
  });
});
define('management/pods/login/route', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    model: function model(params) {
      if (!params.token) {
        this.transitionTo('index');
      }
      return params.token;
    }
  });
});
define("management/pods/login/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 20
            },
            "end": {
              "line": 15,
              "column": 20
            }
          },
          "moduleName": "management/pods/login/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "errorMessage", ["loc", [null, [14, 27], [14, 43]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "management/pods/login/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "login");
        dom.setAttribute(el1, "class", "fullscreen");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui middle aligned center aligned grid");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "column panel");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "ui large form");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui stacked segment");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "field");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "ui left icon input");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "user icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "ui fluid large teal submit button");
        var el7 = dom.createTextNode("Login");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui error message");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 3, 3);
        morphs[2] = dom.createMorphAt(element1, 5, 5);
        return morphs;
      },
      statements: [["element", "action", ["login"], ["on", "submit"], ["loc", [null, [4, 18], [4, 48]]], 0, 0], ["inline", "input", [], ["id", "identification", "type", "text", "name", "name", "placeholder", "Enter your name", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [9, 116], [9, 130]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [9, 28], [9, 132]]], 0, 0], ["block", "if", [["get", "errorMessage", ["loc", [null, [13, 26], [13, 38]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [13, 20], [15, 27]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('management/pods/route-name/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("management/pods/route-name/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "management/pods/route-name/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/resolver", ["exports", "ember-resolver"], function (exports, _emberResolver) {
  exports["default"] = _emberResolver["default"];
});
define("management/router", ["exports", "ember", "management/config/environment"], function (exports, _ember, _managementConfigEnvironment) {

  var Router = _ember["default"].Router.extend({
    location: _managementConfigEnvironment["default"].locationType,
    rootURL: _managementConfigEnvironment["default"].rootURL
  });

  Router.map(function () {
    this.route('login', { path: 'login/:token' });
    this.route('account', function () {
      this.route('new');
    });

    this.resource('board', function () {
      this.route('new');
      this.route('view', { path: 'view/:token' });
    });
  });

  exports["default"] = Router;
});
define('management/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend();
});
define('management/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('management/services/poll', ['exports', 'ember', 'ember-cli-poll/services/poll'], function (exports, _ember, _emberCliPollServicesPoll) {
  exports['default'] = _emberCliPollServicesPoll['default'];
});
define('management/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('management/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("management/templates/components/ember-inline-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "management/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("input");
            dom.setAttribute(el1, "class", "ember-inline-edit-input");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createAttrMorph(element2, 'type');
            morphs[1] = dom.createAttrMorph(element2, 'value');
            morphs[2] = dom.createAttrMorph(element2, 'oninput');
            morphs[3] = dom.createAttrMorph(element2, 'style');
            return morphs;
          },
          statements: [["attribute", "type", ["get", "field", ["loc", [null, [4, 15], [4, 20]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "value", ["loc", [null, [5, 16], [5, 21]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["setValue"], ["value", "target.value"], ["loc", [null, [null, null], [7, 58]]], 0, 0], 0, 0, 0, 0], ["attribute", "style", ["get", "fieldWidth", ["loc", [null, [8, 16], [8, 26]]], 0, 0, 0, 0], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 2
                },
                "end": {
                  "line": 16,
                  "column": 2
                }
              },
              "moduleName": "management/templates/components/ember-inline-edit.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("textarea");
              dom.setAttribute(el1, "class", "ember-inline-edit-input");
              var el2 = dom.createTextNode("\n    ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n  ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element1, 'value');
              morphs[1] = dom.createAttrMorph(element1, 'oninput');
              return morphs;
            },
            statements: [["attribute", "value", ["get", "value", ["loc", [null, [12, 14], [12, 19]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["setValue"], ["value", "target.value"], ["loc", [null, [null, null], [14, 56]]], 0, 0], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 2
              },
              "end": {
                "line": 16,
                "column": 2
              }
            },
            "moduleName": "management/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "in-arr", [["get", "textAreaFields", ["loc", [null, [10, 20], [10, 34]]], 0, 0, 0, 0], ["get", "field", ["loc", [null, [10, 35], [10, 40]]], 0, 0, 0, 0]], [], ["loc", [null, [10, 12], [10, 41]]], 0, 0]], [], 0, null, ["loc", [null, [10, 2], [16, 2]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 2
              },
              "end": {
                "line": 25,
                "column": 2
              }
            },
            "moduleName": "management/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "hint");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "hintLabel", ["loc", [null, [24, 23], [24, 38]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 26,
              "column": 0
            }
          },
          "moduleName": "management/templates/components/ember-inline-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "ember-inline-edit-save");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  \n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [2]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createElementMorph(element3);
          morphs[2] = dom.createMorphAt(element3, 1, 1);
          morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "in-arr", [["get", "textFields", ["loc", [null, [2, 16], [2, 26]]], 0, 0, 0, 0], ["get", "field", ["loc", [null, [2, 27], [2, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [2, 8], [2, 33]]], 0, 0]], [], 0, 1, ["loc", [null, [2, 2], [16, 9]]]], ["element", "action", ["save"], ["bubbles", false], ["loc", [null, [18, 10], [18, 41]]], 0, 0], ["content", "saveLabel", ["loc", [null, [20, 4], [20, 17]]], 0, 0, 0, 0], ["block", "if", [["get", "hintLabel", ["loc", [null, [23, 8], [23, 17]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [23, 2], [25, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 2
              },
              "end": {
                "line": 31,
                "column": 2
              }
            },
            "moduleName": "management/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "gray-text");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "placeholder", ["loc", [null, [29, 6], [29, 21]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 2
              },
              "end": {
                "line": 33,
                "column": 2
              }
            },
            "moduleName": "management/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "value", ["loc", [null, [32, 4], [32, 13]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 2
              },
              "end": {
                "line": 39,
                "column": 2
              }
            },
            "moduleName": "management/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-inline-edit-toggle-btn");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.setNamespace("http://www.w3.org/2000/svg");
            var el2 = dom.createElement("svg");
            dom.setAttribute(el2, "xmlns", "http://www.w3.org/2000/svg");
            dom.setAttribute(el2, "width", "12");
            dom.setAttribute(el2, "height", "12");
            dom.setAttribute(el2, "viewBox", "0 0 16 16");
            var el3 = dom.createElement("g");
            dom.setAttribute(el3, "fill", "#414141");
            var el4 = dom.createElement("path");
            dom.setAttribute(el4, "d", "M8.1 3.5L.3 11.3c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4z");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("path");
            dom.setAttribute(el4, "data-color", "color-2");
            dom.setAttribute(el4, "d", "M15.7 3.3l-3-3c-.4-.4-1-.4-1.4 0L9.5 2.1l4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'onclick');
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "action", ["startEditing"], [], ["loc", [null, [null, null], [36, 43]]], 0, 0], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 0
            },
            "end": {
              "line": 40,
              "column": 0
            }
          },
          "moduleName": "management/templates/components/ember-inline-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "valueIsEmpty", ["loc", [null, [27, 8], [27, 20]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [27, 2], [33, 9]]]], ["block", "if", [["get", "showEditButton", ["loc", [null, [35, 8], [35, 22]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [35, 2], [39, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 0
          }
        },
        "moduleName": "management/templates/components/ember-inline-edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isEditing", ["loc", [null, [1, 6], [1, 15]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [40, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("management/templates/components/ui-accordion", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-accordion.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("input");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        if (this.cachedFragment) {
          dom.repairClonedNode(element0, [], true);
        }
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element0, 'type');
        morphs[1] = dom.createAttrMorph(element0, 'name');
        morphs[2] = dom.createAttrMorph(element0, 'tabindex');
        morphs[3] = dom.createAttrMorph(element0, 'checked');
        morphs[4] = dom.createAttrMorph(element0, 'disabled');
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "type", ["get", "type", ["loc", [null, [1, 14], [1, 18]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "name", ["get", "name", ["loc", [null, [2, 14], [2, 18]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "tabindex", ["get", "tabindex", ["loc", [null, [3, 18], [3, 26]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "checked", ["subexpr", "unbound", [["get", "checked", ["loc", [null, [4, 25], [4, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [4, 34]]], 0, 0], 0, 0, 0, 0], ["attribute", "disabled", ["subexpr", "unbound", [["get", "disabled", ["loc", [null, [5, 26], [5, 34]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [5, 36]]], 0, 0], 0, 0, 0, 0], ["content", "label", ["loc", [null, [6, 7], [6, 16]]], 0, 0, 0, 0], ["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [7, 8], [7, 26]]], 0, 0]], [], ["loc", [null, [7, 0], [7, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-dimmer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "management/templates/components/ui-dimmer.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-dropdown", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 47
          }
        },
        "moduleName": "management/templates/components/ui-dropdown.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0], ["subexpr", "action", ["mapping"], [], ["loc", [null, [1, 27], [1, 45]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 47]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-embed", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-embed.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-modal.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-nag", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-nag.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-popup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-popup.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-progress", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-progress.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-radio", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-radio.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("input");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        if (this.cachedFragment) {
          dom.repairClonedNode(element0, [], true);
        }
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element0, 'type');
        morphs[1] = dom.createAttrMorph(element0, 'name');
        morphs[2] = dom.createAttrMorph(element0, 'tabindex');
        morphs[3] = dom.createAttrMorph(element0, 'checked');
        morphs[4] = dom.createAttrMorph(element0, 'disabled');
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "type", ["get", "type", ["loc", [null, [1, 14], [1, 18]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "name", ["get", "name", ["loc", [null, [2, 14], [2, 18]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "tabindex", ["get", "tabindex", ["loc", [null, [3, 18], [3, 26]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "checked", ["subexpr", "unbound", [["get", "checked", ["loc", [null, [4, 25], [4, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [4, 34]]], 0, 0], 0, 0, 0, 0], ["attribute", "disabled", ["subexpr", "unbound", [["get", "disabled", ["loc", [null, [5, 26], [5, 34]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [5, 36]]], 0, 0], 0, 0, 0, 0], ["content", "label", ["loc", [null, [6, 7], [6, 16]]], 0, 0, 0, 0], ["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [7, 8], [7, 26]]], 0, 0]], [], ["loc", [null, [7, 0], [7, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-rating", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-rating.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-shape", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-shape.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-sidebar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-sidebar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("management/templates/components/ui-sticky", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "management/templates/components/ui-sticky.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "action", ["execute"], [], ["loc", [null, [1, 8], [1, 26]]], 0, 0]], [], ["loc", [null, [1, 0], [1, 28]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('management/config/environment', ['ember'], function(Ember) {
  var prefix = 'management';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("management/app")["default"].create({"name":"management","version":"0.0.0+4e3cbd7e"});
}

/* jshint ignore:end */
//# sourceMappingURL=management.map
