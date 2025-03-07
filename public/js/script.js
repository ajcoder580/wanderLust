// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  //nav search for country name
  document.addEventListener("DOMContentLoaded", function () {
    const countrySelect = document.getElementById("countrySelect");
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Brazil",
        "Canada", "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "India", "Indonesia", "Italy", "Japan",
        "Mexico", "Netherlands", "Pakistan", "Russia", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand", "United Kingdom",
        "United States", "Vietnam", "Zimbabwe"
    ];

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
});