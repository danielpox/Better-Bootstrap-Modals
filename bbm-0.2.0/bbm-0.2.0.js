/*
	Author: Daniel Pox
	Name: Better Bootstrap Modals (bbm)
	Version: 0.2.0

	Licence: The MIT Licence (MIT)
	Copyright (c) 2016 Daniel Pox.
*/
modals = [];

$(document).ready(function() {
	$(".modal").on("show.bs.modal", function(e) {
		var id = $(this).attr("id");
		if (modals.length == 0) {
			$(this).wrap('<div class="modal-container"></div>');
		}
		$(".modal-container").append($(this));
		
		modals.push(id);
		$(this).show();
	});
	
	$(".modal").on("hide.bs.modal", function(e) {
		var id = $(this).attr("id");
		
		modals.splice(modals.indexOf(id), 1);
		$(this).hide();
		
		$("body").prepend($(this));
		
		if (modals.length == 0) {
			$(".modal-container").remove();
		}
	});
});