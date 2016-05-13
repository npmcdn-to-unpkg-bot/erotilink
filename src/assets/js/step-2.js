(function($) {
  $('.js-form-step-2').on('submit', function (e) {
    e.preventDefault();

    // Passage à l'étape suivante
    $('.step-2, .step-3').toggleClass('hidden');
  });
})(jQuery);