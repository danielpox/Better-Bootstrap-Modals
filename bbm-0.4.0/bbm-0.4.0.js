/* Better Bootstrap Modals (bbm) v0.4.0
** https://github.com/danielpox/better-bootstrap-modals
** Copyright (c) 2016 Daniel Pox
** Contibutor: Mouse0270 https://github.com/mouse0270
** Released under The MIT License (MIT)
==========================================================*/
// Get Script Data Attributes
var dataVariables = (function() { var scripts = document.getElementsByTagName("script"); return scripts[scripts.length - 1].dataset; })();
$(document).ready(function() {
    var $modalContainer = $('<div class="modal-container"></div>');

    // Check if `.modal-container` exists.
    // If so, set $modalContainer to first instance
    // Otherwise add $modalContainer to `body`
    if ($('body .modal-container').length >= 1) {
    	$modalContainer = $('.modal-container').eq(0)
    }else{
		$('body').append($modalContainer);
	}

	// If show is set to first, add class to `.modal-container` to limit modals to only show one at a time
	if (dataVariables.show == 'first') {
		$modalContainer.addClass('show-first-only');
	}

	// Add Opening modals to `.modal-container`
    $('.modal').on('show.bs.modal', function() {
    	// Check to see if forceBackdrop is set, If not use default backdrop setting
    	var forceBackdrop = (typeof dataVariables.forceBackdrop != 'undefined' ? (dataVariables.forceBackdrop === 'true') : $(this).data('bs.modal').options.backdrop);
		$(this).data('bs.modal').options.backdrop = forceBackdrop;
		// Prepent modal to container
		$modalContainer.prepend($(this));
    });
    
	// Make sure to remove forced display in favor of css display
    $('.modal').on('shown.bs.modal', function() {	    	
		$(this).css('display', '');
    });

    $('.modal').on('hidden.bs.modal', function() {
		if ($('.modal.in').length >= 1) {
			// Make sure not to remove modal-open if modals are still open.
			$('body').addClass('modal-open');
		}else{
			// Remove padding sometimes left over from modals.
			$('body').css('padding-right', '');
		}
	});
});