(function($) {
  $('.js-carousel')
    // Initialisation du carrousel
    .flickity({
      'contain': true,
      'imagesLoaded': true,
      'wrapAround': true,
      'pageDots': false
    })

    // Sélection de l'utilisatrice
    .on('cellSelect', function() {
      var flickity = $(this).data('flickity');
      var selectedElement = $(flickity.selectedElement);
      var user = selectedElement.data('user');

      // Remplissage des données de l'utilisatrice sélectionnée
      $('.js-user-picture').attr('src', 'dist/assets/img/photos/' + user.picture);
      $('.js-user-name').text(user.name);
      $('.js-user-age').text(user.age);
    }
  );

  $('.js-form-step-1').on('submit', function (e) {
    e.preventDefault();

    // Passage à l'étape suivante
    $('.step-1, .step-2').toggleClass('hidden');
  });
})(jQuery);