try {
  var type = require('type');
} catch(e) {
  var type = require('component-type');
}
var trim = require('trim');

module.exports = function(Model) {

  Model.once('initialize', function() {
    for(var attr in Model.attrs) {
      if (Model.attrs[attr].required) Model.use(requiredAndNotEmpty(attr));
    }
  });
}

//
// Check that the attr is present and not an empty string
function requiredAndNotEmpty(attr) {
  return function(Model){
    Model.validate(function(model){
      if (!model.has(attr)) return model.error(attr, 'field required');

      if ( isEmpty(model.attrs[attr])){
        model.error(attr, 'required field is empty')
      }
    });
  };
}

function isEmpty(val){
  return type(val) == 'string' && trim(val).length == 0;
}