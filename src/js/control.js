var app = new Vue({
	el: '#app',
	data: {
		list_width: '0%',
		list_display: 'hidden'
	},
	methods: {
		list_appear: function (event) {
			if(this.list_width === '0%')
			{
				this.list_width = '100%'
				this.list_display = 'visible'
			}
			else
			{
				this.list_width = '0%'
				this.list_display = 'hidden'
			}
		},
		Home: function(event) {
			this.list_appear()
			$('html,body').animate({scrollTop: '0px'}, 800)
		},
		About: function(event) {
			this.list_appear()
			$('html,body').animate({scrollTop: $('.introduction').offset().top}, 800)
		},
		Contact: function(event) {
			this.list_appear()
			$('html,body').animate({scrollTop: $('.last').offset().top}, 800)
		}
	}
})