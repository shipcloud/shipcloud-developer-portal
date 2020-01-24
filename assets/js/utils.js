function toggle(element_name){
  if (element_name.charAt(0) === "#") {
    let element = document.getElementById(element_name.substr(1));

    element.classList.toggle('hidden');
  } // TODO : add handling of classes
}

var togglebox_elements =
  document.querySelectorAll('[data-controller="toggle-element"]');

togglebox_elements.forEach(function(element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    let toggle_element_id = element.getAttribute('data-target');
    toggle(toggle_element_id);
  });
});
