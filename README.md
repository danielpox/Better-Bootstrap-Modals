# Better Bootstrap Modals
It's 2016, we need good modals.

This simple and tiny (647 bytes gzipped) Javascript and CSS package allows an infinite amount of open modals, and a simple and natural way to navigate between them.

Utilizing Bootstrap's own modal events, this works neatly with the core of vanilla Bootstrap.

Note: on mobile devices, the body may have a tendency to scroll when at the top or bottom of the `.modal-container`. This is a [well-known issue](http://getbootstrap.com/getting-started/#overflow-and-scrolling "Bootstrap").

## Requirements
For Better Bootstrap Modals to work, all you need to do is include the CSS and Javascript files (or include the tiny source code found below), and disable backdrops as well as `tabindex="-1"` on all modals.

It of course also requires Bootstrap and jQuery.
### Disable backdrop and don't include `tabindex="-1"`
	<!-- Basic Bootstrap modal without backdrop -->
	<div class="modal" id="modal1" data-backdrop="false" role="dialog">
		...
	</div>

## Source code (v0.3.2)
To demonstrate how tiny Better Bootstrap Modals really is, here's all the source code:
### CSS
	.modal-container {
		-webkit-overflow-scrolling: touch;
		overflow-y: scroll;
		z-index: 1040;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		background: rgba(0, 0, 0, 0.24);
	}

	.modal {
		position: relative;
	}
### Javascript
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