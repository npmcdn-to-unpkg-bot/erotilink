(function($) {
  // Sélection de l'utilisatrice dans le formulaire lors du défilement des photos
  $('.js-carousel').on('slid.bs.carousel', function (e) {
    $(e.relatedTarget).find('[name="user"]').prop('checked', true);
  });

  // Récupération des données de l'utilisatrice
  $('.js-form-step-1').on('submit', function (e) {
    e.preventDefault();

    var user = $(this).find('[name="user"]:checked').val();
    user = $.parseJSON(user);

    // Remplissage des données de l'utilisatrice de l'étape 2
    // $('.js-user-picture').attr('src', 'dist/assets/img/photos/' + user.picture);
    $('.js-user-picture').attr('src', 'http://placehold.it/364x364');
    $('.js-user-name').text(user.name);
    $('.js-user-age').text(user.age);

    // Passage à l'étape suivante
    $('.step-1, .step-2').toggleClass('hidden');
  });
})(jQuery);