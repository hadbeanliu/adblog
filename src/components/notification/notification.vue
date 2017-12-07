<template>
	<transition name="notify-fade">
		<div class="lg-notify callout" v-show="visible" @mouseenter="clearTimer()" @mouseleave="startTimer()">
			<i class="fa" :class="[ typeClass]" v-if="type">
      </i>
			<div class="notify-content">
				<h2 class="notify-title" v-text="title">{{title}}</h2>
				<div class="notify-messages">{{message}}</div>
			</div>
			<button class="close-button" type="button" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
		</div>
	</transition>
</template>
<script>
	let color = {
		'success': 'success-color fa-check-circle',
		'warning': 'warning-color fa-warning',
		'info': 'info-color fa-info-circle',
		'error': 'alert-color fa-exclamation-circle'
	}
	export default {
		name: 'LgNotify',
		data() {
			return {
				visible: false,
				message: '',
				duration: 3000,
				type: '',
				onClose: null,
				showClose: false,
				closed: false,
				timer: null
			}
		},
		computed: {
			typeClass() {
				return this.type ? color[this.type] : ''
			}
		},
		watch: {
			closed(val) {
				if(val) {
					this.visible = false
					this.destroyElement()
				}
			}
		},
		methods: {
			destroyElement() {
				this.$destroy(true)
				this.$el.parentNode.removeChild(this.$el)
			},

			close() {
				this.closed = true
				if(typeof this.onClose === 'function') {
					this.onClose()
				}
			},

			clearTimer() {
				clearTimeout(this.timer)
			},

			startTimer() {
				if(this.duration > 0) {
					this.timer = setTimeout(() => {
						if(!this.closed) {
							this.close()
						}
					}, this.duration)
				}
			}
		},
		mounted() {
			if(this.duration > 0) {
				this.timer = setTimeout(() => {
					if(!this.closed) {
						this.close()
					}
				}, this.duration)
			}
		}
	}
</script>
<style>
	.lg-notify {
		position: fixed;
		left: 0;
		right: 0;
		max-width: 320px;
		top: 0;
		z-index: 2000;
		margin: 0 auto;
	}
	
	.notify-content {
		margin-left: 3rem;
	}
	
	.notify-title {
		margin-bottom: 6px;
	}
	
	.notify-messages {
		font-size: 0.75rem;
	}
	
	.lg-notify>i {
		font-size: 2.4rem;
		position: absolute;
		left: 1rem;
		top: 1rem;
	}
	
	.notify-fade-enter-active {
		transition: all .3s ease;
	}
	
	.notify-fade-leave-active {
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.notify-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(-100%);
		opacity: 0;
	}
	
	@media only screen and (max-width: 640px) {
		.lg-notify {
			max-width: 100%;
		}
	}
</style>