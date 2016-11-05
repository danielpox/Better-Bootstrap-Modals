/*
	Better Bootstrap Modals (bbm) v0.4.0
	https://github.com/danielpox/better-bootstrap-modals

	Copyright (c) 2016 Daniel Pox
	Contributor: Mouse0270 https://github.com/mouse0270
	Released under The MIT License (MIT)
*/
+function() {
	var bbm_modals = [],
		data_vars = (function() { var scripts = document.getElementsByTagName("script"); return scripts[scripts.length - 1].dataset; }()),
		ti = "tabindex",
		cont = "modal-container";
	
	if (data_vars.forceBackdrop === "true") cont += " backdrop";
	else $.fn.modal.Constructor.DEFAULTS.backdrop = 0;
	
	if (data_vars.modalShow === "first") cont += " show-first-only";
	var $cont = $('<div class="' + cont + '"></div>');
	
	$(document).ready(function() {
		$(".modal").on("show.bs.modal", function() {
			var self = $(this);

			if (bbm_modals.length == 0) $("body").prepend($cont);
			$cont.prepend(self);

			bbm_modals.push(self.attr("id"));
			$cont.find(".modal.in").removeAttr(ti);
			self.show().attr(ti, "-1");
		});
		
		$(".modal").on("shown.bs.modal", function() {
			$(this).css("display", "");
		});

		$(".modal").on("hide.bs.modal", function() {
			var self = $(this);

			bbm_modals.splice(bbm_modals.indexOf(self.attr("id")), 1);
			self.hide();

			$("body").prepend(self);

			if (bbm_modals.length == 0) $cont.detach();
		});
		
		$(".modal").on("hidden.bs.modal", function() {
			$(this).removeAttr(ti);
			
			if (bbm_modals.length > 0) {
				$("body").addClass("modal-open");
				$cont.find(".modal.in").eq(0).attr(ti, "-1");
			}
		});

		$("body").on("click", "." + $cont[0].classList[0], function(e) {
			if (!$(e.target).is(".modal-dialog *")) $(".modal").modal("hide");
		});
	});
}();