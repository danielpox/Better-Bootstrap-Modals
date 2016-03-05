/*
	Better Bootstrap Modals (bbm) v0.3.2
	https://github.com/danielpox/better-bootstrap-modals

	Copyright (c) 2016 Daniel Pox
	Released under The MIT License (MIT)
*/
bbm_modals = [];

$(document).ready(function() {
	var cont = "modal-container";
	$(".modal").on("show.bs.modal", function() {
		var self = $(this),
			id = self.attr("id");

		if (bbm_modals.length == 0) {
			self.wrap('<div class="' + cont + '"></div>');
		}
		$("." + cont).prepend(self);
		
		bbm_modals.push(id);
		self.show();
	});
	
	$(".modal").on("hide.bs.modal", function() {
		var self = $(this),
			id = self.attr("id");
		
		bbm_modals.splice(bbm_modals.indexOf(id), 1);
		self.hide();
		
		$("body").append(self);
		
		if (bbm_modals.length == 0) {
			$("." + cont).remove();
		}
	});

	$("body").on("click", "." + cont, function(e) {
		if (!$(e.target).is(".modal-dialog *")) {
			$(".modal").modal("hide");
		}
	});
});