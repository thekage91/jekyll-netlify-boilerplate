(function() {
  $(document).ready(function() {
    const client = stitch.Stitch.initializeDefaultAppClient(
      "sprint-studio-charity-buy-ghxmq"
    );

    if (client.auth.hasRedirectResult()) {
      client.auth.handleRedirectResult().then(function(user) {
        $('[name="user"]').removeAttr("hidden");
        $('[name="user"] a').html(user.profile.name);
      });
    }

    
    if (client.auth.isLoggedIn) {
      let user = client.auth.user;
      $('[name="user"]').removeAttr("hidden");
      $('.btn-login-facebook').attr("hidden", "");
      $('.btn#join').attr("hidden", "");

      console.log(user.profile.name);
      $('[name="user"] a').first().html(user.profile.name);
    } 

    $('form[name="link-generator"] .btn').click(function() {
      let amazonLink = $('input[name="amazon-link"]').val();

      if(!client.auth.isLoggedIn) {
        client.auth
        .loginWithCredential(new stitch.AnonymousCredential())
        .then(user => {
          //console.log(user);
        })
        .catch(err => {
          console.error(err);
        });
      }

      client
        .callFunction("Generate_tracking_link", [amazonLink])
        .then(function(result) {
          if (result.error) {
            return alert(result.message);
          }

          window.open(result, "blank");
        });
    });

    $(".btn.btn-login-facebook").click(function() {
      const credential = new stitch.FacebookRedirectCredential();

      client.auth.logout();
      client.auth.loginWithRedirect(credential);
    });

    $(".btn-logout").click(function() {
      client.auth.logout()
      .then(function() {
        location.reload();
      });
    });
  });
})();
