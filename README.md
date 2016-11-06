# Better Bootstrap Modals
It's 2016, we need good modals.

This simple and tiny (1088 bytes gzipped) Javascript and CSS package allows an infinite amount of open modals, and a simple and natural way to navigate between them.

Utilizing Bootstrap's own modal events, this works neatly with the core of vanilla Bootstrap.

Note: on mobile devices, the body may have a tendency to scroll when at the top or bottom of the `.modal-container`. This is a [well-known issue](http://getbootstrap.com/getting-started/#overflow-and-scrolling "Bootstrap").

## Requirements
For Better Bootstrap Modals to work, all you need to do is include the CSS and Javascript files (or include the tiny source code found below), and be sure to not include `tabindex="-1"` on any modals. (It automatically adds the `tabindex` to the most recently opened modal.)

It of course also requires Bootstrap and jQuery.

### Don't include `tabindex="-1"`
	<!-- Basic Bootstrap modal without tabindex -->
	<div class="modal" id="modal1" role="dialog">
		...
	</div>


## Options
As of v0.4.0, you can specify a few options. Options can be passed via data attributes by appending the option name to `data-`, as in `data-modal-show=""`, on the `<script>` tag used to reference the Better Bootstrap Modals file. Example: `<script src="..." data-*=""></script>`

| Name           | type               | default | description |
| -------------- | ------------------ | ------- | ----------- |
| modal-show     | the string `'first'` | false   | Only shows one modal at a time, the most recently opened modal being shown. |
| force-backdrop | boolean            | false   | Better Bootstrap Modals uses a custom backdrop, which cannot be disabled. However, this option forces the default built-in backdrop, adding a layer for every modal you open. (Not recommended.) |

## Source code (v0.4.1)
To demonstrate how tiny Better Bootstrap Modals really is, here's all the source code (uncompressed):
### CSS
	.modal-container {
		-webkit-overflow-scrolling: touch;
		overflow-y: scroll;
		z-index: 1041;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		background: rgba(0, 0, 0, 0.24);
	}

	.modal-container.backdrop {
		background: transparent;
	}

	.modal-container .modal {
		position: relative;
	}

	body.modal-open .modal-container .modal.in {
		display: block;
	}

	body.modal-open .modal-container.show-first-only .modal.in ~ .modal.in {
		display: none;
	}
### Javascript
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
