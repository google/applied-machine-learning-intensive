
var codeExercises;
var presenterCssLink
var presentModeInitialized = false;

function presentToggle() {
  if (! presentModeInitialized ) {
    presentModeSetup();
    presentModeInitialized = true;
  }
  let bod = $('body');
  let presentClass = 'present';
  let fullHeightClass = 'full-height';
  let bottomClass = 'bottom';
  if(bod.hasClass(presentClass)){
    $('.section *').not('h1, .presentation-title, .btn-presenter, .runestone, .runestone *, .section, .pre, code').removeClass('hidden'); //show everything
    $('#completionButton').removeClass('hidden');
    bod.removeClass(presentClass);
    $('.'+fullHeightClass).removeClass(fullHeightClass);
    $('.'+bottomClass).removeClass(bottomClass);
    localStorage.setItem("presentMode", 'text');
    codeExercises.removeClass('hidden');
    presenterCssLink.disabled = true;  // disable present_mode.css
  }
  else{
    $('.section *').not('h1, .presentation-title, .btn-presenter, .runestone, .runestone *, .section, .pre, code').addClass('hidden'); // hide extraneous stuff
    $('#completionButton').addClass('hidden');
    bod.addClass(presentClass);
    bod.addClass(fullHeightClass);
    $('html').addClass(fullHeightClass);
    $('.section .runestone').addClass(fullHeightClass);
    $('.ac-caption').addClass(bottomClass);
    localStorage.setItem("presentMode", presentClass);
    loadPresenterCss(); // present_mode.css should only apply when in presenter mode.
    activateExercise();
  }
}

function loadPresenterCss() {
  presenterCssLink = document.createElement('link');
  presenterCssLink.type='text/css';
  presenterCssLink.href='../_static/presenter_mode.css';
  presenterCssLink.rel='stylesheet';
  document.getElementsByTagName('head')[0].appendChild(presenterCssLink);
}

function presentModeSetup() {
  // moved this out of configure
  let dataComponent = $("[data-childcomponent]");

  // this still leaves some things semi-messed up when you exit presenter mode.
  // but instructors will probably just learn to refresh the page.
  dataComponent.addClass('runestone');
  dataComponent.parent().closest('div').not('.section').addClass('runestone')
  dataComponent.parent().closest('div').css("max-width", 'none');

  dataComponent.each(function(index) {
    let me = $(this);
    $(this).find('.ac_code_div, .ac_output').wrapAll("<div class='ac-block'></div>");
  });

  codelensListener(500);
  $('.section img').wrap('<div class="runestone">')
  codeExercises = $('.runestone').not('.runestone .runestone');
  // codeExercises.each(function(){
    $('h1').before(
      "<div class='presentation-title'> \
        <button class='prev-exercise btn-presenter btn-grey-outline' onclick='prevExercise()'>Back</button> \
        <button class='next-exercise btn-presenter btn-grey-solid' onclick='nextExercise()'>Next</button> \
      </div>"
    );

}
function getActiveExercise() {
  return active = codeExercises.filter('.active');
}

function activateExercise(index) {
  if(typeof(index) == 'undefined'){
    index = 0;
  }

  let active = getActiveExercise();

  if(codeExercises.length) {
    active.removeClass('active');
    active = $(codeExercises[index]).addClass('active');
    active.removeClass('hidden');
    codeExercises.not(codeExercises.filter('.active')).addClass('hidden');
  }
}

function nextExercise() {
  let active = getActiveExercise();
  let nextIndex = codeExercises.index(active) + 1;
  if(nextIndex < codeExercises.length){
    activateExercise(nextIndex);
  }
}

function prevExercise() {
  let active = getActiveExercise();
  let prevIndex = codeExercises.index(active) - 1;
  if(prevIndex >= 0){
    activateExercise(prevIndex);
  }
}

function configure() {
  let rightNav = $('.navbar-right');
  rightNav.prepend(
    "<li class='dropdown view-toggle'> \
      <label>View: \
        <select class='mode-select'> \
          <option value='text'>Textbook</option> \
          <option value='present'>Code Presenter</option> \
        </select> \
      </label> \
    </li>");

  let modeSelect = $('.mode-select').change(presentToggle);

}

function codelensListener(duration) {
  // $(".ExecutionVisualizer").length ? configureCodelens() : setTimeout(codelensListener, duration);
  // configureCodelens();
}

function configureCodelens() {
  let acCodeTitle = document.createElement("h4");
  acCodeTitle.textContent = "Active Code Window";
  let acCode = $('.ac_code_div').removeClass('col-md-12')
  $('.ac_code_div').addClass('col-md-6');
  acCode.prepend(acCodeTitle);

  acOutTitle = document.createElement("h4");
  acOutTitle.textContent = "Output Window";
  let acOut = $('.ac_output').addClass('col-md-6');
  $('.ac_output').prepend(acOutTitle);

  let sketchpadTitle = document.createElement("h4");
  sketchpadTitle.textContent = "Sketchpad";
  let sketchpad = document.createElement("span");
  $(sketchpad).addClass('sketchpad');
  let sketchpadContainer = document.createElement("div");
  $(sketchpadContainer).addClass("sketchpad-container");
  sketchpadContainer.appendChild(sketchpadTitle);
  sketchpadContainer.appendChild(sketchpad);
  //$('.ac_output').append(sketchpadContainer);

  let visualizers = $(".ExecutionVisualizer");

  console.log('Econtainer: ', this.eContainer);

  $('[data-childcomponent]').on('click', 'button.row-mode', function() {
    $(this).closest('[data-childcomponent]').removeClass('card-mode');
    $(this).closest('[data-childcomponent]').addClass('row-mode');
    $(this).next('.card-mode').removeClass('active-layout');
    $(this).addClass('active-layout');
  });

  $('[data-childcomponent]').on('click','button.card-mode', function() {
    $(this).closest('[data-childcomponent]').removeClass('row-mode');
    $(this).closest('[data-childcomponent]').addClass('card-mode');
    $(this).prev('.row-mode').removeClass('active-layout');
    $(this).addClass('active-layout');
  });

  $('[data-childcomponent] .ac_section').each(function() {
    $(this).prepend('<div class="presentation-options"><button class="row-mode layout-btn"><img src="../_images/row-btn-content.png" alt="Rows"></button><button class="card-mode layout-btn"><img src="../_images/card-btn-content.png" alt="Card"></button></div>');
  })

  visualizers.each(function(index) {
    let me = $(this);
    let col1 = me.find('#vizLayoutTdFirst');
    let col2 = me.find('#vizLayoutTdSecond');
    let dataVis = me.find("#dataViz");
    let stackHeapTable = me.find("#stackHeapTable")
    let output = me.find("#progOutputs");
    output.css('display', 'block');
    me.parent().prepend("<div class='presentation-title'><div class='title-text'> Example " + (Number(index) + 1) + "</div></div>");
  });

  acCode.each(function(){
    let section = $(this).closest('.ac-block').parent();
    console.log(section, section.length);
    section.append(sketchpadContainer);
  });

  $('button.card-mode').click();

  let modeSelect = $('.mode-select')
  let mode = localStorage.getItem("presentMode");
  if(mode == 'present') {
    modeSelect.val('present');
    modeSelect.change();
  }

}

//$(document).ready(configure);
$(document).bind("runestone:login-complete", function () {
    // if user is instructor, enable presenter mode
    if (eBookConfig.isInstructor){
     configure();
    }
});