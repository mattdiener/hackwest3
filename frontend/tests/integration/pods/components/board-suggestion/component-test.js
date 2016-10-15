import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('board-suggestion', 'Integration | Component | board suggestion', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{board-suggestion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#board-suggestion}}
      template block text
    {{/board-suggestion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
