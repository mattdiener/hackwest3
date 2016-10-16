import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['fullscreen'],
  display: false,
  photos: Ember.computed('place.photos@each', function(){
    if (!this.get('place') || !this.get('place.photos')) {
      return;
    }
    console.log(this.get('place.photos'));
    return this.get('place.photos').map(function(photo){
      console.log(Ember.$(photo.html_attributions[0]).attr('href'));
      return {
        'url':  Ember.$(photo.html_attributions[0]).attr('href')
      };
    });
  }),

  uiSetup: function(){

  }.on('didInsertElement').observes('place'),

  getType: function() {
    const place = this.get('place');
    if (place && place.types) {
      let type = place.types[0];
      let icon = "";
      if (type === 'logding') {
        icon = "<i class='hotel icon'></i>";
      } else if (type === 'food') {
        icon = "<i class='food icon'></i>";
      }
      type = type.charAt(0).toUpperCase() + type.slice(1);
      type = type.replace(/_/g," ");
      console.log(type + "  + icon");
      return new Ember.Handlebars.SafeString(type + " " + icon);
    }
    return false;
  }.property('place.types'),

  showReviews: function() {
    const place = this.get('place');
    if (place && place.reviews) {
      console.log(place.reviews);
      let reviewOne = place.reviews[0];
      let reviewTwo;
      let reviews = [reviewOne];
      if (place.reviews.length > 1) {
        reviewTwo = place.reviews[1];
        reviews.push(reviewTwo);
      }
      return reviews;
    }
    return [];
  }.property('places.reviews'),

  actions: {


  }
});
