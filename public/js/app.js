var $loading = $('#loader').hide();
$(document)
.ajaxStart(function () {
  $loading.show();
})
.ajaxStop(function () {
  $loading.hide();
});
