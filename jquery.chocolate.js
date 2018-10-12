(function ($) {

	$.fn.chocolate = function (args) {

		// Default Options
		var options = $.extend({
			interval: 6000,
			speed: 2000
		}, args);

		return this.each(function () {

			var images = [];

			$(function () {
				for (var i = 1; i <= args.max; i++) {
					images[i] = new Image();
					images[i].addEventListener("load", function () {});
					images[i].src = args.path + i + '.jpg';
				}
			});

			var original = $(this);

			// Create element
			$div = $(document.createElement('div'));
			$div.css({
				position: 'absolute',
				zIndex: 0,
				overflow: 'hidden',
			});
			$div.addClass("bg-resize");

			original.prepend($div);
			$div.css(copybackground());
			$div.css('background-image', 'url(' + args.path + '1.jpg)');

			// This element background none
			original.css('background', 'none');

			// Clone bg element
			$div2 = $div.clone();
			$div.after($div2);

			// Set postion
			$div.css(copyPosition());
			$div2.css(copyPosition());

			// Resize window
			$(window).resize(function () {
				$div.css(copyPosition());
				$div2.css(copyPosition());
			});

			// Copy background style
			function copybackground() {
				var backgroundProperties = ['Attachment', 'Color', 'Repeat', 'Position', 'Size', 'Clip', 'Origin'];
				var prop,
					copyStyle = {},
					i = 0;

				for (; i < backgroundProperties.length; i++) {
					prop = 'background' + backgroundProperties[i];
					copyStyle[prop] = original.css(prop);
				}

				return copyStyle;
			}

			// Copy position style
			function copyPosition() {
				var corners = ['Top', 'Right', 'Bottom', 'Left'];
				var i = 0,
					position = original.position(),
					copyStyle = {
						top: position.top,
						left: position.left,
						width: original.innerWidth(),
						height: original.innerHeight()
					};

				for (; i < corners.length; i++) {
					corner = corners[i];
					copyStyle['margin' + corner] = original.css('margin' + corner);
					copyStyle['border' + corner] = original.css('border' + corner);
				}

				return copyStyle;
			}

			var count = 1,
				nums = [],
				maximg = args.max;

			function randomInt() {
				var r = Math.floor(Math.random() * maximg) + 1;

				while (true) {
					if (nums.indexOf(r) == -1) {
						break;
					} else {
						r = Math.floor(Math.random() * maximg) + 1;
					}
				}

				nums.push(r);

				if (nums.length >= maximg) {
					nums = [];
				}

				return r;
			}

			// Change background function
			var slide = function () {
				var current = randomInt();

				if (count === 1) {
					$div2.fadeOut(options.speed);
					$div.css('background-image', 'url(' + args.path + current + '.jpg)').fadeIn(options.speed);
					count++;
				} else {
					$div.fadeOut(options.speed);
					$div2.css('background-image', 'url(' + args.path + current + '.jpg)').fadeIn(options.speed);
					count = 1;
				}
			}

			setInterval(function () {
				slide();
			}, options.interval);
		});
	};

})(jQuery);
