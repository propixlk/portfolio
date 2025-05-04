/**
* PHP Email Form Validation - v3.10
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      // Formspree returns JSON even on success when using XHR, check response.ok for HTTP errors first
      if (!response.ok) {
          // If response is not OK, try to read JSON for Formspree's error message
          return response.json().then(err => { throw new Error(err.error || `${response.status} ${response.statusText}`); });
      }
      // If response is OK (e.g., 200), read the JSON response from Formspree
      return response.json(); // Changed from response.text()
    })
    .then(data => { // 'data' is now the parsed JSON object from Formspree
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.ok) { // Check the 'ok' property within the Formspree JSON response
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();

        // --- Handle Redirection ---
        // If Formspree response includes a 'next' URL, redirect there
        if (data.next) {
             window.location.href = data.next;
        } else if (thisForm.querySelector('input[name="_next"]')) {
             // Otherwise, if a hidden _next field exists in the form, redirect there as a fallback
             window.location.href = thisForm.querySelector('input[name="_next"]').value;
        }
        // If neither data.next nor _next field exists, the script will stop here, and the sent-message will remain visible.

      } else { // If data.ok is false or the JSON structure is unexpected
         // Formspree typically sends { ok: false, error: "..." } on failure
        throw new Error(data.error || 'Form submission failed.'); // Use Formspree's provided error message or a generic one
      }
    })
    .catch((error) => {
      // This catch block handles network errors or errors thrown in the .then blocks
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    // Ensure we display the error message string, not a complex Error object if thrown
    thisForm.querySelector('.error-message').innerHTML = error.message ? error.message : error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();