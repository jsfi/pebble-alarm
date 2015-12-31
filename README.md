# Pebble - Timer

## Todos

- find error with card
  - app will crash when card with body-text is shown (only on pebble, not on emulator)
  - if body is set after card is shown, app will crash only sometimes but not reliable
  - timeout of 500ms before body is set seems to work most of the time, less timeout decreases reliability
  - error occurs when `element.queue(function(next) { ...; next(); });` next is called after card is shown
  - queue is used because multiple animates do not queue like documented
  - FIX: change ui/element.animate function so it works as documented
- refactor ui/element.animate fix and push to pebblejs/pebblejs
  - add state (in animation) so animations will be queued if called multiple time on same element
  - added state and tested with emulator
  - test with watch and create diff for pull request

- add background functionality
