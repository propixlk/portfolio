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
              });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The recaptcha api script is not loaded!');
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
      headers: {
        'Accept': 'application/json' // Formspree requires this header for JSON response
      }
    })
    .then(response => {
      // Formspree returns a JSON response
      if (response.ok) { // Check for successful HTTP status (e.g., 200 OK)
          return response.json(); // Parse the JSON response
      } else {
          // If response is not OK, throw an error to be caught by the .catch block
          return response.json().then(data => { // Try to get error details from JSON
              throw new Error(data.error || `HTTP error! status: ${response.status}`); // Use Formspree's error or generic HTTP error
          });
      }
    })
    .then(data => { // This block runs for successful HTTP responses
      thisForm.querySelector('.loading').classList.remove('d-block');

      if (data.ok) { // Check Formspree's 'ok' status in the JSON response
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); // Clears the form fields

        // --- Redirection Logic Removed ---
        // The lines below which caused redirection have been removed:
        /*
        if (data.next) {
             window.location.href = data.next;
        } else if (thisForm.querySelector('input[name=\"_next\"]')) {
             window.location.href = thisForm.querySelector('input[name=\"_next\"]').value;
        }
        */
        // Now, after showing the sent-message and resetting the form, the script simply stops,
        // keeping the user on the same page with the sent-message visible.


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
    // Re-enable form inputs after error
    thisForm.querySelectorAll('input, textarea, button').forEach(input => input.disabled = false);
  }

  // Helper function to check form validity (already exists in the template)
  function isValid(thisForm) {
      if (thisForm.checkValidity && !thisForm.checkValidity()) {
          const invalidElements = thisForm.querySelectorAll(':invalid');
          let errorMessage = '';
          invalidElements.forEach(el => {
              if (el.validationMessage) {
                  errorMessage += el.validationMessage + '\n';
              }
          });
           // You could potentially display this server-side validation message too
           // but the default browser validation usually handles this on the client side
          console.log('Client-side validation failed:', errorMessage); // Log client validation failures
          return false;
      }
      return true; // Form is valid client-side
  }

})();