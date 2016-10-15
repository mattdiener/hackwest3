import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createAccount() {
      let {identification, password, passwordConfirm} = this.getProperties('identification', 'password', 'passwordConfirm');
      if (password !== passwordConfirm) {
        this.set('errorMessage', "Passwords do not match!");
        return;
      }
      const passwordRegex = /(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$/;
      if (!passwordRegex.test(password)) {
        this.set('errorMessage', 'Your password must have at least one number, one uppercase, one lowercase, and one special character');
        return;
      }
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(identification)) {
        this.set("errorMessage", "That email is invalid");
        return;
      }

      const options = {
        url: '/api/account/new',
        data: {
          identification: identification,
          password: password
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json'
      };

      Ember.$.ajax(options).then((response) => {
        console.log(response);
      });
    }
  }
});
