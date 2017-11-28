namespace("fx.giantFormDesign")["sample"] = (function () {

  var observable = ko.observable;

  function viewModel(params) {

    var koFormId = params.formId;

    var me = this;
    $.extend(me, {
      formId: koFormId
    })
  }


  return {
    viewModel: viewModel
  }

})();
