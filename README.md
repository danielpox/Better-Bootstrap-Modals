# Better-bootstrap-modals
It's 2016, we need good modals.

This simple and tiny (518 bytes gzipped) Javascript and CSS package allows an infinite amount of open modals, and a simple and natural way to navigate between them.

Utilizing Bootstrap's own modal events, this works neatly with the core of vanilla Bootstrap.

Note: on mobile devices, the body may have a tendency to scroll when at the top or bottom of the `.modal-container`. This is a [well-known issue](http://getbootstrap.com/getting-started/#overflow-and-scrolling "Bootstrap").

## Requirements
For Better Bootstrap Modals to work, all you need to do is include the CSS and Javascript files (or include the tiny source code found below), and disable backdrops on all modals.

It of course also requires Bootstrap and jQuery.
### Disable backdrop
	<!-- Basic Bootstrap modal without backdrop -->
	<div class="modal" id="modal1" data-backdrop="false" tabindex="-1" role="dialog">
		...
	</div>

## Source code
To demonstrate how tiny Better-bootstrap-modals really is, here's all the source code:
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